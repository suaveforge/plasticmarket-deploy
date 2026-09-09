import { b as private_env } from '../../../../chunks/shared-server.js-9-2j12mp.js';
import { a as all, b as append, u as update, r as removeWhere } from '../../../../chunks/store.js-DPrDqVrp.js';
import { g as getCatalogProduct } from '../../../../chunks/catalog-store.js-DfOx9TlF.js';
import { c as createPayHubSession } from '../../../../chunks/payhub.js-Qj2jxoIB.js';
import { j as json } from '../../../../chunks/utils.js-BgKogIAM.js';
import crypto from 'node:crypto';
import 'node:fs';
import 'node:path';
import '../../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/checkout/+server.js
var unauthorized = () => json({
	ok: false,
	error: "AUTH_REQUIRED"
}, { status: 401 });
var pendingStates = /* @__PURE__ */ new Set(["PAYMENT_PENDING", "PAYMENT_PROCESSING"]);
var pendingTtlMs = 24e5;
function clearExpiredPendingForListing(listingId) {
	const now = Date.now();
	for (const order of all("orders")) {
		if (order.listingId !== listingId || !pendingStates.has(order.status)) continue;
		const age = now - Date.parse(order.createdAt || "");
		if (Number.isFinite(age) && age > pendingTtlMs) update("orders", order.id, {
			status: "PAYMENT_EXPIRED",
			paymentStatus: "EXPIRED",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
}
async function POST({ request, locals, url }) {
	if (!locals.user) return unauthorized();
	const body = await request.json();
	const listing = all("listings").find((x) => x.id === body.listingId && x.status === "ACTIVE");
	if (!listing) return json({
		ok: false,
		error: "LISTING_UNAVAILABLE"
	}, { status: 409 });
	if (listing.sellerId === locals.user.id) return json({
		ok: false,
		error: "OWN_LISTING_CHECKOUT_NOT_ALLOWED"
	}, { status: 409 });
	clearExpiredPendingForListing(listing.id);
	if (all("orders").find((x) => x.listingId === listing.id && pendingStates.has(x.status))) return json({
		ok: false,
		error: "LISTING_PAYMENT_IN_PROGRESS"
	}, { status: 409 });
	const address = body.address || {};
	if (!address.name || !address.phone || !address.postalCode || !address.address1 || !address.city || !address.country) return json({
		ok: false,
		error: "SHIPPING_ADDRESS_REQUIRED"
	}, { status: 422 });
	const acceptedOffer = body.offerId ? all("offers").find((x) => x.id === body.offerId && x.buyerId === locals.user.id && x.listingId === listing.id && x.status === "ACCEPTED") : null;
	if (body.offerId && !acceptedOffer) return json({
		ok: false,
		error: "OFFER_UNAVAILABLE"
	}, { status: 409 });
	const itemAmount = acceptedOffer ? acceptedOffer.amount : listing.price;
	const product = getCatalogProduct(listing.product);
	if (!product) return json({
		ok: false,
		error: "PRODUCT_UNAVAILABLE"
	}, { status: 409 });
	const item = {
		slug: product.slug,
		brand: product.brand,
		title: product.title,
		image: listing.actualPhoto || product.image,
		condition: listing.condition,
		boxCondition: listing.boxCondition,
		partsStatus: listing.partsStatus,
		manualStatus: listing.manualStatus,
		shippingMethod: listing.shippingMethod
	};
	const bps = Number(private_env.PLASTICMARKET_FEE_BPS || 0);
	const fee = Number.isFinite(bps) && bps > 0 ? Math.round(itemAmount * bps / 1e4) : 0;
	const amount = itemAmount + listing.shippingCost + fee;
	const orderId = `ORD-${crypto.randomUUID()}`;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const order = append("orders", {
		id: orderId,
		buyerId: locals.user.id,
		sellerId: listing.sellerId,
		listingId: listing.id,
		offerId: acceptedOffer?.id || null,
		product: listing.product,
		item,
		itemAmount,
		shippingAmount: listing.shippingCost,
		marketplaceFee: fee,
		amount,
		currency: "KRW",
		status: "PAYMENT_PENDING",
		paymentStatus: "CREATED",
		address,
		createdAt: now,
		tracking: null,
		verificationStatus: "NOT_RECEIVED"
	});
	try {
		const origin = String(private_env.ORIGIN || url.origin || "https://plasticmarket.suaveforge.com").replace(/\/$/, "");
		const session = await createPayHubSession({
			order_id: order.id,
			amount,
			currency: "KRW",
			country: String(address.country).toUpperCase(),
			description: String(listing.product).slice(0, 200),
			return_url: `${origin}/payment-result?order=${encodeURIComponent(order.id)}`,
			metadata: {
				user_id: String(locals.user.id),
				listing_id: String(listing.id)
			}
		});
		update("orders", order.id, {
			paymentSessionId: session.session_id,
			paymentStatus: session.status || "CREATED",
			paymentExpiresAt: session.expires_at || null,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		return json({
			ok: true,
			orderId: order.id,
			sessionId: session.session_id,
			checkoutUrl: session.checkout_url
		}, { status: 201 });
	} catch (error) {
		removeWhere("orders", (x) => x.id === order.id && x.status === "PAYMENT_PENDING");
		return json({
			ok: false,
			error: error.message || "PAYHUB_SESSION_FAILED"
		}, { status: Number(error.status) || 503 });
	}
}

export { POST };
//# sourceMappingURL=_server.js-BnarRCbD.js.map

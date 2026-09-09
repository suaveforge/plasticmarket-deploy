import { a as all, s as save, b as append } from '../../../../chunks/store.js-DPrDqVrp.js';
import { j as json } from '../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/offers/+server.js
var unauthorized = () => json({
	ok: false,
	error: "AUTH_REQUIRED"
}, { status: 401 });
async function POST({ request, locals }) {
	if (!locals.user) return unauthorized();
	const b = await request.json();
	const listing = all("listings").find((x) => x.id === b.listingId && x.product === b.product && x.status === "ACTIVE");
	if (!listing || listing.sellerId === locals.user.id || !Number.isFinite(Number(b.amount)) || Number(b.amount) <= 0) return json({
		ok: false,
		error: "INVALID_OFFER"
	}, { status: 422 });
	const row = {
		id: `OFF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "OPEN",
		buyerId: locals.user.id,
		sellerId: listing.sellerId,
		product: b.product,
		listingId: b.listingId,
		amount: Number(b.amount)
	};
	append("offers", row);
	return json({
		ok: true,
		offer: row
	}, { status: 201 });
}
async function PATCH({ request, locals }) {
	if (!locals.user) return unauthorized();
	const b = await request.json();
	if (!b.id || !["ACCEPTED", "DECLINED"].includes(b.status)) return json({
		ok: false,
		error: "INVALID_OFFER_UPDATE"
	}, { status: 422 });
	const rows = all("offers");
	const offer = rows.find((x) => x.id === b.id && x.sellerId === locals.user.id && x.status === "OPEN");
	if (!offer) return json({
		ok: false,
		error: "NOT_FOUND"
	}, { status: 404 });
	if (b.status === "ACCEPTED" && rows.some((x) => x.listingId === offer.listingId && x.id !== offer.id && x.status === "ACCEPTED")) return json({
		ok: false,
		error: "LISTING_ALREADY_HAS_ACCEPTED_OFFER"
	}, { status: 409 });
	const now = (/* @__PURE__ */ new Date()).toISOString();
	let closedOfferIds = [];
	const next = rows.map((x) => {
		if (x.id === offer.id) return {
			...x,
			status: b.status,
			decidedAt: now,
			updatedAt: now
		};
		if (b.status === "ACCEPTED" && x.listingId === offer.listingId && x.id !== offer.id && x.status === "OPEN") {
			closedOfferIds.push(x.id);
			return {
				...x,
				status: "CLOSED",
				updatedAt: now
			};
		}
		return x;
	});
	save("offers", next);
	return json({
		ok: true,
		offer: next.find((x) => x.id === offer.id),
		closedOfferIds
	});
}

export { PATCH, POST };
//# sourceMappingURL=_server.js-BP46YcDQ.js.map

import { a as all, u as update } from '../../../chunks/store.js-DPrDqVrp.js';
import { g as getCatalogProduct } from '../../../chunks/catalog-store.js-DfOx9TlF.js';
import { g as getPayHubSession } from '../../../chunks/payhub.js-Qj2jxoIB.js';
import { f as finalizePaidOrder } from '../../../chunks/orders.js-t30g_oYl.js';
import { y as redirect } from '../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/payment-result/+page.server.js
var confirmedStates = /* @__PURE__ */ new Set([
	"PAID",
	"SHIPPED",
	"WAREHOUSE_RECEIVED",
	"AUTHENTICATED",
	"QA_PASSED",
	"DISPATCHED",
	"DELIVERED"
]);
function resultState(order, error = "") {
	const payment = String(order?.paymentStatus || "").toUpperCase();
	const status = String(order?.status || "").toUpperCase();
	if (confirmedStates.has(status)) return "success";
	if (payment === "CANCELLED") return "cancelled";
	if (payment === "FAILED" || status === "PAYMENT_FAILED") return "failed";
	if (payment === "EXPIRED" || status === "PAYMENT_EXPIRED") return "expired";
	if (error && status !== "PAYMENT_PENDING" && status !== "PAYMENT_PROCESSING") return "failed";
	return "pending";
}
async function load({ url, locals }) {
	if (!locals.user) throw redirect(303, `/account?next=${encodeURIComponent(url.pathname + url.search)}`);
	const orderId = url.searchParams.get("order") || "";
	const sessionId = url.searchParams.get("payment_session_id") || "";
	const returnStatus = url.searchParams.get("payment_status") || "";
	const order = all("orders").find((x) => x.id === orderId && x.buyerId === locals.user.id);
	if (!order) return {
		ok: false,
		state: "not_found",
		status: "not_found",
		order: null,
		item: null,
		retryUrl: null
	};
	let latest = order;
	let verified = false;
	let error = "";
	if (sessionId && order.paymentSessionId === sessionId) try {
		const session = await getPayHubSession(sessionId);
		verified = true;
		if (session.order_id !== order.id) error = "PAYMENT_ORDER_MISMATCH";
		else if (session.status === "PAID") {
			const result = finalizePaidOrder(order.id, session);
			if (result.ok) latest = result.order;
			else error = result.error || "PAYMENT_FINALIZE_FAILED";
		} else if (session.status === "CANCELLED") latest = update("orders", order.id, {
			status: "PAYMENT_FAILED",
			paymentStatus: "CANCELLED",
			failureCode: session.failure_code || "",
			failureMessage: session.failure_message || "",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}) || order;
		else if (session.status === "FAILED") latest = update("orders", order.id, {
			status: "PAYMENT_FAILED",
			paymentStatus: "FAILED",
			failureCode: session.failure_code || "",
			failureMessage: session.failure_message || "",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}) || order;
		else if (session.expires_at && Date.parse(session.expires_at) < Date.now()) latest = update("orders", order.id, {
			status: "PAYMENT_EXPIRED",
			paymentStatus: "EXPIRED",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}) || order;
		else latest = all("orders").find((x) => x.id === order.id) || order;
	} catch (e) {
		error = e.message || "PAYMENT_VERIFY_FAILED";
	}
	const listing = all("listings").find((x) => x.id === latest.listingId) || null;
	const product = getCatalogProduct(latest.product);
	const item = latest.item || {
		slug: product?.slug || latest.product || "",
		brand: product?.brand || "",
		title: product?.title || latest.product || "",
		image: listing?.actualPhoto || product?.image || "",
		condition: listing?.condition || "",
		boxCondition: listing?.boxCondition || "",
		partsStatus: listing?.partsStatus || "",
		manualStatus: listing?.manualStatus || "",
		shippingMethod: listing?.shippingMethod || ""
	};
	const retryUrl = Boolean(listing && listing.status === "ACTIVE" && !confirmedStates.has(latest.status)) ? `/checkout?listing=${encodeURIComponent(listing.id)}${latest.offerId ? `&offer=${encodeURIComponent(latest.offerId)}` : ""}` : null;
	const state = resultState(latest, error);
	return {
		ok: state === "success",
		state,
		status: latest.status,
		returnStatus,
		verified,
		error: state === "failed" ? error : "",
		order: latest,
		item,
		retryUrl
	};
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-DhEASPQg.js.map

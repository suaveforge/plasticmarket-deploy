import { a as all, u as update, s as save } from './store.js-DPrDqVrp.js';

//#region src/lib/server/orders.js
function finalizePaidOrder(orderId, payment = {}) {
	const orders = all("orders");
	const index = orders.findIndex((x) => x.id === orderId);
	if (index < 0) return {
		ok: false,
		error: "ORDER_NOT_FOUND"
	};
	const order = orders[index];
	if (order.status === "PAID") return {
		ok: true,
		order,
		idempotent: true
	};
	if (!["PAYMENT_PENDING", "PAYMENT_PROCESSING"].includes(order.status)) return {
		ok: false,
		error: "ORDER_NOT_PAYABLE"
	};
	const listing = all("listings").find((x) => x.id === order.listingId);
	if (!listing) return {
		ok: false,
		error: "LISTING_NOT_FOUND"
	};
	if (listing.status === "SOLD" && listing.soldOrderId && listing.soldOrderId !== order.id) return {
		ok: false,
		error: "LISTING_ALREADY_SOLD"
	};
	update("listings", listing.id, {
		status: "SOLD",
		soldOrderId: order.id
	});
	if (order.offerId) {
		const accepted = all("offers").find((x) => x.id === order.offerId && x.listingId === listing.id);
		if (accepted) update("offers", accepted.id, {
			status: "PAID",
			orderId: order.id
		});
		const offers = all("offers").map((x) => x.listingId === listing.id && x.id !== order.offerId && x.status === "OPEN" ? {
			...x,
			status: "CLOSED",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : x);
		save("offers", offers);
	}
	const collection = all("collection");
	const ci = collection.findIndex((x) => x.userId === order.buyerId && x.product === listing.product);
	const entry = {
		userId: order.buyerId,
		product: listing.product,
		status: "Ordered",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (ci >= 0) collection[ci] = entry;
	else collection.push(entry);
	save("collection", collection);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	orders[index] = {
		...order,
		status: "PAID",
		paymentStatus: "PAID",
		paymentSessionId: payment.id || order.paymentSessionId || "",
		paymentProvider: payment.provider || order.paymentProvider || "",
		providerPaymentId: payment.provider_payment_id || order.providerPaymentId || "",
		paidAt: now,
		updatedAt: now
	};
	save("orders", orders);
	return {
		ok: true,
		order: orders[index],
		idempotent: false
	};
}

export { finalizePaidOrder as f };
//# sourceMappingURL=orders.js-t30g_oYl.js.map

import { a as all, u as update } from '../../../../chunks/store.js-DPrDqVrp.js';
import { j as json } from '../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/orders/+server.js
var unauthorized = () => json({
	ok: false,
	error: "AUTH_REQUIRED"
}, { status: 401 });
async function PATCH({ request, locals }) {
	if (!locals.user) return unauthorized();
	const b = await request.json();
	const order = all("orders").find((x) => x.id === b.id);
	if (!order) return json({
		ok: false,
		error: "NOT_FOUND"
	}, { status: 404 });
	if (b.action === "SHIP") {
		if (order.sellerId !== locals.user.id || order.status !== "PAID" || !b.carrier || !b.trackingNumber) return json({
			ok: false,
			error: "INVALID_SHIPMENT"
		}, { status: 422 });
		const row = update("orders", order.id, {
			status: "SHIPPED",
			tracking: {
				carrier: String(b.carrier).slice(0, 80),
				trackingNumber: String(b.trackingNumber).slice(0, 120),
				shippedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		});
		return json({
			ok: true,
			order: row
		});
	}
	return json({
		ok: false,
		error: "INVALID_ORDER_ACTION"
	}, { status: 422 });
}

export { PATCH };
//# sourceMappingURL=_server.js-Cqqe_Coc.js.map

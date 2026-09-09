import { a as all, u as update } from '../../../../../chunks/store.js-DPrDqVrp.js';
import { i as isAdmin } from '../../../../../chunks/admin.js-Bs9SGw5b.js';
import { j as json } from '../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/admin/orders/+server.js
var transitions = {
	SHIPPED: {
		verificationStatus: "RECEIVED",
		status: "IN_VERIFICATION"
	},
	RECEIVED: {
		verificationStatus: "AUTHENTICATED",
		status: "IN_VERIFICATION"
	},
	AUTHENTICATED: {
		verificationStatus: "QA_PASSED",
		status: "IN_VERIFICATION"
	},
	QA_PASSED: {
		verificationStatus: "DISPATCHED",
		status: "DISPATCHED"
	},
	DISPATCHED: {
		verificationStatus: "DELIVERED",
		status: "DELIVERED"
	}
};
function GET({ cookies }) {
	if (!isAdmin(cookies)) return json({
		ok: false,
		error: "ADMIN_REQUIRED"
	}, { status: 403 });
	return json({
		ok: true,
		orders: all("orders")
	});
}
async function PATCH({ request, cookies }) {
	if (!isAdmin(cookies)) return json({
		ok: false,
		error: "ADMIN_REQUIRED"
	}, { status: 403 });
	const b = await request.json(), order = all("orders").find((x) => x.id === b.id);
	if (!order) return json({
		ok: false,
		error: "ORDER_NOT_FOUND"
	}, { status: 404 });
	const patch = transitions[order.verificationStatus === "NOT_RECEIVED" && order.status === "SHIPPED" ? "SHIPPED" : order.verificationStatus];
	if (!patch) return json({
		ok: false,
		error: "NO_NEXT_VERIFICATION_STATE"
	}, { status: 409 });
	return json({
		ok: true,
		order: update("orders", order.id, patch)
	});
}

export { GET, PATCH };
//# sourceMappingURL=_server.js-7UEKFfmh.js.map

import { a as all, u as update, b as append } from '../../../../chunks/store.js-DPrDqVrp.js';
import { g as getCatalogProduct } from '../../../../chunks/catalog-store.js-DfOx9TlF.js';
import { j as json } from '../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import '../../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/listings/+server.js
var unauthorized = () => json({
	ok: false,
	error: "AUTH_REQUIRED"
}, { status: 401 });
function GET() {
	return json({
		ok: true,
		items: all("listings").filter((x) => x.status === "ACTIVE")
	});
}
async function POST({ request, locals }) {
	if (!locals.user) return unauthorized();
	const b = await request.json();
	if (!getCatalogProduct(b.product)) return json({
		ok: false,
		error: "PRODUCT_NOT_FOUND"
	}, { status: 422 });
	if (!b.product || !b.condition || !b.boxCondition || !b.partsStatus || !b.manualStatus || !b.decalStatus || !b.actualPhoto || !Number.isFinite(Number(b.price)) || Number(b.price) <= 0 || !b.shippingMethod || !Number.isFinite(Number(b.shippingCost)) || Number(b.shippingCost) < 0) return json({
		ok: false,
		error: "MISSING_LISTING_FIELDS"
	}, { status: 422 });
	const row = {
		id: `LST-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
		sellerId: locals.user.id,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "ACTIVE",
		product: b.product,
		condition: b.condition,
		boxCondition: b.boxCondition,
		partsStatus: b.partsStatus,
		manualStatus: b.manualStatus,
		decalStatus: b.decalStatus,
		conditionNote: String(b.conditionNote || "").slice(0, 500),
		actualPhoto: b.actualPhoto,
		price: Number(b.price),
		shippingMethod: b.shippingMethod,
		shippingCost: Number(b.shippingCost),
		sellerName: locals.user.displayName || locals.user.email,
		sellerScore: null,
		sellerSales: null
	};
	append("listings", row);
	return json({
		ok: true,
		item: row
	}, { status: 201 });
}
async function PATCH({ request, locals }) {
	if (!locals.user) return unauthorized();
	const b = await request.json();
	if (!b.id || !["ACTIVE", "PAUSED"].includes(b.status)) return json({
		ok: false,
		error: "INVALID_LISTING_UPDATE"
	}, { status: 422 });
	if (!all("listings").find((x) => x.id === b.id && x.sellerId === locals.user.id)) return json({
		ok: false,
		error: "NOT_FOUND"
	}, { status: 404 });
	const row = update("listings", b.id, { status: b.status });
	return json({
		ok: true,
		item: row
	});
}

export { GET, PATCH, POST };
//# sourceMappingURL=_server.js-CLI6Wm5y.js.map

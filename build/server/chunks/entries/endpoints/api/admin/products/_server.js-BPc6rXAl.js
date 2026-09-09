import { a as all, u as update } from '../../../../../chunks/store.js-DPrDqVrp.js';
import { i as isAdmin } from '../../../../../chunks/admin.js-Bs9SGw5b.js';
import { c as catalogProducts, u as upsertCatalogProduct, n as normalizeCatalogProduct } from '../../../../../chunks/catalog-store.js-DfOx9TlF.js';
import { j as json } from '../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/admin/products/+server.js
var no = () => json({
	ok: false,
	error: "ADMIN_REQUIRED"
}, { status: 401 });
function GET({ cookies }) {
	if (!isAdmin(cookies)) return no();
	return json({
		ok: true,
		products: catalogProducts(),
		requests: all("product-requests").filter((x) => x.status === "PENDING")
	});
}
async function POST({ request, cookies }) {
	if (!isAdmin(cookies)) return no();
	const b = await request.json();
	try {
		const product = upsertCatalogProduct(b);
		return json({
			ok: true,
			product
		}, { status: 201 });
	} catch (e) {
		return json({
			ok: false,
			error: e.message || "PRODUCT_CREATE_FAILED"
		}, { status: 422 });
	}
}
async function PATCH({ request, cookies }) {
	if (!isAdmin(cookies)) return no();
	const b = await request.json();
	const req = all("product-requests").find((x) => x.id === b.id);
	if (!req || req.status !== "PENDING") return json({
		ok: false,
		error: "REQUEST_NOT_FOUND"
	}, { status: 404 });
	if (b.action === "REJECT") return json({
		ok: true,
		request: update("product-requests", req.id, {
			status: "REJECTED",
			reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
		})
	});
	if (b.action !== "APPROVE") return json({
		ok: false,
		error: "INVALID_ACTION"
	}, { status: 422 });
	try {
		const product = upsertCatalogProduct(normalizeCatalogProduct({
			...req,
			...b.product || {}
		}));
		const reviewed = update("product-requests", req.id, {
			status: "APPROVED",
			productSlug: product.slug,
			reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		return json({
			ok: true,
			product,
			request: reviewed
		});
	} catch (e) {
		return json({
			ok: false,
			error: e.message || "PRODUCT_APPROVE_FAILED"
		}, { status: 422 });
	}
}

export { GET, PATCH, POST };
//# sourceMappingURL=_server.js-BPc6rXAl.js.map

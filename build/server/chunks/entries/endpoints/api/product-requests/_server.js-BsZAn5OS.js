import { a as all, b as append } from '../../../../chunks/store.js-DPrDqVrp.js';
import { c as catalogProducts } from '../../../../chunks/catalog-store.js-DfOx9TlF.js';
import { j as json } from '../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:fs';
import 'node:path';
import '../../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/product-requests/+server.js
var clean = (v, n = 500) => String(v ?? "").trim().slice(0, n);
function GET({ locals }) {
	if (!locals.user) return json({
		ok: false,
		error: "AUTH_REQUIRED"
	}, { status: 401 });
	return json({
		ok: true,
		items: all("product-requests").filter((x) => x.requesterId === locals.user.id)
	});
}
async function POST({ request, locals }) {
	if (!locals.user) return json({
		ok: false,
		error: "AUTH_REQUIRED"
	}, { status: 401 });
	const b = await request.json();
	const row = {
		id: `PRQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
		requesterId: locals.user.id,
		requesterName: locals.user.displayName || locals.user.email,
		status: "PENDING",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		brand: clean(b.brand, 100),
		title: clean(b.title, 180),
		series: clean(b.series, 120),
		category: clean(b.category, 80),
		grade: clean(b.grade, 100),
		scale: clean(b.scale, 40),
		release: clean(b.release, 40),
		jan: clean(b.jan, 40),
		image: clean(b.image, 1e3),
		source: clean(b.source, 1e3),
		price: Number(b.price) || 0,
		priceCurrency: clean(b.priceCurrency || "JPY", 8).toUpperCase(),
		availability: clean(b.availability || "Released", 100)
	};
	if (!row.brand || !row.title || !row.category || !row.grade || !row.scale || !row.release || !row.image || !row.source || !Number.isFinite(row.price) || row.price <= 0) return json({
		ok: false,
		error: "MISSING_PRODUCT_REQUEST_FIELDS"
	}, { status: 422 });
	if (row.jan && catalogProducts().some((p) => p.jan && p.jan === row.jan)) return json({
		ok: false,
		error: "PRODUCT_ALREADY_EXISTS"
	}, { status: 409 });
	const dup = all("product-requests").find((x) => x.requesterId === locals.user.id && x.status === "PENDING" && (row.jan && x.jan === row.jan || `${x.brand}|${x.title}`.toLowerCase() === `${row.brand}|${row.title}`.toLowerCase()));
	if (dup) return json({
		ok: true,
		item: dup,
		reused: true
	});
	append("product-requests", row);
	return json({
		ok: true,
		item: row
	}, { status: 201 });
}

export { GET, POST };
//# sourceMappingURL=_server.js-BsZAn5OS.js.map

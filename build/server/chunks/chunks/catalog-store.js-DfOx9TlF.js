import { a as all, s as save } from './store.js-DPrDqVrp.js';
import { p as products } from './catalog.js-ZRvm4Oxk.js';

//#region src/lib/server/catalog-store.js
var clean = (v, n = 300) => String(v ?? "").trim().slice(0, n);
function catalogProducts() {
	const dynamic = all("products").filter((x) => x && x.slug);
	const bySlug = new Map(products.map((p) => [p.slug, p]));
	for (const p of dynamic) bySlug.set(p.slug, p);
	return [...bySlug.values()];
}
function getCatalogProduct(slug) {
	return catalogProducts().find((p) => p.slug === slug) || null;
}
function slugifyProduct(title, brand = "") {
	return `${brand}-${title}`.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || `product-${Date.now().toString(36)}`;
}
function normalizeCatalogProduct(input, { slug } = {}) {
	const price = Number(input.price);
	return {
		slug: clean(slug || input.slug || slugifyProduct(input.title, input.brand), 80),
		brand: clean(input.brand, 100),
		series: clean(input.series, 120),
		title: clean(input.title, 180),
		grade: clean(input.grade, 100),
		scale: clean(input.scale, 40),
		release: clean(input.release, 40),
		jan: clean(input.jan, 40),
		image: clean(input.image, 1e3),
		source: clean(input.source, 1e3),
		price: Number.isFinite(price) && price >= 0 ? price : 0,
		priceCurrency: clean(input.priceCurrency || "JPY", 8).toUpperCase(),
		priceLabel: clean(input.priceLabel || "Reference price", 80),
		availability: clean(input.availability || "Released", 100),
		category: clean(input.category, 80),
		createdAt: input.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function validateCatalogProduct(p) {
	return Boolean(p.slug && p.brand && p.title && p.grade && p.scale && p.release && p.image && p.source && p.category && Number.isFinite(Number(p.price)) && Number(p.price) >= 0);
}
function upsertCatalogProduct(input) {
	const p = normalizeCatalogProduct(input);
	if (!validateCatalogProduct(p)) throw new Error("MISSING_PRODUCT_FIELDS");
	const rows = all("products");
	if (catalogProducts().find((x) => x.slug === p.slug && !rows.find((r) => r.slug === p.slug))) throw new Error("PRODUCT_SLUG_EXISTS");
	if (p.jan && catalogProducts().find((x) => x.jan && x.jan === p.jan && x.slug !== p.slug)) throw new Error("PRODUCT_JAN_EXISTS");
	const i = rows.findIndex((x) => x.slug === p.slug);
	if (i >= 0) rows[i] = {
		...rows[i],
		...p
	};
	else rows.push(p);
	save("products", rows);
	return p;
}

export { catalogProducts as c, getCatalogProduct as g, normalizeCatalogProduct as n, upsertCatalogProduct as u };
//# sourceMappingURL=catalog-store.js-DfOx9TlF.js.map

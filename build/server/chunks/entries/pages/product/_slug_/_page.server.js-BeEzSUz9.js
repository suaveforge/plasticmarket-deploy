import { a as all } from '../../../../chunks/store.js-DPrDqVrp.js';
import { g as getCatalogProduct } from '../../../../chunks/catalog-store.js-DfOx9TlF.js';
import { v as error } from '../../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/product/[slug]/+page.server.js
function load({ params, locals }) {
	const product = getCatalogProduct(params.slug);
	if (!product) throw error(404, "Product not found");
	return {
		product,
		listings: all("listings").filter((x) => x.product === product.slug && x.status === "ACTIVE").sort((a, b) => a.price - b.price),
		offers: all("offers").filter((x) => x.product === product.slug && ["OPEN", "ACCEPTED"].includes(x.status)).sort((a, b) => b.amount - a.amount),
		orders: all("orders").filter((x) => x.product === product.slug && [
			"PAID",
			"SHIPPED",
			"WAREHOUSE_RECEIVED",
			"AUTHENTICATED",
			"QA_PASSED",
			"DISPATCHED",
			"DELIVERED"
		].includes(x.status)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
		collectionStatus: (locals.user ? all("collection").find((x) => x.userId === locals.user.id && x.product === product.slug) : null)?.status || null,
		user: locals.user || null
	};
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-BeEzSUz9.js.map

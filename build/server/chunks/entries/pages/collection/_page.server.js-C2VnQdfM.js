import { a as all } from '../../../chunks/store.js-DPrDqVrp.js';
import { c as catalogProducts } from '../../../chunks/catalog-store.js-DfOx9TlF.js';
import { y as redirect } from '../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/collection/+page.server.js
function load({ locals, url }) {
	if (!locals.user) throw redirect(303, `/account?next=${encodeURIComponent(url.pathname)}`);
	const products = catalogProducts();
	return { entries: all("collection").filter((x) => x.userId === locals.user.id).map((e) => ({
		entry: e,
		product: products.find((p) => p.slug === e.product)
	})).filter((x) => x.product) };
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-C2VnQdfM.js.map

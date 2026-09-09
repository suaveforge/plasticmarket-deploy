import { c as catalogProducts } from '../../../chunks/catalog-store.js-DfOx9TlF.js';
import { y as redirect } from '../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/sell/+page.server.js
function load({ locals, url }) {
	if (!locals.user) throw redirect(303, `/account?next=${encodeURIComponent(url.pathname + url.search)}`);
	return {
		product: url.searchParams.get("product") || null,
		products: catalogProducts()
	};
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-DUhmfEyp.js.map

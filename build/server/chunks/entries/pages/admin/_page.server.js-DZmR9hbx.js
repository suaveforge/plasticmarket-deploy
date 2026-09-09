import { a as all } from '../../../chunks/store.js-DPrDqVrp.js';
import { i as isAdmin, a as adminConfigured } from '../../../chunks/admin.js-Bs9SGw5b.js';
import { c as catalogProducts } from '../../../chunks/catalog-store.js-DfOx9TlF.js';

//#region src/routes/admin/+page.server.js
function load({ cookies }) {
	const authorized = isAdmin(cookies);
	return {
		configured: adminConfigured(),
		authorized,
		orders: authorized ? all("orders") : [],
		products: authorized ? catalogProducts() : [],
		productRequests: authorized ? all("product-requests").filter((x) => x.status === "PENDING") : []
	};
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-DZmR9hbx.js.map

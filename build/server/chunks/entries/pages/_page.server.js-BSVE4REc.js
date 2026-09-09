import { a as all } from '../../chunks/store.js-DPrDqVrp.js';

//#region src/routes/+page.server.js
function load({ locals }) {
	return { wishedProducts: locals.user ? all("collection").filter((x) => x.userId === locals.user.id && x.status === "Wished").map((x) => x.product) : [] };
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-BSVE4REc.js.map

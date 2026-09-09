import { b as private_env } from '../../../chunks/shared-server.js-9-2j12mp.js';
import { a as all } from '../../../chunks/store.js-DPrDqVrp.js';
import { g as getCatalogProduct } from '../../../chunks/catalog-store.js-DfOx9TlF.js';
import { y as redirect } from '../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/checkout/+page.server.js
function load({ url, locals }) {
	if (!locals.user) throw redirect(303, `/account?next=${encodeURIComponent(url.pathname + url.search)}`);
	const id = url.searchParams.get("listing");
	const listing = all("listings").find((x) => x.id === id && x.status === "ACTIVE") || null;
	const product = listing ? getCatalogProduct(listing.product) : null;
	const offerId = url.searchParams.get("offer");
	const offer = offerId ? all("offers").find((x) => x.id === offerId && x.buyerId === locals.user.id && x.listingId === id && x.status === "ACCEPTED") || null : null;
	const bps = Number(private_env.PLASTICMARKET_FEE_BPS || 0);
	return {
		listing,
		product,
		offer,
		feeBps: Number.isFinite(bps) && bps >= 0 ? bps : 0
	};
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-DYbC7sx0.js.map

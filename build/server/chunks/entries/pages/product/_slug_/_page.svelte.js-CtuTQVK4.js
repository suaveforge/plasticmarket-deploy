import { V as escape_html, W as attr, X as attr_class, Y as ensure_array_like, M as derived } from '../../../../chunks/server.js-CPD9auUj.js';
import { k as krw, m as money } from '../../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/product/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const initialWatched = () => data.collectionStatus === "Wished";
		let p = derived(() => data.product);
		let watched = initialWatched();
		let busy = false;
		let selectedListingId = "";
		let selectedListing = derived(() => data.listings.find((x) => x.id === selectedListingId) || data.listings[0] || null);
		let selectedTotal = derived(() => selectedListing() ? selectedListing().price + Number(selectedListing().shippingCost || 0) : 0);
		let highestOffer = derived(() => data.offers.find((x) => x.status === "OPEN") || null);
		let lastSale = derived(() => data.orders[0] || null);
		let acceptedOffer = derived(() => data.user ? data.offers.find((x) => x.buyerId === data.user.id && x.status === "ACCEPTED") || null : null);
		$$renderer.push(`<main><section class="product-page"><div class="gallery-pane"><div class="crumb">Marketplace / ${escape_html(p().category)} / ${escape_html(p().brand)}</div><div class="product-gallery"><img${attr("src", selectedListing()?.actualPhoto || p().image)}${attr("alt", selectedListing() ? `Actual listing from ${selectedListing().sellerName || "seller"}` : p().title)}/></div><div class="product-thumbs">`);
		if (selectedListing()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button${attr_class("thumb thumb-button", void 0, { "selected": true })} aria-label="Show selected seller listing photo"><img${attr("src", selectedListing().actualPhoto)} alt="Selected seller listing"/></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--><button${attr_class("thumb thumb-button", void 0, { "selected": !selectedListing() })} aria-label="Show catalog product photo"><img${attr("src", p().image)}${attr("alt", p().title)}/></button></div></div> <aside class="trade-pane"><div class="trade-sticky"><div class="product-kicker">${escape_html(p().brand)} · ${escape_html(p().series)}</div><h1>${escape_html(p().title)}</h1><div class="submeta">${escape_html(p().grade)} · ${escape_html(p().scale)} · Release ${escape_html(p().release)}</div> `);
		if (acceptedOffer()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="trade-card accepted-offer"><div class="trade-label">Accepted offer</div><div class="trade-price">${escape_html(krw(acceptedOffer().amount))}</div><a class="btn green full-gap-top"${attr("href", `/checkout?listing=${acceptedOffer().listingId}&offer=${acceptedOffer().id}`)}>Checkout accepted offer</a></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.listings.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="listing-picker" aria-label="Available seller listings"><div class="listing-picker-head"><div><small>Available listings</small><strong>${escape_html(data.listings.length)} seller${escape_html(data.listings.length === 1 ? "" : "s")}</strong></div><span>Choose the exact item you want to buy</span></div><div class="listing-picker-list"><!--[-->`);
			const each_array = ensure_array_like(data.listings);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let l = each_array[$$index];
				$$renderer.push(`<button type="button"${attr_class("listing-choice", void 0, { "selected": selectedListing()?.id === l.id })}${attr("aria-pressed", selectedListing()?.id === l.id)}><img${attr("src", l.actualPhoto)} alt="Actual item"/><span class="listing-choice-main"><strong>${escape_html(l.sellerName || "Seller")}${escape_html(l.demo ? " · Demo" : "")}</strong><small>${escape_html(l.condition)} · Box ${escape_html(l.boxCondition)} · ${escape_html(l.partsStatus)}</small>`);
				if (l.sellerScore) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<small>Seller ${escape_html(l.sellerScore)}% · ${escape_html(l.sellerSales || 0)} sales</small>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span><span class="listing-choice-price"><strong>${escape_html(krw(l.price + Number(l.shippingCost || 0)))}</strong><small>${escape_html(krw(l.price))} + ship ${escape_html(krw(l.shippingCost))}</small></span><span class="listing-choice-state">${escape_html(selectedListing()?.id === l.id ? "Selected" : "View")}</span></button>`);
			}
			$$renderer.push(`<!--]--></div></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (selectedListing()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="trade-card selected-listing-card" aria-live="polite"><div class="trade-label">Selected listing</div><div class="selected-seller-line"><strong>${escape_html(selectedListing().sellerName || "Seller")}${escape_html(selectedListing().demo ? " · Demo" : "")}</strong>`);
			if (selectedListing().sellerScore) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>${escape_html(selectedListing().sellerScore)}% · ${escape_html(selectedListing().sellerSales || 0)} sales</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div><div class="trade-price">${escape_html(krw(selectedListing().price))}</div><div class="listing-total-line"><span>Item ${escape_html(krw(selectedListing().price))}</span><span>Shipping ${escape_html(krw(selectedListing().shippingCost))}</span><strong>Total ${escape_html(krw(selectedTotal()))}</strong></div><div class="listing-specs"><span>${escape_html(selectedListing().condition)}</span><span>Box ${escape_html(selectedListing().boxCondition)}</span><span>${escape_html(selectedListing().partsStatus)}</span><span>Manual ${escape_html(selectedListing().manualStatus)}</span></div><div class="fee">${escape_html(selectedListing().shippingMethod)}</div><div class="split-actions"><a class="btn dark"${attr("href", data.user ? `/checkout?listing=${selectedListing().id}` : `/account?next=${encodeURIComponent(`/checkout?listing=${selectedListing().id}`)}`)}>Buy this listing</a><button class="btn">Make offer</button></div>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="trade-card"><div class="trade-label">${escape_html(p().priceLabel)}</div><div class="trade-price">${escape_html(money(p().price, p().priceCurrency))}</div><div class="split-actions"><a class="btn dark"${attr("href", data.user ? `/sell?product=${p().slug}` : `/account?next=${encodeURIComponent(`/sell?product=${p().slug}`)}`)}>Sell this item</a><button class="btn"${attr("disabled", busy, true)}>${escape_html(watched ? "Following" : "Follow")}</button></div></div>`);
		}
		$$renderer.push(`<!--]--> <div class="market-summary"><div class="stat"><small>Last sale</small><strong>${escape_html(lastSale() ? krw(lastSale().itemAmount || lastSale().amount) : "—")}</strong></div><div class="stat"><small>Highest offer</small><strong>${escape_html(highestOffer() ? krw(highestOffer().amount) : "—")}</strong></div></div>`);
		if (selectedListing()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="trade-card trade-card-compact"><button class="btn full"${attr("disabled", busy, true)}>${escape_html(watched ? "Following" : "Follow")}</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></aside></section> <section class="below"><div class="section-head"><h2>Product details</h2></div><div class="facts"><div class="fact"><small>Manufacturer</small><strong>${escape_html(p().brand)}</strong></div><div class="fact"><small>Series</small><strong>${escape_html(p().series)}</strong></div><div class="fact"><small>Grade</small><strong>${escape_html(p().grade)}</strong></div><div class="fact"><small>Scale</small><strong>${escape_html(p().scale)}</strong></div><div class="fact"><small>Release</small><strong>${escape_html(p().release)}</strong></div><div class="fact"><small>JAN / Product ID</small><strong>${escape_html(p().jan || "—")}</strong></div><div class="fact"><small>Active listings</small><strong>${escape_html(data.listings.length)}</strong></div><div class="fact"><small>Availability</small><strong>${escape_html(p().availability)}</strong></div></div> <div class="history"><div class="section-head"><h2>Market data</h2></div>`);
		if (data.orders.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="table"><div class="row market-row head"><div>Date</div><div>Sale price</div><div>Order status</div></div><!--[-->`);
			const each_array_1 = ensure_array_like(data.orders.slice(0, 8));
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let o = each_array_1[$$index_1];
				$$renderer.push(`<div class="row market-row"><div>${escape_html(new Date(o.createdAt).toLocaleDateString())}</div><div><strong>${escape_html(krw(o.itemAmount || o.amount))}</strong></div><div><span class="status">${escape_html(o.status)}</span></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="panel"><strong>Market data unavailable</strong></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="section product-section-bottom-zero"><div class="section-head"><h2>All listing details</h2><p class="section-note">Selecting a row also updates the purchase panel above.</p></div>`);
		if (data.listings.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="table"><div class="row listing-row head"><div>Seller / condition</div><div>Price</div><div>Shipping</div><div>Published</div><div>Action</div></div><!--[-->`);
			const each_array_2 = ensure_array_like(data.listings);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let l = each_array_2[$$index_2];
				$$renderer.push(`<div${attr_class("row listing-row listing-selectable", void 0, { "selected-listing": selectedListing()?.id === l.id })} role="button" tabindex="0"><div class="listing-condition"><img${attr("src", l.actualPhoto)} alt="Actual item"/><span><strong>${escape_html(l.sellerName || "Seller")}${escape_html(l.demo ? " · Demo" : "")}</strong><br/><span class="meta">${escape_html(l.condition)} · Box ${escape_html(l.boxCondition)} · ${escape_html(l.partsStatus)}</span>`);
				if (l.sellerScore) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<br/><span class="meta">Seller ${escape_html(l.sellerScore)}% · ${escape_html(l.sellerSales || 0)} sales</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span></div><div>${escape_html(krw(l.price))}</div><div>${escape_html(l.shippingMethod)} · ${escape_html(krw(l.shippingCost))}</div><div>${escape_html(new Date(l.createdAt).toLocaleDateString())}</div><div class="row-actions"><button${attr_class("btn", void 0, { "selected": selectedListing()?.id === l.id })}>${escape_html(selectedListing()?.id === l.id ? "Selected" : "View")}</button><a class="btn"${attr("href", data.user ? `/checkout?listing=${l.id}` : `/account?next=${encodeURIComponent(`/checkout?listing=${l.id}`)}`)}>Buy</a></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="panel"><strong>No active listings</strong><div class="hint-tight"><a class="btn dark"${attr("href", data.user ? `/sell?product=${p().slug}` : `/account?next=${encodeURIComponent(`/sell?product=${p().slug}`)}`)}>Sell this item</a></div></div>`);
		}
		$$renderer.push(`<!--]--></div></section> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CtuTQVK4.js.map

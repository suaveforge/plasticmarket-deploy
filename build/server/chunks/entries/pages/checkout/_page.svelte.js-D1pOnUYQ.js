import { W as attr, V as escape_html, M as derived } from '../../../chunks/server.js-CPD9auUj.js';
import { k as krw } from '../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/checkout/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let p = derived(() => data.product);
		let listing = derived(() => data.listing);
		let offer = derived(() => data.offer);
		let address = {
			name: "",
			phone: "",
			postalCode: "",
			address1: "",
			address2: "",
			city: "",
			country: "KR"
		};
		let itemAmount = derived(() => offer() ? offer().amount : listing()?.price || 0);
		let fee = derived(() => listing() ? Math.round(itemAmount() * data.feeBps / 1e4) : 0);
		let total = derived(() => listing() ? itemAmount() + listing().shippingCost + fee() : 0);
		$$renderer.push(`<main class="shell">`);
		if (!listing()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="page-head"><div class="eyebrow">Checkout</div><h1>Listing unavailable</h1><a class="btn dark" href="/browse">Browse market</a></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="checkout-grid"><section><div class="page-head"><div class="eyebrow">Checkout</div><h1>Review your order</h1></div><div class="order-box"><div class="order-item"><img${attr("src", listing().actualPhoto || p().image)}${attr("alt", p().title)}/><div><div class="brandline">${escape_html(p().brand)}</div><strong>${escape_html(p().title)}</strong><div class="meta">${escape_html(listing().condition)}</div><div class="meta">Box ${escape_html(listing().boxCondition)} · ${escape_html(listing().partsStatus)} · Manual ${escape_html(listing().manualStatus)}</div>`);
			if (offer()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="status inline-status">Accepted offer · ${escape_html(krw(offer().amount))}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div></div><div class="panel inline-gap-top"><h2>Shipping address</h2><div class="address-grid"><label>Name<input class="catalog-search"${attr("value", address.name)} autocomplete="name"/></label><label>Phone<input class="catalog-search"${attr("value", address.phone)} autocomplete="tel"/></label><label>Postal code<input class="catalog-search"${attr("value", address.postalCode)} autocomplete="postal-code"/></label><label>City<input class="catalog-search"${attr("value", address.city)} autocomplete="address-level2"/></label><label class="span-2">Address<input class="catalog-search"${attr("value", address.address1)} autocomplete="address-line1"/></label><label class="span-2">Address 2<input class="catalog-search"${attr("value", address.address2)} autocomplete="address-line2"/></label><label>Country`);
			$$renderer.select({
				class: "catalog-search",
				value: address.country
			}, ($$renderer) => {
				$$renderer.option({ value: "KR" }, ($$renderer) => {
					$$renderer.push(`Korea`);
				});
				$$renderer.option({ value: "JP" }, ($$renderer) => {
					$$renderer.push(`Japan`);
				});
				$$renderer.option({ value: "US" }, ($$renderer) => {
					$$renderer.push(`United States`);
				});
				$$renderer.option({ value: "TW" }, ($$renderer) => {
					$$renderer.push(`Taiwan`);
				});
				$$renderer.option({ value: "HK" }, ($$renderer) => {
					$$renderer.push(`Hong Kong`);
				});
				$$renderer.option({ value: "VN" }, ($$renderer) => {
					$$renderer.push(`Vietnam`);
				});
				$$renderer.option({ value: "ID" }, ($$renderer) => {
					$$renderer.push(`Indonesia`);
				});
				$$renderer.option({ value: "ES" }, ($$renderer) => {
					$$renderer.push(`Spain`);
				});
				$$renderer.option({ value: "CN" }, ($$renderer) => {
					$$renderer.push(`China`);
				});
			});
			$$renderer.push(`</label></div></div><div class="integration-note"><strong>Secure checkout by PayHub</strong><br/>Available payment methods are selected on PayHub according to country and project settings.</div></section><aside><div class="order-box"><h2 class="flush-top">Order summary</h2><div class="line"><span>Item</span><strong>${escape_html(krw(itemAmount()))}</strong></div><div class="line"><span>${escape_html(listing().shippingMethod)}</span><strong>${escape_html(krw(listing().shippingCost))}</strong></div>`);
			if (fee() > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="line"><span>Marketplace fee</span><strong>${escape_html(krw(fee()))}</strong></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--><div class="line total"><span>Total</span><strong>${escape_html(krw(total()))}</strong></div><button class="btn green full-gap-top"${attr("disabled", false, true)}>${escape_html("Continue to payment")}</button>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></aside></div>`);
		}
		$$renderer.push(`<!--]--></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-D1pOnUYQ.js.map

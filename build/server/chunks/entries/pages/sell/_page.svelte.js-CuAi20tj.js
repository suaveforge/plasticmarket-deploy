import { X as attr_class, W as attr, Y as ensure_array_like, V as escape_html, M as derived } from '../../../chunks/server.js-CPD9auUj.js';
import { k as krw, m as money } from '../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/sell/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let products = derived(() => data.products || []);
		const initialSelected = () => products().find((p) => p.slug === data.product) || products()[0];
		let q = "";
		let selected = initialSelected();
		let condition = "Unopened / factory sealed";
		let boxCondition = "A · Clean";
		let partsStatus = "Complete";
		let manualStatus = "Included";
		let decalStatus = "Unused / included";
		let conditionNote = "";
		let price = "";
		let shippingMethod = "Domestic tracked";
		let shippingCost = "";
		let photo = "";
		let reviewing = false;
		let busy = false;
		let matches = derived(() => products().filter((p) => true).slice(0, 6));
		let ready = derived(() => Boolean(selected && photo));
		$$renderer.push(`<main class="flow-shell"><div class="page-head"><h1>Sell</h1></div> <div class="stepper"><div class="step active">1 Catalog</div><div${attr_class("step", void 0, { "active": Boolean(condition) })}>2 Condition</div><div${attr_class("step", void 0, { "active": Boolean(photo) })}>3 Photos</div><div${attr_class("step", void 0, { "active": Number(price) > 0 })}>4 Price</div><div${attr_class("step", void 0, { "active": false })}>5 Shipping</div><div${attr_class("step", void 0, { "active": reviewing })}>6 Review</div></div> <div class="flow-grid"><section><div class="panel"><h2>1. Match product</h2><p class="hint">Search manufacturer, series, product name or JAN.</p><input class="catalog-search"${attr("value", q)} placeholder="RX-78-2 / Hatsune Miku / 4543112836557"/><!--[-->`);
		const each_array = ensure_array_like(matches());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let p = each_array[$$index];
			$$renderer.push(`<button type="button"${attr_class("match", void 0, { "selected": selected?.slug === p.slug })}><img${attr("src", p.image)}${attr("alt", p.title)}/><span><strong>${escape_html(p.title)}</strong><span>${escape_html(p.brand)} · ${escape_html(p.grade)} · ${escape_html(p.scale)}</span></span><span>${escape_html(p.availability)}</span></button>`);
		}
		$$renderer.push(`<!--]-->`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="panel inline-gap-top"><h2>2. Condition</h2><p class="hint">Disclose the exact item before a buyer commits.</p><div class="condition-grid"><!--[-->`);
		const each_array_1 = ensure_array_like([
			"Unopened / factory sealed",
			"Opened / runners sealed",
			"Opened / runners opened",
			"Built / unpainted",
			"Partially painted",
			"Painted complete"
		]);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let c = each_array_1[$$index_1];
			$$renderer.push(`<button${attr_class("condition", void 0, { "active": condition === c })}>${escape_html(c)}</button>`);
		}
		$$renderer.push(`<!--]--></div><div class="condition-fields"><label>Box`);
		$$renderer.select({
			class: "catalog-search",
			value: boxCondition,
			onchange: () => reviewing = false
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`A · Clean`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`B · Minor wear`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`C · Noticeable damage`);
			});
		});
		$$renderer.push(`</label><label>Parts`);
		$$renderer.select({
			class: "catalog-search",
			value: partsStatus,
			onchange: () => reviewing = false
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Complete`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Missing parts disclosed`);
			});
		});
		$$renderer.push(`</label><label>Manual`);
		$$renderer.select({
			class: "catalog-search",
			value: manualStatus,
			onchange: () => reviewing = false
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Included`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Missing`);
			});
		});
		$$renderer.push(`</label><label>Decals / stickers`);
		$$renderer.select({
			class: "catalog-search",
			value: decalStatus,
			onchange: () => reviewing = false
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Unused / included`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Partially used`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Used`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Missing`);
			});
		});
		$$renderer.push(`</label></div><label class="condition-note">Condition note<textarea maxlength="500" placeholder="Describe visible damage, missing parts, paint, repair or modification">`);
		const $$body = escape_html(conditionNote);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></label></div> <div class="panel inline-gap-top"><h2>3–5. Listing details</h2><div class="detail-fields"><label>Actual-item photo<div class="photo-actions"><label class="btn cursor-pointer">Choose photo<input type="file" accept="image/*" hidden=""/></label>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></label><label>Selling price (KRW)<input class="catalog-search"${attr("value", price)} inputmode="numeric" placeholder="Selling price"/></label><label>Shipping method`);
		$$renderer.select({
			class: "catalog-search",
			value: shippingMethod,
			onchange: () => reviewing = false
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Domestic tracked`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`International tracked`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Pickup`);
			});
		});
		$$renderer.push(`</label><label>Shipping cost (KRW)<input class="catalog-search"${attr("value", shippingCost)} inputmode="numeric" placeholder="Shipping cost"/></label></div></div></section><aside><div class="summary-card">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<img${attr("src", selected.image)}${attr("alt", selected.title)}/>`);
		$$renderer.push(`<!--]--><div class="brandline inline-gap-top">${escape_html(selected.brand)}</div><h3>${escape_html(selected.title)}</h3><div class="meta">${escape_html(condition)}</div><div class="condition-summary"><span>Box ${escape_html(boxCondition)}</span><span>${escape_html(partsStatus)}</span><span>Manual ${escape_html(manualStatus)}</span><span>${escape_html(decalStatus)}</span></div>`);
		if (Number(price) > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="price-row"><div class="ask"><span class="label">Selling price</span><strong>${escape_html(krw(Number(price)))}</strong></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="price-row"><div class="ask"><span class="label">${escape_html(selected.priceLabel)}</span><strong>${escape_html(money(selected.price, selected.priceCurrency))}</strong></div></div>`);
		}
		$$renderer.push(`<!--]-->`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!reviewing) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="btn dark review-action"${attr("disabled", !ready(), true)}>Review listing</button>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="review-box"><strong>Ready to publish</strong><p class="hint">Product, condition, actual photo, price and shipping are locked to this listing.</p></div><button class="btn green publish-action"${attr("disabled", busy, true)}>${escape_html("Publish listing")}</button><button class="btn edit-action">Edit listing</button>`);
		}
		$$renderer.push(`<!--]--></div></aside></div>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CuAi20tj.js.map

import { Y as ensure_array_like, W as attr, V as escape_html, X as attr_class, M as derived } from '../../../chunks/server.js-CPD9auUj.js';
import { P as ProductCard } from '../../../chunks/ProductCard.js-kkWLLyIX.js';
import '../../../chunks/shared.js-CAHedLfL.js';
import '../../../chunks/catalog.js-ZRvm4Oxk.js';

//#region src/routes/browse/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const initialCategory = () => data.initialCategory;
		const initialQuery = () => data.initialQuery;
		const initialView = () => data.initialView || "all";
		let category = initialCategory();
		let sort = "Featured";
		let q = initialQuery();
		let grade = "All";
		let listingOnly = false;
		let view = initialView();
		let viewProducts = derived(() => data.products.filter((p) => (view !== "preorder" || /preorder|shipping/i.test(p.availability)) && (view !== "new" || !/preorder|shipping/i.test(p.availability) && Number(String(p.release).slice(0, 4)) >= 2024)));
		let cats = derived(() => ["All", ...new Set(viewProducts().map((p) => p.category))]);
		let categoryProducts = derived(() => viewProducts().filter((p) => category === "All" || p.category === category));
		let grades = derived(() => ["All", ...new Set(categoryProducts().map((p) => p.grade))]);
		let filtered = derived(() => data.products.filter((p) => (category === "All" || p.category === category) && (view !== "preorder" || /preorder|shipping/i.test(p.availability)) && (view !== "new" || !/preorder|shipping/i.test(p.availability) && Number(String(p.release).slice(0, 4)) >= 2024) && (!q || [
			p.title,
			p.brand,
			p.series,
			p.jan
		].some((v) => String(v || "").toLowerCase().includes(q.toLowerCase())))).toSorted((a, b) => String(b.release).localeCompare(String(a.release))));
		$$renderer.push(`<main class="shell"><div class="browse-layout"><aside class="filters"><div class="filter-group"><strong>Category</strong><!--[-->`);
		const each_array = ensure_array_like(cats());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let c = each_array[$$index];
			$$renderer.push(`<label class="check"><input type="radio" name="category"${attr("checked", category === c, true)}/>${escape_html(c)}</label>`);
		}
		$$renderer.push(`<!--]--></div> <div class="filter-group"><strong>Grade / type</strong>`);
		$$renderer.select({
			class: "sort",
			value: grade
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(grades());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let g = each_array_1[$$index_1];
				$$renderer.option({}, g);
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`</div> <div class="filter-group"><strong>Availability</strong><label class="check"><input type="checkbox"${attr("checked", listingOnly, true)}/>Active PlasticMarket listings only</label></div></aside><section><div class="results-head"><div><h1>Marketplace</h1><div class="meta">${escape_html(filtered().length)} catalog products</div></div>`);
		$$renderer.select({
			class: "sort",
			value: sort
		}, ($$renderer) => {
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Featured`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Lowest listing`);
			});
			$$renderer.option({}, ($$renderer) => {
				$$renderer.push(`Reference price`);
			});
		});
		$$renderer.push(`</div> <input class="catalog-search"${attr("value", q)} placeholder="Search manufacturer, series, product name or JAN"/> <div class="chips chips-top"><button${attr_class("chip", void 0, { "active": view === "all" })}>All products</button><button${attr_class("chip", void 0, { "active": view === "new" })}>New releases</button><button${attr_class("chip", void 0, { "active": view === "preorder" })}>Preorders</button></div> <div class="chips chips-top"><!--[-->`);
		const each_array_2 = ensure_array_like(cats());
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let c = each_array_2[$$index_2];
			$$renderer.push(`<button${attr_class("chip", void 0, { "active": category === c })}>${escape_html(c)}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="product-grid"><!--[-->`);
		const each_array_3 = ensure_array_like(filtered());
		for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let p = each_array_3[$$index_3];
			ProductCard($$renderer, {
				p,
				initialWatched: data.wishedProducts?.includes(p.slug)
			});
		}
		$$renderer.push(`<!--]--></div> `);
		if (filtered().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="panel panel-top"><h2>No matching products</h2><p class="hint">Change or clear the current filters.</p><button class="btn dark">Clear filters</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section></div></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BYry5onB.js.map

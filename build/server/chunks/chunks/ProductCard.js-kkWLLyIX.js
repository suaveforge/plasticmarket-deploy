import { W as attr, V as escape_html } from './server.js-CPD9auUj.js';
import { k as krw, m as money } from './catalog.js-ZRvm4Oxk.js';

//#region src/lib/ProductCard.svelte
function ProductCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { p, initialWatched = false, showWatch = true, onWatchChange = () => {} } = $$props;
		const initialWatch = () => initialWatched;
		let watched = Boolean(initialWatch());
		let busy = false;
		$$renderer.push(`<article class="product-card"><a${attr("href", `/product/${p.slug}`)}${attr("aria-label", p.title)}><div class="media"><img${attr("src", p.image)}${attr("alt", p.title)}/><span class="badge">${escape_html(p.availability)}</span></div></a> `);
		if (showWatch) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="watch"${attr("aria-label", watched ? "Remove from watchlist" : "Add to watchlist")}${attr("aria-pressed", watched)}${attr("disabled", busy, true)}>${escape_html(watched ? "♥" : "♡")}</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="card-info"><div class="brandline">${escape_html(p.brand)}</div><a class="title"${attr("href", `/product/${p.slug}`)}>${escape_html(p.title)}</a><div class="meta">${escape_html(p.grade)} · ${escape_html(p.scale)}</div><div class="price-row"><div class="ask"><span class="label">${escape_html(p.lowestListing != null ? "Lowest listing" : p.priceLabel)}</span><strong>${escape_html(p.lowestListing != null ? krw(p.lowestListing) : money(p.price, p.priceCurrency))}</strong></div>`);
		if (p.listingCount > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="move">${escape_html(p.listingCount)} ${escape_html(p.listingCount === 1 ? "listing" : "listings")}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></article> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { ProductCard as P };
//# sourceMappingURL=ProductCard.js-kkWLLyIX.js.map

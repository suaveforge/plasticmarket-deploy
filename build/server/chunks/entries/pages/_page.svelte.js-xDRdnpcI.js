import { V as escape_html, Y as ensure_array_like } from '../../chunks/server.js-CPD9auUj.js';
import { p as products } from '../../chunks/catalog.js-ZRvm4Oxk.js';
import { t as translate } from '../../chunks/i18n.js-Cy6Sbfe9.js';
import { P as ProductCard } from '../../chunks/ProductCard.js-kkWLLyIX.js';
import '../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const t = (k) => translate(data.locale || "ko", k);
		const preorder = products.filter((p) => /preorder|shipping/i.test(p.availability));
		const released = products.filter((p) => !preorder.includes(p)).toSorted((a, b) => String(b.release).localeCompare(String(a.release)));
		const preorderFeatured = preorder.toSorted((a, b) => String(a.release).localeCompare(String(b.release))).slice(0, 4);
		$$renderer.push(`<main><section class="market-home-head"><div class="shell market-home-row"><div><h1>${escape_html(t("marketplace"))}</h1></div><a class="btn dark" href="/browse">${escape_html(t("browse"))}</a></div></section> <section class="section"><div class="shell"><div class="section-head"><h2>${escape_html(t("new"))}</h2><a href="/browse?view=new">${escape_html(t("browse"))}</a></div><div class="product-grid"><!--[-->`);
		const each_array = ensure_array_like(released.slice(0, 4));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let p = each_array[$$index];
			ProductCard($$renderer, {
				p,
				initialWatched: data.wishedProducts?.includes(p.slug)
			});
		}
		$$renderer.push(`<!--]--></div></div></section> <section class="section"><div class="shell"><div class="section-head"><h2>${escape_html(t("preorders"))}</h2><a href="/browse?view=preorder">${escape_html(t("browse"))}</a></div><div class="product-grid"><!--[-->`);
		const each_array_1 = ensure_array_like(preorderFeatured);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let p = each_array_1[$$index_1];
			ProductCard($$renderer, {
				p,
				initialWatched: data.wishedProducts?.includes(p.slug)
			});
		}
		$$renderer.push(`<!--]--></div></div></section> <section class="section"><div class="shell"><div class="section-head"><h2>${escape_html(t("browse"))}</h2></div><div class="category-strip"><a class="cat" href="/browse?category=Gunpla"><strong>Gunpla</strong><span>MG · RG · HG · PG</span></a><a class="cat" href="/browse?category=Figures"><strong>Figures</strong><span>Scale figures</span></a><a class="cat" href="/browse?category=Character%20Kits"><strong>Character Kits</strong><span>Megami Device</span></a><a class="cat" href="/browse?category=Cars"><strong>Cars</strong><span>1/24 · 1/20 · 1/12</span></a><a class="cat" href="/browse"><strong>${escape_html(t("browse"))}</strong><span>${escape_html(products.length)}</span></a></div></div></section> <section data-sitehub-searchops="p40" class="section" aria-label="PlasticMarket 서비스 안내"><div class="shell"><div class="section-head"><h2>PlasticMarket 안내</h2></div><p>피규어·프라모델을 카테고리와 출시 상태로 탐색하고, 판매 등록·컬렉션·주문 흐름을 한 곳에서 관리하는 글로벌 마켓플레이스입니다.</p><p><strong>운영 및 지원:</strong> SuaveForge가 서비스 운영과 기술 지원을 담당합니다.</p></div></section></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-xDRdnpcI.js.map

import { U as head, V as escape_html, W as attr, X as attr_class, M as derived } from '../../chunks/server.js-CPD9auUj.js';
import { p as page } from '../../chunks/state.js-DkwUbWAb.js';
import { t as translate } from '../../chunks/i18n.js-Cy6Sbfe9.js';
import '../../chunks/shared.js-CAHedLfL.js';
import '../../chunks/client.js-CqBk8mpD.js';
import '../../chunks/index-server.js-CUF4lwg3.js';
import '../../chunks/exports.js-Dd48p7Ih.js';
import '../../chunks/internal2.js-CmbVxp2R.js';
import '../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		const initialLocale = () => data.locale || "ko";
		const initialCurrency = () => data.currency || "KRW";
		const initialShip = () => data.ship || "KR";
		let lang = initialLocale();
		let currency = initialCurrency();
		let ship = initialShip();
		let search = "";
		let logoutBusy = false;
		let portfolioMode = derived(() => data.portfolioMode === true);
		const t = (k) => translate(lang, k);
		const canonicalUrl = derived(() => `${page.url.origin}${page.url.pathname}`);
		const modeHref = (href) => {
			if (!portfolioMode() || !href || /^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) return href;
			const [beforeHash, ...hashParts] = href.split("#");
			const hash = hashParts.length ? `#${hashParts.join("#")}` : "";
			return `${beforeHash}${beforeHash.includes("?") ? "&" : "?"}potpolio=1${hash}`;
		};
		function persist(name, value) {
			document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
		}
		function setLang(v) {
			lang = v;
			persist("pm_lang", v);
			location.reload();
		}
		function sectionActive(name) {
			const p = page.url.pathname;
			if (name === "browse") return p === "/browse" || p.startsWith("/product/") || p === "/checkout" || p === "/payment-result";
			if (name === "sell") return p === "/sell";
			if (name === "collection") return p === "/collection";
			if (name === "seller") return p === "/seller";
			if (name === "account") return p === "/account" || p === "/auth/callback";
			return false;
		}
		function browseActive({ category = "", view = "" } = {}) {
			if (page.url.pathname !== "/browse") return false;
			const c = page.url.searchParams.get("category") || "";
			const v = page.url.searchParams.get("view") || "all";
			return category ? c === category && v === "all" : view ? v === view : !c && v === "all";
		}
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(portfolioMode() ? "PlasticMarket" : "PlasticMarket | SuaveForge 프로젝트")}</title>`);
			});
			$$renderer.push(`<meta name="robots"${attr("content", portfolioMode() ? "noindex,nofollow,noarchive,nosnippet" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1")}/> `);
			if (!portfolioMode()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta name="author" content="SuaveForge"/> <meta name="description" content="PlasticMarket 피규어·프라모델 글로벌 마켓플레이스. SuaveForge 제작 프로젝트."/> <link rel="canonical"${attr("href", canonicalUrl())}/> <meta property="og:type" content="website"/> <meta property="og:title" content="PlasticMarket | SuaveForge 프로젝트"/> <meta property="og:description" content="PlasticMarket 피규어·프라모델 글로벌 마켓플레이스. SuaveForge 제작 프로젝트."/> <meta property="og:image" content="https://sitehub.suaveforge.com/assets/namecard-default.png"/> <meta property="og:url"${attr("content", canonicalUrl())}/> <meta property="og:site_name" content="SuaveForge"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title" content="PlasticMarket | SuaveForge 프로젝트"/> <meta name="twitter:description" content="PlasticMarket 피규어·프라모델 글로벌 마켓플레이스. SuaveForge 제작 프로젝트."/> <meta name="twitter:image" content="https://sitehub.suaveforge.com/assets/namecard-default.png"/> `);
				$$renderer.push(`<script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'WebApplication',name:'PlasticMarket',url:canonicalUrl,creator:{'@type':'Organization',name:'SuaveForge',url:'https://suaveforge.com/'}})}<\/script>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<div class="topline"><div class="shell"><span>${escape_html(ship)}</span><span>${escape_html(currency)}</span><span>${escape_html(lang.toUpperCase())}</span></div></div> <header class="header"><div class="shell nav"><a class="brand"${attr("href", modeHref("/"))}>PLASTIC<b>MARKET</b></a> <form class="searchbox"${attr("action", modeHref("/browse"))}>`);
		if (portfolioMode()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<input type="hidden" name="potpolio" value="1"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--><input name="q"${attr("value", search)}${attr("placeholder", t("search"))}${attr("aria-label", t("search"))}/></form> <nav class="navlinks"><a${attr("aria-current", sectionActive("browse") ? "page" : void 0)}${attr("href", modeHref("/browse"))}${attr_class("", void 0, { "active": sectionActive("browse") })}>${escape_html(t("browse"))}</a> <a${attr("aria-current", sectionActive("sell") ? "page" : void 0)}${attr("href", modeHref("/sell"))}${attr_class("", void 0, { "active": sectionActive("sell") })}>${escape_html(t("sell"))}</a> <a${attr("aria-current", sectionActive("collection") ? "page" : void 0)}${attr("href", modeHref("/collection"))}${attr_class("", void 0, { "active": sectionActive("collection") })}>${escape_html(t("collection"))}</a> <a${attr("aria-current", sectionActive("seller") ? "page" : void 0)}${attr("href", modeHref("/seller"))}${attr_class("", void 0, { "active": sectionActive("seller") })}>${escape_html(t("seller"))}</a> `);
		if (data.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button${attr("disabled", logoutBusy, true)}>${escape_html(t("signout"))}</button>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<a${attr("aria-current", sectionActive("account") ? "page" : void 0)}${attr("href", modeHref("/account"))}${attr_class("", void 0, { "active": sectionActive("account") })}>${escape_html(t("sign"))}</a>`);
		}
		$$renderer.push(`<!--]--></nav></div> <div class="subnav"><div class="shell"><a${attr("href", modeHref("/browse?category=Gunpla"))}${attr_class("", void 0, { "active": browseActive({ category: "Gunpla" }) })}>Gunpla</a><a${attr("href", modeHref("/browse?category=Figures"))}${attr_class("", void 0, { "active": browseActive({ category: "Figures" }) })}>Figures</a><a${attr("href", modeHref("/browse?category=Character%20Kits"))}${attr_class("", void 0, { "active": browseActive({ category: "Character Kits" }) })}>Character Kits</a><a${attr("href", modeHref("/browse?category=Cars"))}${attr_class("", void 0, { "active": browseActive({ category: "Cars" }) })}>Cars</a><a${attr("href", modeHref("/browse?view=new"))}${attr_class("", void 0, { "active": browseActive({ view: "new" }) })}>${escape_html(t("newReleases"))}</a><a${attr("href", modeHref("/browse?view=preorder"))}${attr_class("", void 0, { "active": browseActive({ view: "preorder" }) })}>${escape_html(t("preorders"))}</a> <span class="locale-controls">`);
		$$renderer.select({
			"aria-label": t("language"),
			value: lang,
			onchange: (e) => setLang(e.currentTarget.value)
		}, ($$renderer) => {
			$$renderer.option({ value: "ko" }, ($$renderer) => {
				$$renderer.push(`한국어`);
			});
			$$renderer.option({ value: "en" }, ($$renderer) => {
				$$renderer.push(`English`);
			});
			$$renderer.option({ value: "ja" }, ($$renderer) => {
				$$renderer.push(`日本語`);
			});
			$$renderer.option({ value: "zh-TW" }, ($$renderer) => {
				$$renderer.push(`繁體中文`);
			});
			$$renderer.option({ value: "zh-CN" }, ($$renderer) => {
				$$renderer.push(`简体中文`);
			});
			$$renderer.option({ value: "vi" }, ($$renderer) => {
				$$renderer.push(`Tiếng Việt`);
			});
			$$renderer.option({ value: "id" }, ($$renderer) => {
				$$renderer.push(`Bahasa Indonesia`);
			});
			$$renderer.option({ value: "es" }, ($$renderer) => {
				$$renderer.push(`Español`);
			});
		});
		$$renderer.push(`<span class="meta">${escape_html(currency)} · ${escape_html(ship)}</span></span></div></div></header> `);
		children($$renderer);
		$$renderer.push(`<!----> <footer class="footer"><div class="shell footer-grid"><div><div class="brand">PLASTIC<b>MARKET</b></div>`);
		if (!portfolioMode()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="https://suaveforge.com/work/" target="_blank" rel="noopener" aria-label="SuaveForge 포트폴리오" style="display:inline-flex;align-items:center;gap:8px;margin-top:16px;color:inherit;text-decoration:none;opacity:.78"><span style="display:inline-flex;width:26px;height:26px;align-items:center;justify-content:center;border-radius:7px;background:#0b0c0f;overflow:hidden"><img src="https://suaveforge.com/assets/logo-motion/suaveforge-logo-final.svg?v=20260828-34" alt="" width="22" height="22" style="display:block;width:22px;height:22px"/></span><strong style="font-size:13px;font-weight:850;letter-spacing:-.03em">SuaveForge</strong></a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div><div><h4>${escape_html(t("marketplace"))}</h4><a${attr("href", modeHref("/browse"))}>${escape_html(t("browse"))}</a><a${attr("href", modeHref("/sell"))}>${escape_html(t("sell"))}</a><a${attr("href", modeHref("/collection"))}>${escape_html(t("collection"))}</a></div><div><h4>${escape_html(t("trust"))}</h4><a${attr("href", modeHref("/guide#buyer-protection"))}>${escape_html(t("buyerProtection"))}</a><a${attr("href", modeHref("/guide#verification"))}>${escape_html(t("verification"))}</a><a${attr("href", modeHref("/guide#condition-guide"))}>${escape_html(t("conditionGuide"))}</a></div><div><h4>${escape_html(t("seller"))}</h4><a${attr("href", modeHref("/seller"))}>${escape_html(t("seller"))}</a><a${attr("href", modeHref("/seller?tab=Inventory"))}>${escape_html(t("bulkTools"))}</a><a${attr("href", modeHref("/seller?tab=Orders"))}>${escape_html(t("orders"))}</a></div></div></footer> <nav class="mobile-nav"><a${attr("href", modeHref("/"))}${attr_class("", void 0, { "active": page.url.pathname === "/" })}>${escape_html(t("home"))}</a><a${attr("href", modeHref("/browse"))}${attr_class("", void 0, { "active": sectionActive("browse") })}>${escape_html(t("browse"))}</a><a${attr("href", modeHref("/sell"))}${attr_class("", void 0, { "active": sectionActive("sell") })}>${escape_html(t("sell"))}</a><a${attr("href", modeHref("/collection"))}${attr_class("", void 0, { "active": sectionActive("collection") })}>${escape_html(t("collection"))}</a>`);
		if (data.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a${attr("href", modeHref("/seller"))}${attr_class("", void 0, { "active": sectionActive("seller") })}>${escape_html(t("seller"))}</a>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<a${attr("href", modeHref("/account"))}${attr_class("", void 0, { "active": sectionActive("account") })}>${escape_html(t("sign"))}</a>`);
		}
		$$renderer.push(`<!--]--></nav>`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-CJVZuGIt.js.map

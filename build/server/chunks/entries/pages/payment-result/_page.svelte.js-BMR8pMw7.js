import { U as head, X as attr_class, V as escape_html, W as attr, Y as ensure_array_like, M as derived } from '../../../chunks/server.js-CPD9auUj.js';
import { k as krw } from '../../../chunks/catalog.js-ZRvm4Oxk.js';
import { t as translate } from '../../../chunks/i18n.js-Cy6Sbfe9.js';
import '../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/payment-result/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const t = (key) => translate(data.locale || "ko", key);
		const copy = {
			success: {
				kicker: "orderConfirmed",
				title: "thankYouOrder",
				body: "orderPlaced"
			},
			cancelled: {
				kicker: "paymentCancelled",
				title: "paymentCancelledTitle",
				body: "orderNotConfirmed"
			},
			failed: {
				kicker: "paymentFailed",
				title: "paymentFailedTitle",
				body: "paymentRetry"
			},
			expired: {
				kicker: "paymentExpired",
				title: "paymentExpiredTitle",
				body: "paymentRestart"
			},
			pending: {
				kicker: "paymentPending",
				title: "paymentPendingTitle",
				body: "paymentPendingBody"
			},
			not_found: {
				kicker: "orderUnavailable",
				title: "orderUnavailableTitle",
				body: "orderUnavailableBody"
			}
		};
		let state = derived(() => data.state || "pending");
		let copyKeys = derived(() => copy[state()] || copy.pending);
		let text = derived(() => ({
			kicker: t(copyKeys().kicker),
			title: t(copyKeys().title),
			body: t(copyKeys().body)
		}));
		let order = derived(() => data.order);
		let item = derived(() => data.item);
		let address = derived(() => order()?.address || {});
		const clean = (value) => String(value || "").trim();
		let addressLines = derived(() => [
			clean(address().address1),
			clean(address().address2),
			[clean(address().city), clean(address().postalCode)].filter(Boolean).join(" "),
			clean(address().country)
		].filter(Boolean));
		head("1bqr1cp", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(text().kicker)} · PlasticMarket</title>`);
			});
		});
		$$renderer.push(`<main class="payment-result-shell"><section${attr_class("payment-result-hero", void 0, {
			"success": state() === "success",
			"cancelled": state() === "cancelled",
			"failed": state() === "failed" || state() === "expired",
			"pending": state() === "pending"
		})} aria-live="polite"><div class="payment-state-label">${escape_html(text().kicker)}</div> <h1>${escape_html(text().title)}</h1> <p>${escape_html(text().body)}</p> `);
		if (order()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="payment-order-reference"><span>${escape_html(t("orderNumber"))}</span><strong>${escape_html(order().id)}</strong></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section> `);
		if (order()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="payment-result-grid"><div class="payment-result-main"><section class="payment-result-card"><div class="payment-result-card-head"><h2>${escape_html(t("orderDetails"))}</h2></div> <div class="payment-result-item">`);
			if (item()?.image) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="payment-result-media"><img${attr("src", item().image)}${attr("alt", item().title || order().product)}/></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="payment-result-item-copy">`);
			if (item()?.brand) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="brandline">${escape_html(item().brand)}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <strong class="payment-result-title">${escape_html(item()?.title || order().product)}</strong> `);
			if (item()?.condition) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>${escape_html(item().condition)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item()?.boxCondition || item()?.partsStatus || item()?.manualStatus) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>${escape_html([
					item()?.boxCondition ? `${t("boxLabel")} ${item().boxCondition}` : "",
					item()?.partsStatus || "",
					item()?.manualStatus ? `${t("manualLabel")} ${item().manualStatus}` : ""
				].filter(Boolean).join(" · "))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <strong class="payment-result-item-price">${escape_html(krw(order().itemAmount || 0))}</strong></div></section> <section class="payment-result-card"><div class="payment-result-card-head"><h2>${escape_html(t("shippingAddress"))}</h2></div> <div class="payment-result-address">`);
			if (address().name) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<strong>${escape_html(address().name)}</strong>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(addressLines());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let line = each_array[$$index];
				$$renderer.push(`<span>${escape_html(line)}</span>`);
			}
			$$renderer.push(`<!--]--> `);
			if (address().phone) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>${escape_html(address().phone)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></section></div> <aside class="payment-result-card payment-result-summary"><div class="payment-result-card-head"><h2>${escape_html(t("summary"))}</h2></div> <div class="payment-summary-line"><span>${escape_html(t("itemLabel"))}</span><strong>${escape_html(krw(order().itemAmount || 0))}</strong></div> <div class="payment-summary-line"><span>${escape_html(item()?.shippingMethod || t("shipping"))}</span><strong>${escape_html(krw(order().shippingAmount || 0))}</strong></div> `);
			if (Number(order().marketplaceFee || 0) > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="payment-summary-line"><span>${escape_html(t("marketplaceFee"))}</span><strong>${escape_html(krw(order().marketplaceFee))}</strong></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="payment-summary-line payment-summary-total"><span>${escape_html(t("total"))}</span><strong>${escape_html(krw(order().amount || 0))}</strong></div></aside></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="payment-result-actions">`);
		if (state() === "success") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="btn dark payment-primary-action" href="/collection">${escape_html(t("viewCollection"))}</a><a class="payment-secondary-action" href="/browse">${escape_html(t("continueShopping"))}</a>`);
		} else if (state() === "pending") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<button class="btn dark payment-primary-action">${escape_html(t("checkStatus"))}</button><a class="payment-secondary-action" href="/browse">${escape_html(t("continueShopping"))}</a>`);
		} else if (data.retryUrl) {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<a class="btn dark payment-primary-action"${attr("href", data.retryUrl)}>${escape_html(t("tryPaymentAgain"))}</a><a class="payment-secondary-action" href="/browse">${escape_html(t("backMarketplace"))}</a>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<a class="btn dark payment-primary-action" href="/browse">${escape_html(t("backMarketplace"))}</a>`);
		}
		$$renderer.push(`<!--]--></div></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BMR8pMw7.js.map

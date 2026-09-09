import { W as attr, V as escape_html, Y as ensure_array_like } from '../../../chunks/server.js-CPD9auUj.js';
import '../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const initialOrders = () => data.orders || [];
		const initialRequests = () => data.productRequests || [];
		let orders = [...initialOrders()];
		let requests = [...initialRequests()];
		let accessKey = "";
		let busy = "";
		let product = {
			brand: "",
			title: "",
			series: "",
			category: "Gunpla",
			grade: "",
			scale: "",
			release: "",
			jan: "",
			image: "",
			source: "",
			price: "",
			priceCurrency: "JPY",
			availability: "Released"
		};
		const label = (o) => o.status === "SHIPPED" && o.verificationStatus === "NOT_RECEIVED" ? "Warehouse received" : o.verificationStatus === "RECEIVED" ? "Authentication complete" : o.verificationStatus === "AUTHENTICATED" ? "QA passed" : o.verificationStatus === "QA_PASSED" ? "Dispatch" : o.verificationStatus === "DISPATCHED" ? "Delivered" : "";
		if (!data.authorized) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<main class="account-shell"><section class="account-panel"><div class="page-head"><div class="eyebrow">Verification</div><h1>Admin sign in</h1></div><form class="account-form"><label>Access key<input class="catalog-search" type="password"${attr("value", accessKey)} autocomplete="off" required="" minlength="32"/></label><button class="btn dark full"${attr("disabled", !data.configured, true)}>${escape_html("Sign in")}</button>`);
			if (!data.configured) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="checkout-error">ADMIN_LOGIN_NOT_CONFIGURED</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></form></section></main>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<main class="shell"><div class="page-head"><h1>Verification &amp; catalog</h1><button class="btn">Sign out</button></div>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <section class="section section-compact-top"><div class="section-head"><h2>Pending product requests</h2><span class="meta">${escape_html(requests.length)}</span></div>`);
			if (requests.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="table"><div class="row admin-product-row head"><span>Product</span><span>Type</span><span>Requester</span><span>Source</span><span>Action</span></div><!--[-->`);
				const each_array = ensure_array_like(requests);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let r = each_array[$$index];
					$$renderer.push(`<div class="row admin-product-row"><span><strong>${escape_html(r.title)}</strong><small class="meta">${escape_html(r.brand)} · ${escape_html(r.jan || "No JAN")}</small></span><span>${escape_html(r.category)}<small class="meta">${escape_html(r.grade)} · ${escape_html(r.scale)}</small></span><span>${escape_html(r.requesterName)}</span><span><a${attr("href", r.source)} target="_blank" rel="noreferrer">Official source</a></span><span class="row-actions"><button class="btn dark"${attr("disabled", busy === r.id, true)}>Approve</button><button class="btn"${attr("disabled", busy === r.id, true)}>Reject</button></span></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="panel"><strong>No pending catalog requests</strong></div>`);
			}
			$$renderer.push(`<!--]--></section> <section class="section"><div class="section-head"><h2>Add catalog product</h2><span class="meta">${escape_html(data.products?.length || 0)} current products</span></div><div class="panel"><div class="detail-fields"><label>Manufacturer<input class="catalog-search"${attr("value", product.brand)}/></label><label>Product name<input class="catalog-search"${attr("value", product.title)}/></label><label>Series<input class="catalog-search"${attr("value", product.series)}/></label><label>Category`);
			$$renderer.select({
				class: "catalog-search",
				value: product.category
			}, ($$renderer) => {
				$$renderer.option({}, ($$renderer) => {
					$$renderer.push(`Gunpla`);
				});
				$$renderer.option({}, ($$renderer) => {
					$$renderer.push(`Figures`);
				});
				$$renderer.option({}, ($$renderer) => {
					$$renderer.push(`Character Kits`);
				});
				$$renderer.option({}, ($$renderer) => {
					$$renderer.push(`Cars`);
				});
			});
			$$renderer.push(`</label><label>Grade / type<input class="catalog-search"${attr("value", product.grade)}/></label><label>Scale<input class="catalog-search"${attr("value", product.scale)}/></label><label>Release<input class="catalog-search"${attr("value", product.release)}/></label><label>JAN / Product ID<input class="catalog-search"${attr("value", product.jan)}/></label><label>Official image URL<input class="catalog-search"${attr("value", product.image)}/></label><label>Official source URL<input class="catalog-search"${attr("value", product.source)}/></label><label>Reference price<input class="catalog-search"${attr("value", product.price)} inputmode="numeric"/></label><label>Currency<input class="catalog-search"${attr("value", product.priceCurrency)}/></label><label>Availability<input class="catalog-search"${attr("value", product.availability)}/></label></div><button class="btn dark"${attr("disabled", false, true)}>${escape_html("Add product")}</button></div></section> <section class="section"><div class="section-head"><h2>Orders</h2></div><div class="table"><div class="row head admin-order-row"><span>Order</span><span>Seller shipment</span><span>Verification</span><span>Status</span><span>Action</span></div><!--[-->`);
			const each_array_1 = ensure_array_like(orders);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let o = each_array_1[$$index_1];
				$$renderer.push(`<div class="row admin-order-row"><span><strong>${escape_html(o.id)}</strong><small class="meta">${escape_html(o.product)}</small></span><span>${escape_html(o.tracking?.carrier || "—")}<small class="meta">${escape_html(o.tracking?.trackingNumber || "—")}</small></span><span>${escape_html(o.verificationStatus)}</span><span>${escape_html(o.status)}</span><span>`);
				if (label(o)) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button class="btn"${attr("disabled", busy === o.id, true)}>${escape_html(label(o))}</button>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`—`);
				}
				$$renderer.push(`<!--]--></span></div>`);
			}
			$$renderer.push(`<!--]--></div></section></main>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BV2VPD92.js.map

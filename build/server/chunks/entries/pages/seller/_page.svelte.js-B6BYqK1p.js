import { V as escape_html, Y as ensure_array_like, X as attr_class, W as attr } from '../../../chunks/server.js-CPD9auUj.js';
import { k as krw } from '../../../chunks/catalog.js-ZRvm4Oxk.js';
import '../../../chunks/client.js-CqBk8mpD.js';
import '../../../chunks/shared.js-CAHedLfL.js';
import '../../../chunks/index-server.js-CUF4lwg3.js';
import '../../../chunks/exports.js-Dd48p7Ih.js';
import '../../../chunks/internal2.js-CmbVxp2R.js';
import '../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/seller/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const initialTab = () => data.initialTab || "Inventory";
		const initialListings = () => data.listings;
		const initialOrders = () => data.orders;
		const initialOffers = () => data.offers;
		let tab = initialTab();
		let listings = [...initialListings()];
		let orders = [...initialOrders()];
		let offers = [...initialOffers()];
		let selected = [];
		let busy = false;
		let shipment = {};
		function selectedHas(id) {
			return selected.includes(id);
		}
		$$renderer.push(`<main class="shell"><div class="page-head"><h1>Seller Hub</h1><div class="kpi-grid"><div class="kpi"><small>Orders</small><strong>${escape_html(orders.length)}</strong></div><div class="kpi"><small>Active inventory</small><strong>${escape_html(listings.filter((x) => x.status === "ACTIVE").length)}</strong></div><div class="kpi"><small>Open offers</small><strong>${escape_html(offers.filter((x) => x.status === "OPEN").length)}</strong></div><div class="kpi"><small>Paused inventory</small><strong>${escape_html(listings.filter((x) => x.status === "PAUSED").length)}</strong></div></div><div class="tabs"><!--[-->`);
		const each_array = ensure_array_like([
			"Inventory",
			"Orders",
			"Offers"
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let x = each_array[$$index];
			$$renderer.push(`<button${attr_class("tab", void 0, { "active": tab === x })}>${escape_html(x)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		if (tab === "Inventory") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="chips"><button class="chip"${attr("disabled", !selected.length, true)}>Activate selected</button><button class="chip"${attr("disabled", !selected.length, true)}>Pause selected</button><label class="chip cursor-pointer">Import CSV<input type="file" accept=".csv,text/csv" hidden=""/></label><a class="chip active" href="/sell">Add listing</a></div>`);
			if (listings.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="table"><div class="row seller-row head"><div>Select / product</div><div>Price</div><div>Condition</div><div>Status</div><div>Action</div></div><!--[-->`);
				const each_array_1 = ensure_array_like(listings);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let l = each_array_1[$$index_1];
					$$renderer.push(`<div class="row seller-row"><div class="select-product"><input type="checkbox"${attr("checked", selectedHas(l.id), true)}/><span><strong>${escape_html(l.productData?.title || l.product)}</strong><br/><span class="meta">${escape_html(l.productData?.brand || "")}</span></span></div><div>${escape_html(krw(l.price))}</div><div>${escape_html(l.condition)}</div><div><span${attr_class("status", void 0, { "warn": l.status === "PAUSED" })}>${escape_html(l.status)}</span></div><div class="row-actions"><a class="btn"${attr("href", `/product/${l.product}`)}>View</a><button class="btn"${attr("disabled", busy, true)}>${escape_html(l.status === "ACTIVE" ? "Pause" : "Activate")}</button></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="panel"><strong>No inventory</strong><div class="hint-tight"><a class="btn dark" href="/sell">Add listing</a></div></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else if (tab === "Orders") {
			$$renderer.push("<!--[1-->");
			if (orders.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="table"><div class="row order-row head"><div>Order</div><div>Amount</div><div>Status</div><div>Shipping</div><div>Action</div></div><!--[-->`);
				const each_array_2 = ensure_array_like(orders);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let o = each_array_2[$$index_2];
					$$renderer.push(`<div class="row order-row"><div><strong>${escape_html(o.id)}</strong><br/><span class="meta">${escape_html(o.product)}</span></div><div>${escape_html(krw(o.amount))}</div><div><span class="status">${escape_html(o.status)}</span></div><div>`);
					if (o.tracking) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span>${escape_html(o.tracking.carrier)}<br/><span class="meta">${escape_html(o.tracking.trackingNumber)}</span></span>`);
					} else if (o.status === "PAID") {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`<div class="shipment-fields"><input placeholder="Carrier"${attr("value", shipment[o.id]?.carrier || "")}/><input placeholder="Tracking number"${attr("value", shipment[o.id]?.trackingNumber || "")}/></div>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`—`);
					}
					$$renderer.push(`<!--]--></div><div>`);
					if (o.status === "PAID") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<button class="btn"${attr("disabled", busy, true)}>Mark shipped</button>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span class="meta">${escape_html(o.method)}</span>`);
					}
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="panel"><strong>No orders yet</strong></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (offers.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="table"><div class="row offer-row head"><div>Product</div><div>Offer</div><div>Status</div><div>Created</div><div>Action</div></div><!--[-->`);
				const each_array_3 = ensure_array_like(offers);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let o = each_array_3[$$index_3];
					$$renderer.push(`<div class="row offer-row"><div><strong>${escape_html(o.product)}</strong></div><div>${escape_html(krw(o.amount))}</div><div><span class="status">${escape_html(o.status)}</span></div><div>${escape_html(new Date(o.createdAt).toLocaleString())}</div><div class="row-actions">`);
					if (o.status === "OPEN") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<button class="btn dark"${attr("disabled", busy, true)}>Accept</button><button class="btn"${attr("disabled", busy, true)}>Decline</button>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<a class="btn"${attr("href", `/product/${o.product}`)}>View</a>`);
					}
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="panel"><strong>No offers</strong></div>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]-->`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-B6BYqK1p.js.map

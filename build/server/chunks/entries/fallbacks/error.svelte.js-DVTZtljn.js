import { V as escape_html } from '../../chunks/server.js-CPD9auUj.js';
import { p as page } from '../../chunks/state.js-DkwUbWAb.js';
import '../../chunks/shared.js-CAHedLfL.js';
import '../../chunks/client.js-CqBk8mpD.js';
import '../../chunks/index-server.js-CUF4lwg3.js';
import '../../chunks/exports.js-Dd48p7Ih.js';
import '../../chunks/internal2.js-CmbVxp2R.js';
import '../../chunks/utils.js-BgKogIAM.js';

//#region node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte
function Error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
	});
}

export { Error as default };
//# sourceMappingURL=error.svelte.js-DVTZtljn.js.map

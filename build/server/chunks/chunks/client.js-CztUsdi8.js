import { i as index_server_exports } from './index-server.js-CUF4lwg3.js';
import './shared.js-CAHedLfL.js';
import './exports.js-Dd48p7Ih.js';
import { n as noop } from './server.js-CPD9auUj.js';
import './internal2.js-kKXTWO_x.js';
import './utils.js-BgKogIAM.js';

var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	({
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url)
	});
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
var { onMount, tick } = index_server_exports;
//# sourceMappingURL=client.js-CztUsdi8.js.map

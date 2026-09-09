import { c as clearAdminSession } from '../../../../../chunks/admin.js-Bs9SGw5b.js';
import { j as json } from '../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/store.js-DPrDqVrp.js';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/admin/logout/+server.js
function POST({ cookies }) {
	clearAdminSession(cookies);
	return json({ ok: true });
}

export { POST };
//# sourceMappingURL=_server.js-CVgkG83_.js.map

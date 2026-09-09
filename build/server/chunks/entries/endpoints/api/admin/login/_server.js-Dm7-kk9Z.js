import { a as adminConfigured, v as verifyAdminAccessKey, b as issueAdminSession } from '../../../../../chunks/admin.js-Bs9SGw5b.js';
import { j as json } from '../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/store.js-DPrDqVrp.js';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/admin/login/+server.js
async function POST({ request, cookies }) {
	if (!adminConfigured()) return json({
		ok: false,
		error: "ADMIN_LOGIN_NOT_CONFIGURED"
	}, { status: 503 });
	const body = await request.json();
	if (!verifyAdminAccessKey(body?.accessKey)) return json({
		ok: false,
		error: "INVALID_ADMIN_ACCESS_KEY"
	}, { status: 401 });
	issueAdminSession(cookies);
	return json({ ok: true });
}

export { POST };
//# sourceMappingURL=_server.js-Dm7-kk9Z.js.map

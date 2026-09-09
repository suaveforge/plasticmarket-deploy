import { a as getAuthConfig } from '../../../../../chunks/auth.js-D55joyon.js';
import { j as json } from '../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/auth/config/+server.js
async function GET() {
	try {
		return json({
			ok: true,
			config: await getAuthConfig()
		});
	} catch (error) {
		return json({
			ok: false,
			error: error.message || "AUTHHUB_CONFIG_UNAVAILABLE"
		}, { status: Number(error.status) || 503 });
	}
}

export { GET };
//# sourceMappingURL=_server.js-Rg-tQY1x.js.map

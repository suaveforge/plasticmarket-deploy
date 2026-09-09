import { a as getAuthConfig, c as authOAuthStartURL } from '../../../../../../chunks/auth.js-D55joyon.js';
import { v as error, y as redirect } from '../../../../../../chunks/utils.js-BgKogIAM.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/api/auth/oauth/[provider]/+server.js
async function GET({ params, url }) {
	const provider = String(params.provider || "").toLowerCase();
	const cfg = await getAuthConfig();
	if (!Array.isArray(cfg.providers) || !cfg.providers.includes(provider)) throw error(404, "Provider not enabled");
	const next = url.searchParams.get("next") || "/";
	const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
	const callback = `${url.origin}/auth/callback`;
	throw redirect(303, authOAuthStartURL(provider, callback, safeNext));
}

export { GET };
//# sourceMappingURL=_server.js-BxTCiSop.js.map

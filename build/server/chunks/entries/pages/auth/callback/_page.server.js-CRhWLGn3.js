import { e as exchangeAuthCode, s as storeAuthSession } from '../../../../chunks/auth.js-D55joyon.js';
import { y as redirect } from '../../../../chunks/utils.js-BgKogIAM.js';

//#region src/routes/auth/callback/+page.server.js
async function load({ url, cookies }) {
	const state = url.searchParams.get("state") || "/";
	const next = state.startsWith("/") && !state.startsWith("//") ? state : "/";
	const err = url.searchParams.get("error");
	if (err) throw redirect(303, `/account?error=${encodeURIComponent(err)}`);
	if (url.searchParams.get("status") === "pending_approval") throw redirect(303, "/account?error=PENDING_APPROVAL");
	const code = url.searchParams.get("code");
	if (!code) throw redirect(303, "/account?error=AUTH_CALLBACK_INVALID");
	try {
		const session = await exchangeAuthCode(code);
		if (session.pendingApproval) throw redirect(303, "/account?error=PENDING_APPROVAL");
		storeAuthSession(cookies, session);
		throw redirect(303, next);
	} catch (e) {
		if (e?.status === 303) throw e;
		throw redirect(303, `/account?error=${encodeURIComponent(e.message || "AUTH_CALLBACK_FAILED")}`);
	}
}

var _page_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server as _ };
//# sourceMappingURL=_page.server.js-CRhWLGn3.js.map

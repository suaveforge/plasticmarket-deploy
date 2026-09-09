import { b as private_env } from './shared-server.js-9-2j12mp.js';
import { a as all, s as save } from './store.js-DPrDqVrp.js';
import crypto from 'node:crypto';

//#region src/lib/server/admin.js
var ADMIN_COOKIE = "plasticmarket_admin_session";
var MAX_AGE = 28800;
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var hash = (value) => crypto.createHash("sha256").update(String(value || "")).digest("hex");
var safeEqual = (left, right) => {
	const a = Buffer.from(String(left || "")), b = Buffer.from(String(right || ""));
	return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
};
var configuredKey = () => String(private_env.PLASTICMARKET_ADMIN_ACCESS_KEY || "").trim();
function adminConfigured() {
	return configuredKey().length >= 32;
}
function verifyAdminAccessKey(accessKey) {
	const expected = configuredKey();
	return expected.length >= 32 && safeEqual(String(accessKey || "").trim(), expected);
}
function issueAdminSession(cookies) {
	const token = crypto.randomBytes(32).toString("hex");
	const sessions = all("admin_sessions").filter((x) => new Date(x.expiresAt) > /* @__PURE__ */ new Date());
	sessions.push({
		id: `ADM-${crypto.randomUUID()}`,
		tokenHash: hash(token),
		createdAt: now(),
		expiresAt: new Date(Date.now() + MAX_AGE * 1e3).toISOString()
	});
	save("admin_sessions", sessions);
	cookies.set(ADMIN_COOKIE, token, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		maxAge: MAX_AGE
	});
}
function clearAdminSession(cookies) {
	const token = cookies.get(ADMIN_COOKIE);
	if (token) save("admin_sessions", all("admin_sessions").filter((x) => x.tokenHash !== hash(token)));
	cookies.delete(ADMIN_COOKIE, { path: "/" });
}
function isAdmin(cookies) {
	const token = cookies.get(ADMIN_COOKIE);
	if (!token) return false;
	const tokenHash = hash(token);
	const sessions = all("admin_sessions").filter((x) => new Date(x.expiresAt) > /* @__PURE__ */ new Date());
	const valid = sessions.some((x) => x.tokenHash === tokenHash);
	if (sessions.length !== all("admin_sessions").length) save("admin_sessions", sessions);
	return valid;
}

export { adminConfigured as a, issueAdminSession as b, clearAdminSession as c, isAdmin as i, verifyAdminAccessKey as v };
//# sourceMappingURL=admin.js-Bs9SGw5b.js.map

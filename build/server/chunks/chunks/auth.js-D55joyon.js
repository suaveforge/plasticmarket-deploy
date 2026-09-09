import { b as private_env } from './shared-server.js-9-2j12mp.js';

//#region src/lib/server/auth.js
var ACCESS_COOKIE = "plasticmarket_auth_access";
var REFRESH_COOKIE = "plasticmarket_auth_refresh";
var DEFAULT_REFRESH_AGE = 2592e3;
var apiBase = () => String(private_env.AUTHHUB_API_BASE_URL || "https://api-authhub.suaveforge.com").replace(/\/$/, "");
var project = () => String(private_env.AUTHHUB_PROJECT || "plasticmarket").trim();
var environment = () => String(private_env.AUTHHUB_ENVIRONMENT || "production").trim();
var url = (path) => `${apiBase()}${path}${path.includes("?") ? "&" : "?"}environment=${encodeURIComponent(environment())}`;
var cookieOptions = (maxAge) => ({
	path: "/",
	httpOnly: true,
	sameSite: "lax",
	secure: private_env.NODE_ENV === "production",
	maxAge
});
async function call(path, { method = "GET", body, accessToken } = {}) {
	const headers = { accept: "application/json" };
	if (body !== void 0) headers["content-type"] = "application/json";
	if (accessToken) headers.authorization = `Bearer ${accessToken}`;
	let response;
	try {
		response = await fetch(url(path), {
			method,
			headers,
			body: body === void 0 ? void 0 : JSON.stringify(body)
		});
	} catch (error) {
		throw Object.assign(/* @__PURE__ */ new Error("AUTHHUB_UNAVAILABLE"), {
			status: 503,
			cause: error
		});
	}
	const raw = await response.text();
	let data = {};
	try {
		data = raw ? JSON.parse(raw) : {};
	} catch {
		data = { error: raw || "AUTHHUB_BAD_RESPONSE" };
	}
	if (!response.ok) throw Object.assign(new Error(String(data.error || `AUTHHUB_${response.status}`)), {
		status: response.status,
		body: data
	});
	return data;
}
function normalizeSessionUser(session) {
	const user = session?.user;
	if (!user) return null;
	return {
		id: user.id,
		email: user.email,
		displayName: user.displayName || "",
		emailVerified: !!user.emailVerified,
		avatarUrl: user.avatarUrl || "",
		role: session?.membership?.role || "user",
		membershipStatus: session?.membership?.status || "active"
	};
}
function publicUser(user) {
	return user ? {
		id: user.id,
		email: user.email,
		displayName: user.displayName || "",
		emailVerified: !!user.emailVerified,
		avatarUrl: user.avatarUrl || "",
		role: user.role || "user",
		membershipStatus: user.membershipStatus || "active"
	} : null;
}
async function getAuthConfig() {
	return call(`/v1/config/${encodeURIComponent(project())}`);
}
async function loginWithAuthHub({ email, password }) {
	return call(`/v1/auth/${encodeURIComponent(project())}/login`, {
		method: "POST",
		body: {
			email: String(email || "").trim(),
			password: String(password || "")
		}
	});
}
async function signupWithAuthHub({ email, password, displayName }) {
	return call(`/v1/auth/${encodeURIComponent(project())}/signup`, {
		method: "POST",
		body: {
			email: String(email || "").trim(),
			password: String(password || ""),
			displayName: String(displayName || "").trim()
		}
	});
}
async function exchangeAuthCode(code) {
	return call(`/v1/auth/${encodeURIComponent(project())}/exchange`, {
		method: "POST",
		body: { code: String(code || "") }
	});
}
function authOAuthStartURL(provider, redirectUri, state = "") {
	const u = new URL(url(`/v1/oauth/${encodeURIComponent(project())}/${encodeURIComponent(provider)}/start`));
	u.searchParams.set("redirect_uri", redirectUri);
	if (state) u.searchParams.set("state", state);
	return u.toString();
}
function storeAuthSession(cookies, session) {
	if (session?.pendingApproval || !session?.accessToken || !session?.refreshToken) return false;
	const accessAge = Math.max(60, Number(session.expiresIn || 3600));
	cookies.set(ACCESS_COOKIE, session.accessToken, cookieOptions(accessAge));
	cookies.set(REFRESH_COOKIE, session.refreshToken, cookieOptions(DEFAULT_REFRESH_AGE));
	return true;
}
function clearAuthSession(cookies) {
	cookies.delete(ACCESS_COOKIE, { path: "/" });
	cookies.delete(REFRESH_COOKIE, { path: "/" });
}
async function refreshSession(cookies) {
	const refreshToken = cookies.get(REFRESH_COOKIE);
	if (!refreshToken) return null;
	try {
		const session = await call(`/v1/auth/${encodeURIComponent(project())}/refresh`, {
			method: "POST",
			body: { refreshToken }
		});
		storeAuthSession(cookies, session);
		return session;
	} catch {
		clearAuthSession(cookies);
		return null;
	}
}
async function getSessionUser(cookies) {
	let accessToken = cookies.get(ACCESS_COOKIE);
	if (!accessToken) {
		accessToken = (await refreshSession(cookies))?.accessToken || "";
		if (!accessToken) return null;
	}
	try {
		return normalizeSessionUser(await call("/v1/me", { accessToken }));
	} catch (error) {
		if (Number(error.status) !== 401) {
			if (Number(error.status) >= 500) return null;
			clearAuthSession(cookies);
			return null;
		}
	}
	const refreshed = await refreshSession(cookies);
	if (!refreshed?.accessToken) return null;
	try {
		return normalizeSessionUser(await call("/v1/me", { accessToken: refreshed.accessToken }));
	} catch {
		clearAuthSession(cookies);
		return null;
	}
}
async function logoutAuthHub(cookies) {
	const refreshToken = cookies.get(REFRESH_COOKIE);
	try {
		if (refreshToken) await call(`/v1/auth/${encodeURIComponent(project())}/logout`, {
			method: "POST",
			body: { refreshToken }
		});
	} catch {} finally {
		clearAuthSession(cookies);
	}
}

export { getAuthConfig as a, logoutAuthHub as b, authOAuthStartURL as c, signupWithAuthHub as d, exchangeAuthCode as e, getSessionUser as g, loginWithAuthHub as l, publicUser as p, storeAuthSession as s };
//# sourceMappingURL=auth.js-D55joyon.js.map

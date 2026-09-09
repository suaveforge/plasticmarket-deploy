import { b as private_env } from './shared-server.js-9-2j12mp.js';

//#region src/lib/server/payhub.js
var base = () => String(private_env.PAYHUB_API_BASE_URL || "https://api-payhub.suaveforge.com").replace(/\/$/, "");
var projectKey = () => String(private_env.PAYHUB_PROJECT_KEY || "").trim();
var payHubWebhookSecret = () => String(private_env.PAYHUB_WEBHOOK_SECRET || "");
async function parseResponse(r) {
	const raw = await r.text();
	let body = {};
	try {
		body = raw ? JSON.parse(raw) : {};
	} catch {
		body = { error: raw || "PAYHUB_BAD_RESPONSE" };
	}
	if (!r.ok) throw Object.assign(new Error(body.error || `PAYHUB_${r.status}`), {
		status: r.status,
		body
	});
	return body;
}
async function createPayHubSession(payload) {
	const key = projectKey();
	if (!key) throw Object.assign(/* @__PURE__ */ new Error("PAYHUB_PROJECT_NOT_CONFIGURED"), { status: 503 });
	let r;
	try {
		r = await fetch(`${base()}/v1/sessions`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${key}`,
				"content-type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify(payload)
		});
	} catch (e) {
		throw Object.assign(/* @__PURE__ */ new Error("PAYHUB_UNAVAILABLE"), {
			status: 503,
			cause: e
		});
	}
	return parseResponse(r);
}
async function getPayHubSession(id) {
	const key = projectKey();
	if (!key) throw Object.assign(/* @__PURE__ */ new Error("PAYHUB_PROJECT_NOT_CONFIGURED"), { status: 503 });
	let r;
	try {
		r = await fetch(`${base()}/v1/sessions/${encodeURIComponent(id)}`, { headers: {
			authorization: `Bearer ${key}`,
			accept: "application/json"
		} });
	} catch (e) {
		throw Object.assign(/* @__PURE__ */ new Error("PAYHUB_UNAVAILABLE"), {
			status: 503,
			cause: e
		});
	}
	return parseResponse(r);
}
async function payHubHealth() {
	try {
		return (await fetch(`${base()}/healthz`, { headers: { accept: "application/json" } })).ok;
	} catch {
		return false;
	}
}

export { payHubWebhookSecret as a, createPayHubSession as c, getPayHubSession as g, payHubHealth as p };
//# sourceMappingURL=payhub.js-Qj2jxoIB.js.map

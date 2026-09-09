//#region src/routes/+layout.server.js
var supportedLangs = /* @__PURE__ */ new Set([
	"ko",
	"en",
	"ja",
	"zh-TW",
	"zh-CN",
	"vi",
	"id",
	"es"
]);
var supportedCurrencies = /* @__PURE__ */ new Set([
	"KRW",
	"JPY",
	"USD",
	"TWD",
	"HKD",
	"VND",
	"IDR",
	"EUR",
	"CNY"
]);
var supportedShips = /* @__PURE__ */ new Set([
	"KR",
	"JP",
	"US",
	"TW",
	"HK",
	"VN",
	"ID",
	"ES",
	"CN"
]);
function load({ locals, cookies, url }) {
	const rawLang = cookies.get("pm_lang") || "ko";
	const rawCurrency = cookies.get("pm_currency") || "KRW";
	const rawShip = cookies.get("pm_ship") || "KR";
	return {
		user: locals.user || null,
		locale: supportedLangs.has(rawLang) ? rawLang : "ko",
		currency: supportedCurrencies.has(rawCurrency) ? rawCurrency : "KRW",
		ship: supportedShips.has(rawShip) ? rawShip : "KR",
		portfolioMode: url.searchParams.get("potpolio") === "1"
	};
}

var _layout_server = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server as _ };
//# sourceMappingURL=_layout.server.js-CJK8-U7g.js.map

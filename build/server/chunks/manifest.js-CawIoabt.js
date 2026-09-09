const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt","sitemap.xml"]),
	mimeTypes: {".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DmR2mWsw.js",app:"_app/immutable/entry/app.CVuhjRxL.js",imports:["_app/immutable/entry/start.DmR2mWsw.js","_app/immutable/chunks/B0hx-Lgm.js","_app/immutable/chunks/N6OJ_u7Y.js","_app/immutable/entry/app.CVuhjRxL.js","_app/immutable/chunks/N6OJ_u7Y.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-xfQEW6-t.js')),
			__memo(() => import('./nodes/1.js-n6FflIHu.js')),
			__memo(() => import('./nodes/2.js-CaQ2qo-b.js')),
			__memo(() => import('./nodes/3.js-Tg28_Lyz.js')),
			__memo(() => import('./nodes/4.js-aaNb0wuA.js')),
			__memo(() => import('./nodes/5.js-CrDkq-Gf.js')),
			__memo(() => import('./nodes/6.js-CuifbjDh.js')),
			__memo(() => import('./nodes/7.js-rO2HR-Xv.js')),
			__memo(() => import('./nodes/8.js-j_eFY7vh.js')),
			__memo(() => import('./nodes/9.js-a4cso3QH.js')),
			__memo(() => import('./nodes/10.js-BFXR3Yh2.js')),
			__memo(() => import('./nodes/11.js-DWQ2aHVN.js')),
			__memo(() => import('./nodes/12.js-Cf6CqL8f.js')),
			__memo(() => import('./nodes/13.js-DUFhBbrS.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/admin/login",
				pattern: /^\/api\/admin\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/login/_server.js-Dm7-kk9Z.js'))
			},
			{
				id: "/api/admin/logout",
				pattern: /^\/api\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/logout/_server.js-CVgkG83_.js'))
			},
			{
				id: "/api/admin/orders",
				pattern: /^\/api\/admin\/orders\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/orders/_server.js-7UEKFfmh.js'))
			},
			{
				id: "/api/admin/products",
				pattern: /^\/api\/admin\/products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/products/_server.js-BPc6rXAl.js'))
			},
			{
				id: "/api/auth/config",
				pattern: /^\/api\/auth\/config\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/config/_server.js-Rg-tQY1x.js'))
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/login/_server.js-BQN8OR-W.js'))
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/logout/_server.js-lABrR65T.js'))
			},
			{
				id: "/api/auth/oauth/[provider]",
				pattern: /^\/api\/auth\/oauth\/([^/]+?)\/?$/,
				params: [{"name":"provider","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/oauth/_provider_/_server.js-BxTCiSop.js'))
			},
			{
				id: "/api/auth/session",
				pattern: /^\/api\/auth\/session\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/session/_server.js-DGREk2T4.js'))
			},
			{
				id: "/api/auth/signup",
				pattern: /^\/api\/auth\/signup\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/signup/_server.js-DIFvKnNc.js'))
			},
			{
				id: "/api/checkout",
				pattern: /^\/api\/checkout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/checkout/_server.js-BnarRCbD.js'))
			},
			{
				id: "/api/collection",
				pattern: /^\/api\/collection\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/collection/_server.js-CljXHcoc.js'))
			},
			{
				id: "/api/integrations/health",
				pattern: /^\/api\/integrations\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/integrations/health/_server.js-CG0fAuDJ.js'))
			},
			{
				id: "/api/listings",
				pattern: /^\/api\/listings\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/listings/_server.js-CLI6Wm5y.js'))
			},
			{
				id: "/api/offers",
				pattern: /^\/api\/offers\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/offers/_server.js-BP46YcDQ.js'))
			},
			{
				id: "/api/orders",
				pattern: /^\/api\/orders\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/orders/_server.js-Cqqe_Coc.js'))
			},
			{
				id: "/api/payhub/webhook",
				pattern: /^\/api\/payhub\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/payhub/webhook/_server.js-BQF52lhY.js'))
			},
			{
				id: "/api/product-requests",
				pattern: /^\/api\/product-requests\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/product-requests/_server.js-BsZAn5OS.js'))
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/browse",
				pattern: /^\/browse\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/checkout",
				pattern: /^\/checkout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/collection",
				pattern: /^\/collection\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/guide",
				pattern: /^\/guide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/payment-result",
				pattern: /^\/payment-result\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/product/[slug]",
				pattern: /^\/product\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/seller",
				pattern: /^\/seller\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/sell",
				pattern: /^\/sell\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-CawIoabt.js.map

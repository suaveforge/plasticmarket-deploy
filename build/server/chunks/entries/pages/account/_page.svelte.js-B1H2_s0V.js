import { V as escape_html, W as attr } from '../../../chunks/server.js-CPD9auUj.js';
import '../../../chunks/shared.js-CAHedLfL.js';

//#region src/routes/account/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let hostedHref = "#";
		const lang = () => data?.locale || "ko";
		const copy = {
			ko: {
				title: "계정",
				moving: "AuthHub 로그인 화면으로 이동합니다…",
				retry: "AuthHub에서 로그인",
				error: "로그인을 완료하지 못했습니다."
			},
			en: {
				title: "Account",
				moving: "Opening the AuthHub sign-in screen…",
				retry: "Sign in with AuthHub",
				error: "Sign-in could not be completed."
			},
			ja: {
				title: "アカウント",
				moving: "AuthHubのログイン画面へ移動します…",
				retry: "AuthHubでログイン",
				error: "ログインを完了できませんでした。"
			},
			"zh-TW": {
				title: "帳戶",
				moving: "正在前往 AuthHub 登入畫面…",
				retry: "使用 AuthHub 登入",
				error: "無法完成登入。"
			},
			"zh-CN": {
				title: "账户",
				moving: "正在前往 AuthHub 登录页面…",
				retry: "使用 AuthHub 登录",
				error: "无法完成登录。"
			},
			vi: {
				title: "Tài khoản",
				moving: "Đang mở màn hình đăng nhập AuthHub…",
				retry: "Đăng nhập bằng AuthHub",
				error: "Không thể hoàn tất đăng nhập."
			},
			id: {
				title: "Akun",
				moving: "Membuka layar masuk AuthHub…",
				retry: "Masuk dengan AuthHub",
				error: "Proses masuk tidak dapat diselesaikan."
			},
			es: {
				title: "Cuenta",
				moving: "Abriendo la pantalla de acceso de AuthHub…",
				retry: "Iniciar sesión con AuthHub",
				error: "No se pudo completar el acceso."
			}
		};
		const c = () => copy[lang()] || copy.ko;
		$$renderer.push(`<main class="account-shell"><section class="account-panel"><div class="page-head account-head"><div class="eyebrow">AUTHHUB</div><h1>${escape_html(c().title)}</h1></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="auth-message" role="status">${escape_html(c().moving)}</p> <a class="btn dark full account-submit"${attr("href", hostedHref)}>${escape_html(c().retry)}</a>`);
		$$renderer.push(`<!--]--></section></main>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-B1H2_s0V.js.map

import { p as publicUser, g as getSessionUser } from '../chunks/auth.js-D55joyon.js';
import '../chunks/shared-server.js-9-2j12mp.js';

//#region src/hooks.server.js
async function handle({ event, resolve }) {
	event.locals.user = publicUser(await getSessionUser(event.cookies));
	return resolve(event);
}

export { handle };
//# sourceMappingURL=hooks.server.js-CcKvXD37.js.map

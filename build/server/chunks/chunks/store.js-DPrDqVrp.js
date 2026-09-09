import { b as private_env } from './shared-server.js-9-2j12mp.js';
import fs__default from 'node:fs';
import path from 'node:path';

//#region src/lib/server/store.js
var dir = private_env.PLASTICMARKET_DATA_DIR || path.resolve("data");
fs__default.mkdirSync(dir, { recursive: true });
var file = (name) => path.join(dir, `${name}.json`);
function all(name) {
	try {
		return JSON.parse(fs__default.readFileSync(file(name), "utf8"));
	} catch {
		return [];
	}
}
function save(name, rows) {
	fs__default.writeFileSync(file(name), JSON.stringify(rows, null, 2) + "\n");
	return rows;
}
function append(name, row) {
	const rows = all(name);
	rows.push(row);
	save(name, rows);
	return row;
}
function update(name, id, patch) {
	const rows = all(name);
	const i = rows.findIndex((x) => x.id === id);
	if (i < 0) return null;
	rows[i] = {
		...rows[i],
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	save(name, rows);
	return rows[i];
}
function removeWhere(name, predicate) {
	const rows = all(name);
	const next = rows.filter((x) => !predicate(x));
	save(name, next);
	return rows.length - next.length;
}

export { all as a, append as b, removeWhere as r, save as s, update as u };
//# sourceMappingURL=store.js-DPrDqVrp.js.map

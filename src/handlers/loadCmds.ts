import { NaCl } from '../structures';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
var mdir: any = require?.main?.path;
//Fuck it (Again)

function loadCmd(dir: string, bot: NaCl) {
	readdirSync(join(mdir, dir)).forEach((x: string) => {
		var stat: any = lstatSync(join(mdir, dir, x));
		if (stat.isDirectory()) return loadCmd(join(dir, x), bot);

		console.log(x, '- loaded');
		bot.cmds.set(x, require(join(mdir, dir, x))._cmd);
	});
}
export function loadCmds(dir: string, bot: NaCl) {
	loadCmd(dir, bot);
}

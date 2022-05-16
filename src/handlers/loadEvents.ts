import { NaCl } from '../structures';
import fs from 'fs';
import path from 'path';
var mdir: any = require?.main?.path;
// Fuck it

function loadEvent(dir: string, bot: NaCl) {
	fs.readdirSync(path.join(mdir, dir)).forEach((x: string) => {
		var stat = fs.lstatSync(path.join(mdir, dir, x));
		if (!stat.isDirectory()) {
			var { event } = require(path.join(mdir, dir, x));
			bot.on(event.name, event.run.bind(null, bot));
		} else loadEvent(path.join(dir, x), bot);
	});
}

export function loadEvents(dir: string, bot: NaCl) {
	loadEvent(dir, bot);
}

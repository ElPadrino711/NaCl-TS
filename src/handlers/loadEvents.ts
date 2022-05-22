import { NaCl } from '../structures';
import fs from 'fs';
import path from 'path';
var mdir: any = require?.main?.path;
// Fuck it

function loadEvent(dir: string, bot: NaCl) {
	fs.readdirSync(path.join(mdir, dir)).forEach((x: string) => {
		var stat = fs.lstatSync(path.join(mdir, dir, x));
		if (stat.isDirectory()) return loadEvent(path.join(dir, x), bot);
		
		var { _event } = require(path.join(mdir, dir, x));
		
		_event.distube
			? bot.distube.on(_event.name, _event.run.bind(null, bot))
			: bot.on(_event.name, _event.run.bind(null, bot))
	});
}

export function loadEvents(dir: string, bot: NaCl) {
	loadEvent(dir, bot);
}

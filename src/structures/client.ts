import * as djs from 'discord.js';
import * as config from '../config';
import { Database } from '@kks717/db';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { cmd } from '../interfaces';

export class NaCl extends djs.Client {
	cmds: djs.Collection<string, cmd> = new djs.Collection();
	slashes: Map<string, any> = new Map();
	devs: string[] = config.devs;
	_msg: Map<string, djs.Message> = new Map();
	distube: DisTube = new DisTube(this, {
		plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin({ update: true })],
		nsfw: !1,
		updateYouTubeDL: !1,
		youtubeDL: !1
	});
	db: Database = new Database({
		path: './database/',
		tables: ['guilds', 'users', 'economy'],
		extension: '.json'
	});

	constructor() {
		super({
			intents: [
				'GUILDS',
				'GUILD_MESSAGES',
				'DIRECT_MESSAGES',
				'GUILD_VOICE_STATES'
			],
			partials: ['CHANNEL'],
			allowedMentions: { repliedUser: !1 },
			presence: {
				status: 'idle',
				activities: [
					{
						name: 'No bitches? 😿',
						type: 1,
						url: 'https://twitch.tv/el_padrino_717'
					}
				]
			}
		});

		this.start();
	}

	start() {
		this.loadCmds('./commands');
		this.loadEvents('./events');

		this.login(config.token);
	}

	loadCmds(dir: string) {
		readdirSync(join(require.main.path, dir)).forEach((x: string) => {
			var stat: any = lstatSync(join(require.main.path, dir, x));
			if (stat.isDirectory()) return this.loadCmds(join(dir, x));

			var cmd = require(join(require.main.path, dir, x));

			this.cmds.set(x, cmd._cmd);
		});
	}

	loadEvents(dir: string) {
		readdirSync(join(require.main.path, dir)).forEach((x: string) => {
			var stat = lstatSync(join(require.main.path, dir, x));
			if (stat.isDirectory()) return this.loadEvents(join(dir, x));

			var { _event } = require(join(require.main.path, dir, x));

			_event.distube
				? this.distube.on(_event.name, _event.run.bind(null, this))
				: this.on(_event.name, _event.run.bind(null, this));
		});
	}
}

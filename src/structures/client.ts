import * as djs from 'discord.js';
import * as config from '../config';
import * as handler from '../handlers';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { cmd } from '../interfaces';

export class NaCl extends djs.Client {
	cmds: djs.Collection<string, cmd> = new djs.Collection();
	devs: string[] = config.devs;
	_msg: Map<string, djs.Message> = new Map();
	distube: DisTube = new DisTube(this, {
		plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
		nsfw: !1,
		updateYouTubeDL: !1,
		youtubeDL: !1
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

	async start() {
		await super.login(config.token);
		handler.loadCmds('./commands', this);
		handler.loadEvents('./events', this);
	}
}

import { Message } from 'discord.js';
import { event } from '../interfaces';

export var _event: event = {
	name: 'playSong',
	distube: true,
	run(b, q, s) {
		q.textChannel
			.send(`Ahora reproduciendo  **\`${s.name}\`** .`)
	}
};

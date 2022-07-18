import { Message } from 'discord.js';
import { event } from '../interfaces';

export var _event: event = {
	name: 'addSong',
	distube: true,
	run(b, q, s) {
		b._msg
			.get(q.textChannel.guildId)
			.reply(
				`Se agrego  **\`${s.name}\`**  (${s.formattedDuration}) a la lista.`
			)
	}
};

import { event } from '../interfaces';
import { Message } from 'discord.js';
import { Song } from 'distube';

export var _event: event = {
	name: 'addList',
	distube: !0,
	run(b, q, p) {
		b._msg
			.get(q.textChannel.guildId)
			.reply(`Se agregaron  \`${p.songs.length}\`  canciones a la lista.`)
	}
};

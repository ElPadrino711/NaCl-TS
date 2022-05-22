import { cmd } from '../../interfaces';
import { Song } from 'distube';

export var _cmd: cmd = {
	data: {
		names: ['queue'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'queue'
	},
	async run(d) {
		if (!d.queue) return d.msg.reply(':x: **[ No hay nada reproduciendose ]**');
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(
				':x:  **[ Tienes que estar en el mismo canal de vo que el bot ]**'
			);

		var list: string[] = [];
		d.queue.songs.map((s: Song, i: number) => {
			if (i <= 10)
				list.push(
					`${i === 0 ? 'Reproduciendo:' : `**${i}. -**`} [${s.name}](${
						s.url
					}) (${s.formattedDuration})`
				);
		});

		d.msg.reply({
			embeds: [
				{
					title: 'Lista de canciones',
					thumbnail: {
						url: d.bot.user.avatarURL()
					},
					description: list.join('\n'),
					footer: {
						text: `Mostrando ${list.length} de ${d.queue.songs.length}`,
						icon_url: d.author.displayAvatarURL({ dynamic: !0 })
					},
					color: 'RANDOM'
				}
			]
		});
	}
};

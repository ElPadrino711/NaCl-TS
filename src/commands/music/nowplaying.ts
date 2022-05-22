import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['np', 'nowplaying', 'now-playing'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'now-playing'
	},
	async run(d) {
		if (!d.queue) return d.msg.reply(':x: **[ No hay nada reproduciendose ]**');
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(
				':x:  **[ Tienes que estar en el mismo canal de vo que el bot ]**'
			);

		var song = d.queue.songs[0];

		d.msg.reply({
			embeds: [
				{
					title: 'Ahora reproduciendo',
					thumbnail: {
						url: song.thumbnail
					},
					description: `[${song.name}](${song.url}) (${
						song.formattedDuration
					})`,
					footer: {
						text: `Añadido por ${song.user.tag}`,
						icon_url: song.user.displayAvatarURL({ dynamic: !0 })
					},
					color: 'RANDOM'
				}
			]
		});
	}
};

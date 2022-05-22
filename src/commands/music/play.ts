import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['play', 'playsong'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'play <song>'
	},
	async run(d) {
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (!d.args_str)
			return d.msg.reply(':x:  **[ Escribe una cancion para reproducir ]**');
		if (
			!d.member.voice.channel
				.permissionsFor(d.bot.user.id)
				.toArray()
				.some((x: any) => x == 'CONNECT')
		)
			return d.msg.reply(
				':x:  **[ No tengo el permiso de `Conectar` en el canal de voz ]**'
			);
		if (
			!d.member.voice.channel
				.permissionsFor(d.bot.user.id)
				.toArray()
				.some((x: any) => x == 'SPEAK')
		)
			return d.msg.reply(
				':x:  **[ No tengo el permiso de `Hablar` en el canal de voz ]**'
			);
		
		if (d.queue && d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(':x:  **[ Estoy usando otro canal de voz ]**');
		
		d.dtb.play(d.member.voice.channel, d.args_str, {
			member: d.member,
			textChannel: d.channel,
			message: d.msg
		});
		d.bot._msg.set(d.guild.id, d.msg);
	}
};

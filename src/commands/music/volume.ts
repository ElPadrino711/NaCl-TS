import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['volume', 'vol'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'volume <number>'
	},
	async run(d) {
		if (!d.queue) return d.msg.reply(':x: **[ No hay nada reproduciendose ]**');
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(':x:  **[ Estoy usando otro canal de voz ]**');

		if (!d.args[0])
			return d.msg.reply(
				'**[ El volumen actual es de ' + d.queue.volume + ' ]**'
			);

		var v = parseInt(d.args[0]);
		if (isNaN(v))
			return d.msg.reply(':x:  **[ Escribe un numero valido (10 - 200) ]**');

		if (v > 200)
			return d.msg.reply(':x:  **[ Escribe un numero menor a 200 ]**');

		if (v < 10) return d.msg.reply(':x:  **[ Escribe un numero mayor a 10 ]**');

		d.queue.setVolume(v);
		d.msg.reply(
			':white_check_mark:  **[ El volumen ha cambiado a ' + v + ' ]**'
		);
	}
};

import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['pause'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'pause'
	},
	async run(d) {
		if (!d.queue) return d.msg.reply(':x: **[ No hay nada reproduciendose ]**');
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(':x:  **[ Estoy usando otro canal de voz ]**');

		d.queue.pause();
		d.msg.reply(':white_ckeck_mark:  **[ Cancion pausada ]**')
	}
};

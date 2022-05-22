import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['stop', 'leave', 'disconnect'],
		category: ['musica', 'music', 'música'],
		desc: 'Cmd de musica',
		inDev: !1,
		onlyDevs: !1,
		usage: 'stop'
	},
	async run(d) {
		if (!d.queue) return d.msg.reply(':x: **[ No hay nada reproduciendose ]**');
		if (!d.member.voice.channel)
			return d.msg.reply(':x:  **[ Tienes que estar en un canal de voz ]**');
		if (d.queue.voiceChannel.id !== d.member.voice.channel.id)
			return d.msg.reply(':x:  **[ Estoy usando otro canal de voz ]**');

		d.queue.stop();
		d.msg.reply(':white_check_mark:  **[ Lista detenida, abandonando canal de voz ]**')
	}
};

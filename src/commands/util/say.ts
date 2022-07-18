import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['say'],
		category: ['util'],
		desc: 'E',
		inDev: false,
		onlyDevs: false,
		usage: 'say <text> [--embed]'
	},
	async run(d) {
		if (!d.args[0]) return d.msg.reply('escribe algo bobo');
		var x = d.guild.me.permissions.has('MANAGE_MESSAGES');
		if (d.args.includes('--embed')) {
			d.args.splice(d.args.indexOf('--embed'), 1);
			if (!d.args[0]) return d.msg.reply('escribe algo aparte del --embed');
			return d.channel
				.send({
					embeds: [
						{
							description: d.args.join(' '),
							color: 'RANDOM',
							timestamp: new Date()
						}
					]
				})
				.then(_ => x && d.msg.delete());
		}
		d.channel.send(d.args.join(' '));
		x && d.msg.delete();
	}
};

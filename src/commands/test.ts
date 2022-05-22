import { cmd } from '../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['test'],
		category: ['test'],
		desc: 'test',
		inDev: true,
		onlyDevs: true,
		usage: 'test'
	},
	async run(d) {
		d.msg.reply('jijijija');
	}
};

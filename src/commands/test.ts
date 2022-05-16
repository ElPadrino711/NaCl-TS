import { Cmd } from '../interfaces';

export var cmd: Cmd = {
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

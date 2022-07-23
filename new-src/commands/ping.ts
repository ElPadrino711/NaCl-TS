import command from '../classes/commands';

class cmd extends command {
	data = {
		names: ['ping', 'pong'],
		category: 'info',
		desc: 'View bot\'s ping',
		usage: '!!ping'
	};

	async run(d: any) {
		d.channel.send('Mi ping es de ' + d.bot.ws.ping + ' :)')
	}
}

export default cmd
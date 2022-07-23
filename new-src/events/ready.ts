import event from '../classes/event';

class ready extends event {
	async run() {
		console.log(`Ready as ${this.bot.user.tag} (${this.bot.user.id})`)
	}
}

export default ready
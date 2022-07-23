import NaCl from './client';
import djs from 'discord.js'

export class event {
	bot: NaCl;
	_listener: any;
	name: keyof djs.ClientEvents;

	constructor(bot: NaCl, name: keyof djs.ClientEvents, file: string) {
		this.bot = bot
		this.name = name
		// @ts-ignore
		this._listener = this.run.bind(this)
		console.log(file, '- Loaded')
	}

	startListener() {
		this.bot.on(this.name, this._listener)
	}

	stopListener() {
		this.bot.off(this.name, this._listener)
	}
}

export default event
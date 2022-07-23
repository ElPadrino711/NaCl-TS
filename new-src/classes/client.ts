import fs from 'node:fs';
import path from 'node:path';
import djs from 'discord.js';
import { Database } from '@kks717/db';

class NaCl extends djs.Client {
	prefix: string;
	commands: djs.Collection<string, any>;
	events: Map<string, any>;
	devs: string[]
	db = new Database({
		path: './database/',
		tables: ['guilds', 'users', 'economy']
	});

	constructor(opt) {
		super(opt.bot)

		this.prefix = opt.prefix;
		this.devs = opt.devs;
		this.commands = new djs.Collection();
		this.events = new Map();

		this.start(opt.token)
	}

	async start(token: string) {
		await this.loadCommands(path.join(__dirname, '../commands'))
		await this.loadEvents(path.join(__dirname, '../events'))
		super.login(token)
	}

	async loadEvents(dir: string) {
		let f: string[] = fs.readdirSync(dir);

		for (let file of f) {
			const name: string = file.split('.')[0]
			const Event = (await import(path.join(dir, file)));
			const event = new Event.default(this, name, file);

			event.startListener();
			this.events.set(name, event)
		}
	}

	async loadCommands(dir: string) {
		let f: string[] = fs.readdirSync(dir);

		for (let file of f) {
			if(!fs.lstatSync(path.join(dir, file)).isDirectory()) {
				const cmd = (await import(path.join(dir, file)));
				const command = new cmd.default(file);
				this.commands.set(file, command)
			} else this.loadCommands(path.join(dir, file));
		};
	}
	
	viewCommand(command: string) {
		return this.commands.find((x: any) => x.data.names.includes(command))
	}
};

export default NaCl;
import { event } from '../interfaces';

export var _event: event = {
	name: 'messageCreate',
	run: async (bot, msg) => {
		if (msg.author.bot || !msg.guild) return;
		var prefixes: string[] | any = [
			await bot.db.get('guilds', msg.guild.id + '.prefix') ?? 'n.',
			'nacl',
			`<@${bot.user.id}>`,
			`<@!${bot.user.id}>`
		];
		var prefix: string | undefined = prefixes.find((x: string) =>
			msg.content.toLowerCase().includes(x)
		);

		if (!prefix) return;

		var [cmd, ...args] = msg.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		cmd = cmd.toLowerCase();

		var CMD = bot.cmds.find(x => x.data.names.includes(cmd));
		if (!CMD) return;

		if (CMD.data?.onlyDevs && !bot.devs.includes(msg.author.id))
			return msg.reply(':x:  **[ Solo los devs lo pueden usar ]**');
		try {
			CMD.run({
				prefix,
				cmd,
				args,
				bot,
				msg,
				args_str: args.join(' '),
				channel: msg.channel,
				guild: msg.guild,
				author: msg.author,
				member: msg.member,
				bot_member: msg.guild.me,
				perms: msg.member.permissions.toArray(),
				bot_perms: msg.guild.me.permissions.toArray(),
				dtb: bot.distube,
				queue: bot.distube.getQueue(msg),
				db: bot.db
			});
		} catch (e) {
			console.log(e);
		}
	}
};

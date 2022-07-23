import djs from 'discord.js';
import event from '../classes/event';

class messageCreate extends event {
	async run(msg) {
		var bot = this.bot
		if (msg.author.bot || !msg.guild) return;
		var prefixes: string[] | any = [
			await bot.db.get('guilds', msg.guild.id + '.prefix') ?? bot.prefix,
			`<@${bot.user.id}>`,
			`<@!${bot.user.id}>`
		];
		var prefix: string | undefined = prefixes.find((x: string) =>
			msg.content.toLowerCase().startsWith(x)
		);

		if (!prefix) return;

		var [cmd, ...args] = msg.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		cmd = cmd.toLowerCase();

		var CMD = await bot.commands.find((x: any) => x.data.names.includes(cmd));
		if (!CMD) return;

		if (CMD.data.onlyDevs && !bot.devs.includes(msg.author.id))
			return msg.reply(':x:  **[ Solo los devs lo pueden usar ]**');

		if (CMD.data.inDev)
			msg.channel.send(':warning: **[ Este comando esta en desarrollo ]**')
		try {
			const me: djs.GuildMember = msg.guild.members.cache.get(bot.user.id)
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
				bot_member: me,
				perms: msg.member.permissions.toArray(),
				bot_perms: me.permissions.toArray(),
				db: bot.db
			});
		} catch (e) {
			console.log(e);
		}
	}
}

export default messageCreate
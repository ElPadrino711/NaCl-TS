import djs from 'discord.js';
import command from '../../classes/commands';

class cmd extends command {
	data = {
		names: ['avatar', 'pfp', 'av'],
		category: 'misc',
		desc: 'See someone\'s avatar.',
		usage: 'avatar [user]'
	}

	async run(d) {
		var usr: djs.User | djs.ClientUser =
			(await d.msg.mentions.users.first()) ||
			(await d.bot.users.cache.find(
				(x: djs.User | djs.ClientUser) =>
					d.args_str.toLowerCase() == x.username.toLowerCase() ||
					d.args_str == x.id ||
					d.args_str.toLowerCase() == x.tag.toLowerCase()
			)) ||
			(await d.bot.users.fetch(d.args_str).catch(() => { })) ||
			(await d.author);

		var pfp: string = usr.displayAvatarURL({ extension: 'png' });

		var embed = {
			author: { name: `Avatar de ${usr.tag}` },
			description: `<:fb_DiscordPoint:927846947115655168> **Tamaños:** \n**[\[512\]](${pfp}?size=512)╏[\[1024\]](${pfp}?size=1024)╏[\[2048\]](${pfp}?size=2048)╏[4096]**`,
			image: { url: pfp + '?size=4096' },
			color: djs.resolveColor('#6960EC'),
			footer: { text: 'NaCl', iconURL: d.bot.user.avatarURL() },
			timestamp: new Date()
		};

		d.msg.reply({ embeds: [embed] });
	}
};

export default cmd
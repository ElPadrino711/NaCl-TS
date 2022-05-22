import * as djs from 'discord.js';
import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['avatar', 'pfp', 'av'],
		category: ['misc', 'miscelaneo', 'misceláneo'],
		desc: 'Comando para ver el avatar de alguien',
		inDev: !1,
		onlyDevs: !1,
		usage: 'avatar [user]'
	},
	async run(d) {
		var usr: djs.User | djs.ClientUser =
			(await d.msg.mentions.users.first()) ||
			(await d.bot.users.cache.find(
				(x: any) =>
					d.args_str.toLowerCase() == x.username.toLowerCase() ||
					d.args_str == x.id ||
					d.args_str.toLowerCase() == x.tag.toLowerCase()
			)) ||
			(await d.bot.users.fetch(d.args_str).catch((e: any) => {
				void 0;
			})) ||
			(await d.author);

		var pfp = usr.displayAvatarURL({ dynamic: !0, format: 'png' });

		var embed: any = {
			author: { name: `Avatar de ${usr.tag}` },
			description: `<:fb_DiscordPoint:927846947115655168> **Tamaños:** \n**[\[512\]](${pfp}?size=512)╏[\[1024\]](${pfp}?size=1024)╏[\[2048\]](${pfp}?size=2048)╏[4096]**`,
			image: { url: pfp + '?size=4096' },
			color: '#6960EC',
			footer: { text: 'NaCl', iconURL: d.bot.user.avatarURL() },
			timestamp: new Date()
		};
		d.msg.reply({ embeds: [embed] });
	}
};

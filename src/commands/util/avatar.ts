import * as djs from 'discord.js';
import { Cmd } from '../../interfaces';

export var cmd: Cmd = {
	data: {
		names: ['avatar', 'pfp', 'av'],
		category: ['misc', 'miscelaneo', 'misceláneo'],
		desc: 'Comando para ver el avatar de alguien',
		inDev: !1,
		onlyDevs: !1,
		usage: 'avatar [user]'
	},
	async run(d) {
		var user: djs.User | djs.ClientUser =
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
		var usr: any =
			(await d.guild.members.cache.get(user.id)) ||
			(await d.guild.members.fetch(user.id).catch((e: any) => {
				void 0;
			}));

		var pfp = usr.avatarURL({ dynamic: !0, format: 'png' });

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

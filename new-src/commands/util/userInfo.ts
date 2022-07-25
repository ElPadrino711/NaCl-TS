import djs from 'discord.js';
import command from '../../classes/commands';

class cmd extends command {
	data = {
		names: ['user', 'userinfo', 'user-info', 'whois', 'who-is'],
		category: 'misc',
		desc: 'Comando para ver la informacion de un usuario',
		usage: 'userinfo [user]'
	}
	
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
		var emojis: string[] = [
			'🤠',
			'😱',
			'🥶',
			'😀',
			'😃',
			'😎',
			'🤩',
			'🤓',
			'😜',
			'😸',
			'👀',
			'😲'
		];

		var embed:any = {
			title: `${
				user.bot ? '🤖' : emojis[Math.floor(Math.random() * emojis.length)]
			} :: ${user.tag} Info`,
			fields: [
				{
					name: '> 🔰	[ General ]',
					value: `**[ Username ] ::** ${user.username}\n**[ ID ] ::** ${
						user.id
					}\n**[ Creacion ] ::** <t:${Math.round(
						user.createdTimestamp / 1000
					)}:f>`
				}
			],
			thumbnail: {
				url: user.displayAvatarURL({ extension: 'png' })
			}
		};
		if (usr) {
			embed.fields.push({
				name: '> 🛡️	[ Servidor ]',
				value: `**[ Nickname ] ::** ${usr.nickname ||
					'Ninguno'}\n**[ Unido ] ::** <t:${Math.round(
					usr.joinedTimestamp / 1000
				)}:f>\n**[ Hex Color ] ::** ${usr.displayHexColor}\n**[ Rol mas alto ] ::** ${usr.roles.highest.toString()}`
			});
			embed.color = usr.displayColor;
		}

		d.msg.reply({ embeds: [embed] });
	}
};

export default cmd
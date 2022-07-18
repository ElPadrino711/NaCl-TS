import { cmd } from '../../interfaces';
import * as djs from 'discord.js';

export var _cmd: cmd = {
	data: {
		names: ['help', 'ayuda'],
		category: ['info', 'informacion'],
		desc: 'test',
		inDev: false,
		onlyDevs: true,
		usage: 'test'
	},
	async run(d) {
		var embed = {
			author: {
				name: d.author.tag,
				icon_url: d.author.displayAvatarURL({ dynamic: true })
			},
			thumbnail: {
				url: d.bot.user.avatarURL()
			},
			fields: [{
				name: '> Links:',
				value: '🔗 [Github](https://github.com/ElPadrino711/NaCl-TS) \n🔗 [Invite](https://discord.com/oauth2/authorize?client_id=952918052452847616&permissions=1100991491350&scope=applications.commands%20bot)',
				inline: false
			}]
		}

		var menu = {
			type: 1,
			components: [{
				type: 3,
				custom_id: 'menu_help',
				options: [
					{
						label: 'Musica',
						value: 'music',
						description: 'loh comando de musuca'
					}
				],
				placeholder: 'selexiona uno puto'
			}]
		}

		// @ts-ignore
		var msg = await d.msg.reply({
			embeds: [embed],
			components: [menu]
		});

		// @ts-ignore
		var collector = await msg.createMessageComponentCollector({ time: 60000 });

		// @ts-ignore
		collector.on('end', () => msg.edit({ components: [] }));

		// @ts-ignore
		collector.on('collect', int => {
			
			// @ts-ignore
			if(int.user.id !== d.author.id) // @ts-ignore
				return int.reply({ content: `:x: **[ Solo ${d.author.tag} puede usarlo ]**`, ephemeral: true });

			// @ts-ignore
			switch(int.values[0]) {
				case 'music' :
					int.reply({ content: 'Aun no esta acabado :v', ephemeral: !0 });
					break;
				case 
			}
		});
	}
};

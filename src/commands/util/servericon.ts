import { cmd } from '../../interfaces';

export var _cmd: cmd = {
	data: {
		names: ['server-icon', 'servericon', 'icon'],
		category: ['misc', 'miscelaneo', 'misceláneo'],
		desc: 'Comando para ver el icono del servidor',
		inDev: !1,
		onlyDevs: !1,
		usage: 'server-icon'
	},
	async run(d) {
		var icon: string = d.guild.iconURL({ dynamic: !0, format: 'png' });

		if (!icon) return d.msg.reply(':x: **[ El servidor no tiene icono ]**');
		var embed: any = {
			author: { name: `Icono del servidor` },
			description: `<:fb_DiscordPoint:927846947115655168> **Tamaños:** \n**[\[512\]](${icon}?size=512)╏[\[1024\]](${icon}?size=1024)╏[\[2048\]](${icon}?size=2048)╏[4096]**`,
			image: { url: icon + '?size=4096' },
			color: '#6960EC',
			footer: { text: `- ${d.guild.name}`, iconURL: d.bot.user.avatarURL() },
			timestamp: new Date()
		};
		d.msg.reply({ embeds: [embed] });
	}
};

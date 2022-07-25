import command from '../../classes/commands';

class cmd extends command {
	data = {
		names: ['server-icon', 'servericon', 'icon'],
		category: 'misc',
		desc: 'Comando para ver el icono del servidor',
		usage: 'server-icon'
	}
	
	async run(d) {
		var icon: string = d.guild.iconURL({ extension: 'png' });

		if (!icon) return d.msg.reply(':x: **[ El servidor no tiene icono ]**');
		var embed = {
			author: { name: `Icono del servidor` },
			description: `<:fb_DiscordPoint:927846947115655168> **Tamaños:** \n**[\[512\]](${icon}?size=512)╏[\[1024\]](${icon}?size=1024)╏[\[2048\]](${icon}?size=2048)╏[4096]**`,
			image: { url: icon + '?size=4096' },
			color: 6906092,
			footer: { text: `- ${d.guild.name}`, iconURL: d.bot.user.avatarURL() },
			timestamp: new Date()
		};
		
		d.msg.reply({ embeds: [embed] });
	}
};

export default cmd
exports.run=(d:any)=>{
	var usr=d.msg.mentions.users.first()||d.bot.users.cache.find((x:any)=>d.args_str.tlc()==x.username.tlc()||d.args_str==x.id||d.args_str.tlc()==x.tag.tlc())||d.author

	var pfp=usr.avatarURL({dynamic:!0,format:'png'})||usr.defaultAvatarURL()

	d.embed = {
		author:{name: `Avatar de ${usr.tag}`},
		description: `<:fb_DiscordPoint:927846947115655168> **Tamaños:** \n**[\[512\]](${pfp}?size=512)╏[\[1024\]](${pfp}?size=1024)╏[\[2048\]](${pfp}?size=2048)╏[4096]**`,
		image:{url:pfp+'?size=4096'},
		color:'#6960EC',
		footer:{text:'NaCl',iconURL:d.bot.user.avatarURL()},
		timestamp: new Date()
	}
	d.msg.reply({embeds:[d.embed]})
}

exports.help={
	name: ['avatar','pfp','av'],
	category: ['misc','miscelaneo', 'misceláneo'],
	desc: 'Comando para ver el avatar de alguien',
	inDev: !1,
	onlyDevs:!1,
	usage: 'avatar [user]'
}
exports.run=async(d:any)=>{
	var embeds:any=[]
  if (!d.args_str) {
		return d.msg.reply('nomames')
	}
	
	embeds.push({
		author:{name:d.author.tag, icon_url:d.author.avatarURL({dynamic: true})},
		color:d.member.displayHexColor,
		description:d.args_str.replace('@','[@]'),
		timestamp:new Date()
	})

	d.channel.send({embeds})
};

exports.help={
	name: ['say','esay'],
	category: ['misc', 'miscelaneo', 'misceláneo'],
	desc: 'Comando de say, en embed',
	inDev: !0,
	onlyDevs:!1,
	usage: 'say <Texto>'
}
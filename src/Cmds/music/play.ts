exports.run=(d:any)=>{
	d.bot.distube.play(d.member.voice.channel,d.args_str,{member: d.member,textChannel:d.channel,message: d.msg});
}

exports.help={
	name:['play','playsong'],
	category:['musica','music', 'música'],
	desc:'Cmd de musica',
	inDev:!0,
	onlyDevs:!0,
	usage:'play <song>'
}
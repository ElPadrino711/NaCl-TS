module.exports.run = async(d:any) => {
  if (!d.args_string) {
		return d.msg.reply('nomames')
	}
	
	d.embed = {
		author: { name: d.author.tag, icon_url: d.author.avatarURL({ dynamic: true }) },
		color: d.member.displayHexColor,
		description: d.args_string.replace('@', '*'),
		timestamp: new Date()
	}

	d.channel.send({ embeds: [d.embed] })
};

module.exports.help = {
  name: ['say'],
  category: ['misc', 'miscelaneo', 'misceláneo'],
  desc: 'Comando de say, en embed',
  usage: '?say <Texto>'
}; 

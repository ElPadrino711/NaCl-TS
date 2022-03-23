import glob from'glob'
import path from'path'

exports.run=async(d:any)=>{
	var cmds:number=d.bot.cmds.size
	var err:number=0
	var time:number=Date.now()

	try{
		d.bot.cmds.forEach((w:any)=>d.bot.cmds.delete(w.help.name[0]))
		glob.sync(path.join(__dirname,'../../cmds')+'/**/*.js').forEach((x:any)=>{
			delete require.cache[require.resolve(x)]
			var cmd=require(x)
			d.bot.cmds.set(cmd.help.name[0],cmd)
		})
	}catch(e){
		err++
		console.log(e)
	}
	var cmds1:number=d.bot.cmds.size-cmds

	d.embed={
		author:{name:d.bot.user.tag, icon_url:d.bot.user.avatarURL()},
		color:'#03C04A',
		timestamp:new Date()
	}

	d.msg.reply('**[ Cargando comandos... ]**').then((msg:any)=>{
		d.embed.fields=[{name:':robot: **[ Comandos ]**',value:`\`\`\`js\n> Nuevos: ${cmds1} || Actualizados: ${cmds} || Errores: ${err} <\`\`\``},{name:':clock: **[ Tiempo ]**',value:`\`\`\`js\n> ${msg.createdTimestamp-time}ms <\`\`\``}]
		msg.edit({embeds:[d.embed]})
	})
}

exports.help={
  name: ['reload','reload-cmds'],
  category: ['dev', 'developers', 'desarrolladores'],
  desc: 'Comando para recargar comandos',
	inDev: !1,
	onlyDevs: !0,
  usage: 'reload'
} 
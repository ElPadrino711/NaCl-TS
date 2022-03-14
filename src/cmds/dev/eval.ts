var {create}=require('sourcebin')

exports.run=async(d:any)=>{
	var{bot,msg,member,bot_member,perms,bot_perms,cmd,command,args_str,channel,args,guild,embeds,glob,path,config,utils,author}=d
var embeds:any=[]

	if(!d.args_str)return d.msg.reply(':x:  |  Escribe algo que evaluar!').then((x:any)=>setTimeout(()=>x.delete(),3000))
  var evaluado:any,tipo:any
	try {
		evaluado=await eval(d.args_str)
		tipo=typeof(evaluado)
		evaluado=require('util').inspect(evaluado,{depth:0})+''.replace(d.bot.token, '[ToKeN]')
		
		if(evaluado.length >= 1024){
			var sb:any=create([{content: `${evaluado.replace(d.bot.token, '[ToKeN]')}`,language: 'javascript'},],{title: 'Eval',description: 'result >= 1024'})
			evaluado=`Resultado >= 1024\n${sb.url}`
		}
	}catch(err:any){
		embeds.push({title: 'Error',fields: [{name:'entrada',value:`\`\`\`js\n${d.args_str}\n\`\`\``},{name:'salida',value:`\`\`\`\n${evaluado}\n\`\`\``},{name:'error',value:`\`\`\`\n${err.message}\n\`\`\``}]})

		return d.channel.send({embeds:d.embeds})
	}

	embeds.push({title: 'ebal',fields: [{name:'entrada',value:`\`\`\`js\n${d.args_str}\n\`\`\``},{name:'salida',value:`\`\`\`\n${evaluado}\n\`\`\``},{name:'tipo',value:`\`\`\`\n${tipo}\n\`\`\``}]})

	d.channel.send({embeds})
}

exports.help={
  name: ['eval','ev'],
  category: ['dev', 'developers', 'desarrolladores'],
  desc: 'Comando de eval, aun en desarrollo',
	inDev: !1,
	onlyDevs: !0,
  usage: 'eval <Codigo para evaluar>'
} 
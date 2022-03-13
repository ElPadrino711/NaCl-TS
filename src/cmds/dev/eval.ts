var {create}=require('sourcebin')

exports.run=async(d:any)=>{
	var{bot,msg,member,bot_member,perms,bot_perms,cmd,command,args_string,channel,args,guild,embeds,glob,path,config,utils,author}=d

	if(!config.devs.includes(author.id))return msg.reply(':x:  |  No puedes usar esto!').then((x:any)=>setTimeout(()=>x.delete(),3000))

	if(!args[0])return d.msg.reply(':x:  |  Escribe algo que evaluar!').then((x:any)=>setTimeout(()=>x.delete(),3000))
  var evaluado:any,tipo:any
	try {
		evaluado=await eval(d.args_string)
		tipo=typeof(evaluado)
		evaluado=require('util').inspect(evaluado,{depth:0})+'' 
		
		if(evaluado.length >= 1024){
			var sb:any=create([{content: `${evaluado.replace(bot.token, '[ToKeN]')}`,language: 'javascript'},],{title: 'Eval',description: 'result >= 1024'})
			evaluado=`Resultado >= 1024\n${sb.url}`
		}
	}catch(err:any){
		d.embeds.push({title: 'Error',fields: [{name:'entrada',value:`\`\`\`js\n${d.args_string}\n\`\`\``},{name:'salida',value:`\`\`\`\n${evaluado}\n\`\`\``},{name:'error',value:`\`\`\`\n${err.message}\n\`\`\``}]})

		return d.channel.send({embeds:d.embeds})
	}

	d.embeds.push({title: 'ebal',fields: [{name:'entrada',value:`\`\`\`js\n${d.args_string}\n\`\`\``},{name:'salida',value:`\`\`\`\n${evaluado}\n\`\`\``},{name:'tipo',value:`\`\`\`\n${tipo}\n\`\`\``}]})

	d.channel.send({embeds:d.embeds})
}

exports.help={
  name: ['eval'],
  category: ['dev', 'developers', 'desarrolladores'],
  desc: 'Comando de eval, aun en desarrollo',
	inDev: !0,
  usage: async(d:any)=>{return d.prefixes[0]+'eval <Codigo para evaluar>'}
} 
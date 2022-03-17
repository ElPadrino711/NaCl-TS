var prefixes:string[],prefix:any,command:any,cmd:string,args:string[]

module.exports=async(bot:any,msg:any)=>{
	if(msg.author.bot)return
	if(!msg.guild)return

	prefixes=['n.','nacl',`<@${bot.user.id}>`,`<@!${bot.user.id}>`]
	prefix=prefixes.find((p:string)=>msg.content.tlc().startsWith(p))
	if(!prefix)return
	
	[cmd,...args]=msg.content.slice(prefix.length).trim().split(/ +/g)
	cmd=cmd.tlc()

	command=bot.cmds.find((c:any)=>c.help.name.includes(cmd))

	if(!command) return

	if(command.help.onlyDevs&&!bot.devs.includes(msg.author.id))return msg.reply(':x:  |  No puedes usar esto! (Solo devs)').then((x:any)=>setTimeout(()=>x.delete(),4000))
	
	try{
		command.run({
			prefix,
			cmd,
			command,
			args,
			bot,
			msg,
			args_str:args.join(' '),
			channel:msg.channel,
			guild:msg.guild,
			author:msg.author,
			member:msg.member,
			bot_membrr:msg.guild.me,
			perms:msg.member.permissions.toArray(),
			bot_perms:msg.guild.me.permissions.toArray()
		})
	}catch(err){
		console.log('> [Client]: CMD Error\n',err)
	}
}
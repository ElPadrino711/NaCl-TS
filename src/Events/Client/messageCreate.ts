module.exports=async(bot:any,msg:any)=>{
	/* Filter */
	if(msg.author.bot)return
	if(!msg.guild)return

	/* Vars */
	var prefixes:string[],prefix:any,command:any,cmd:string,args:string[]

	/* Prefixes */
	prefixes=[bot.db.get('guilds', msg.guild.id+'.prefix') || 'n.','nacl',`<@${bot.user.id}>`,`<@!${bot.user.id}>`]

	/* Prefix used */
	prefix=prefixes.find((p:string)=>msg.content.tlc().startsWith(p))
	if(!prefix)return

	/* Cmd | Args */
	[cmd,...args]=msg.content.slice(prefix.length).trim().split(/ +/g)
	cmd=cmd.tlc()

	/* Command Handler */
	command=bot.cmds.find((c:any)=>c.help.name.includes(cmd))

	/* Filters */
	if(!command) return
	if(command.help.onlyDevs && !bot.devs.includes(msg.author.id)) return msg.reply(':x:  |  U can\'t use this command! (Only devs)').then((x:any) => setTimeout(() => x.delete(), 5000))

	/* Execute the cmd */
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
	} catch(err) {
		console.log('> [Client]: CMD Error\n',err)
	}
}
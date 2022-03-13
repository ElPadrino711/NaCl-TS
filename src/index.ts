// Asdfgh, nose
import config from'./config';
import utils from'./utils';
import{NaCl}from'./classes/Client'

var glob=require('glob');
var path=require('path');
var bot:any=new NaCl(config.bot);

glob.sync(path.join(__dirname,'cmds')+'/**/*.js').forEach((r:any)=>{var x=require(r);bot.cmds.set(x.help.name[0],x)});

var _data:any={bot:bot,glob:glob,path:path,config:config,utils:utils};

bot.on('messageCreate',async(msg:any)=>{
  if(msg.author.bot)return;
  if(!msg.guild)return;

	_data.prefixes=[(bot.db.get(`guilds.${msg.guild.id}.prrefix`)||'n.'),'nacl','<@941830199270572053>','<@941830199270572053>']

	_data.prefix=_data.prefixes.find((x:any)=>msg.content.toLowerCase().startsWith(x));
  if(!_data.prefix)return;
  
  var[cmd,...args]=msg.content.slice(_data.prefix.length).trim().split(/ +/g);cmd=cmd.toLowerCase();

  var CMD=bot.cmds.find((c:any)=>c.help.name.includes(cmd));
  
  if(!CMD)return;

  _data.msg=msg;
  _data.channel=msg.channel;
  _data.guild=msg.guild;
  _data.author=msg.author;
  _data.member=msg.member;
  _data.bot_member=msg.guild.me;
  _data.perms=msg.member.permissions.toArray();
  _data.bot_perms=msg.guild.me.permissions.toArray();
  _data.cmd=cmd;
  _data.command=CMD;
  _data.args=args;
  _data.args_string=args.join(' ');
  _data.test='Prueba Xddd';
	_data.embeds=[];

  try{await CMD.run(_data)}catch(e){console.log('>> Ocurrio un error\n', e)}
});

bot.on('ready',()=>console.log(bot.user.tag, 'Esta Listo :D'));

bot.login(config.token); 
// Asdfgh, nose
import { Client, Collection, Intents } from 'discord.js';
import config from './config';
import utils from './utils';

var db = require('./db');
var glob = require('glob');
var path = require('path');
var bot:any = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

bot.db = {
  set: (type:string, id:string , value:any ,table:string = 'main') => {
		return db.set(table, type + '_' + id, value)
	},
	get: async(type:string, id:string, table:string = 'main') => {
		return (await db.get(table, type + '_' + id))
	},
	delete: (type:string, id:string, table:string = 'main') => {
		return db.delete(table, type + '_' + id)
	},
	all: async(table:string = 'main') => {
		return (await db.all(table))
	}
};

bot.cmds = new Collection();

glob.sync(path.join(__dirname,'cmds') + '/**/*.js').forEach((route:any) => {
  var file = require(route);
  bot.cmds.set(file.help.name[0], file);
});

var _data:any = {
  bot: bot,
  glob: glob,
  path: path,
  config: config,
	utils: utils
};

bot.on('messageCreate', async(msg:any) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;

  var prefix = await bot.db.get('prefix', msg.guild.id) || 'n.';
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  
  var [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g);
  cmd = cmd.toLowerCase();

  var CMD = bot.cmds.find((c:any) => c.help.name.includes(cmd));
  
  if (!CMD) return;

  _data.msg = msg;
  _data.channel = msg.channel;
  _data.guild = msg.guild;
  _data.author = msg.author;
  _data.member = msg.member;
  _data.bot_member = msg.guild.me;
  _data.perms = msg.member.permissions.toArray();
  _data.bot_perms = msg.guild.me.permissions.toArray();
  _data.cmd = cmd;
  _data.command = CMD;
  _data.args = args;
  _data.args_string = args.join(' ');
  _data.test = 'Prueba Xddd';

  try {
    CMD.run(_data);
  } catch(e) {
    console.log('>> Ocurrio un error\n', e);
  };
});

bot.on('ready', () => console.log(bot.user.tag, 'Esta Listo :D'));

bot.login(config.token); 
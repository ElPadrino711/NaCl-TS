// Asdfgh, nose
import { Client, Collection, Intents } from 'discord.js';
import config from './config';

var glob = require('glob');
var path = require('path');
var bot:any = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

bot.cmds = new Collection();

glob.sync(path.join(__dirname,'cmds') + '/**/*.js').forEach((route:any) => {
  var file = require(route);
  bot.cmds.set(file.help.name[0], file);
});

var _data:any = {
  bot: bot,
  glob: glob,
  path: path,
  config: config
};

bot.on('messageCreate', async (msg:any) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;

  var prefix = 'h.';
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  
  var [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g);
  cmd = cmd.toLowerCase();

  var CMD = bot.cmds.find((c:any) => c.help.name.includes(cmd));
  
  if (!CMD) return;

  _data.msg = msg;
  _data.chanmel = msg.channel;
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
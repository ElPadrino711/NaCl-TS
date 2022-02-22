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

bot.commands = new Collection();

glob.sync(path.join(__dirname,'cmds') + '/**/*.js').forEach((route:any) => {
  var file = require(route);
  bot.commands.set(file.name, file);
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
  
  var args = msg.content.slice(prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase();

  var CMD = bot.commands.find((c:any) => c.help.name.includes(cmd));
  
  if (!CMD) return;

  _data.msg = msg;
  _data.chanmel = msg.channel;
  _data.guild = msg.guild;
  _data.author = msg.author;
  _data.member = msg.member;
  _data.bot_member = msg.member.me;
  _data.perms = msg.member.permissions.toArray();
  _data.bot_perms = msg.member.me.permissions.toArray();
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

bot.on('ready', () => console.log(bot.user.tag, 'Esta Listo ugu'));

bot.login(config.token); //El config esta en donde hosteo esto, solo hago un git pull y ya

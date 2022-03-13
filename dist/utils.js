"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeError = (d, type, desc, color = '#C70000', tmb = d.bot.user.avatarURL({ size: 4096 })) => {
    return {
        author: { name: `>>  Error  ||  ${type}`, icon_url: 'https://cdn.discordapp.com/emojis/945621456216264724.gif' },
        thumbnail: { url: tmb },
        color: color,
        description: `\`\`\`js\n'${desc}'\n\`\`\``
    };
};
var randomNumber = (max, min, decimals) => decimals ? Math.random() * (max - min) + min : Math.round(Math.random() * (max - min)) + min;
var randomString = async (num) => {
    var l = num;
    var r = '';
    var ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var chL = ch.length;
    for (var i = 0; i < l; i++) {
        r += ch.charAt(Math.floor(Math.random() *
            chL));
    }
    return r;
};
var color = {
    black: (str) => `\x1b[0m\x1b[30m${str}\x1b[0m`,
    red: (str) => `\x1b[0m\x1b[31m${str}\x1b[0m`,
    green: (str) => `\x1b[0m\x1b[32m${str}\x1b[0m`,
    yellow: (str) => `\x1b[0m\x1b[33m${str}\x1b[0m`,
    blue: (str) => `\x1b[0m\x1b[34m${str}\x1b[0m`,
    magenta: (str) => `\x1b[0m\x1b[35m${str}\x1b[0m`,
    cyan: (str) => `\x1b[0m\x1b[36m${str}\x1b[0m`,
    white: (str) => `\x1b[0m\x1b[37m${str}\x1b[0m`,
    custom: (str, n) => `\x1b[0m\x1b[${n}m${str}\x1b[0m`
};
var findUser = async (d, usr) => {
    let t = usr?.toLowerCase();
    try {
        return (d.msg.mentions.users.first() || await d.bot.users.cache.find((x) => x.username?.toLowerCase() == t || x.tag?.toLowerCase() == t || x.id == t) || undefined);
    }
    catch {
        return undefined;
    }
};
var findMember = async (d, member, guild = d.guild) => {
    let m = member.toLowerCase();
    (await guild.members.cache.find((x) => x.user.username.toLowerCase() == m || x.user.tag.toLowerCase() == m || x.user.id === m) || d.msg.mentions.members.first());
};
exports.default = { makeError, randomNumber, randomString, color, findUser, findMember };

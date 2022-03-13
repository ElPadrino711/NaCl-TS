"use strict";
exports.run = async (d) => {
    if (!d.args_string) {
        return d.msg.reply('nomames');
    }
    d.embeds.push({
        author: { name: d.author.tag, icon_url: d.author.avatarURL({ dynamic: true }) },
        color: d.member.displayHexColor,
        description: d.args_string.replace('@', '[@]'),
        timestamp: new Date()
    });
    d.channel.send({ embeds: d.embeds });
};
exports.help = {
    name: ['say'],
    category: ['misc', 'miscelaneo', 'misceláneo'],
    desc: 'Comando de say, en embed',
    inDev: !1,
    usage: async (d) => { return d.prefixes[0] + 'say <Texto>'; }
};

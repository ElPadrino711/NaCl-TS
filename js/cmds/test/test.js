"use strict";
module.exports.run = function (d) {
    d.msg.reply(d.test);
};
module.exports.help = {
    name: ['test'],
    category: ['development', 'desarrolladores', 'dev'],
    desc: 'Comando de prueba (solo eso)',
    usage: '?test'
};

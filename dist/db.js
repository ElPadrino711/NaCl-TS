"use strict";
var db = require('megadb'), eco = new db.crearDB({ nombre: 'eco', carpeta: '../../database' }), guilds = new db.crearDB({ nombre: 'guilds', carpeta: '../../database' }), users = new db.crearDB({ nombre: 'users', carpeta: '../../database' });
/* Aqui empieza el infierno */
exports.get = (t, k) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    switch (t) {
        case 'eco':
            return (eco.obtener(k, '.'));
            break;
        case 'users':
            return (users.obtener(k, '.'));
            break;
        case 'guild':
            return (guilds.obtener(k, '.'));
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.set = (t, k, v) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    if (!v)
        return 'Put a valid value';
    switch (t) {
        case 'eco':
            return eco.establecer(k, v, '.');
            break;
        case 'users':
            return users.establecer(k, v, '.');
            break;
        case 'guild':
            return guilds.establecer(k, v, '.');
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.has = (t, k) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    switch (t) {
        case 'eco':
            return eco.tiene(k, '.');
            break;
        case 'users':
            return users.tiene(k, '.');
            break;
        case 'guild':
            return guilds.tiene(k, '.');
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.del = (t, k) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    switch (t) {
        case 'eco':
            return eco.eliminar(k, '.');
            break;
        case 'users':
            return users.eliminar(k, '.');
            break;
        case 'guild':
            return guilds.eliminar(k, '.');
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.all = (t) => {
    if (!t)
        return 'Put a valid table';
    switch (t) {
        case 'eco':
            return eco.datos();
            break;
        case 'users':
            return users.datos();
            break;
        case 'guild':
            return guilds.datos();
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.push = (t, k, v) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    if (!v)
        return 'Put a valid value';
    switch (t) {
        case 'eco':
            return eco.push(k, v, '.');
            break;
        case 'users':
            return users.push(k, v, '.');
            break;
        case 'guild':
            return guilds.push(k, v, '.');
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
exports.values = (t, k) => {
    if (!t)
        return 'Put a valid table';
    if (!k)
        return 'Put a valid key';
    switch (t) {
        case 'eco':
            return eco.values(k, '.');
            break;
        case 'users':
            return users.values(k, '.');
            break;
        case 'guild':
            return guilds.values(k, '.');
            break;
        default:
            return 'Put a valid table (eco/users/guild)';
            break;
    }
};
/* Habian mas, no los agregare */ 

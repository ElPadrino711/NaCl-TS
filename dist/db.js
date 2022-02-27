"use strict";
var Database = require('dbdjs.db').Database;
var db = new Database({
    path: './database/',
    tables: [{ name: 'main' }, { name: '717' }],
});
db.once('ready', function () {
    console.log('basededato litoh');
});
db.connect();
module.exports = db;

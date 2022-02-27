var {Database} = require('dbdjs.db');
var db = new Database({
  path: './database/',
  tables: [{ name: 'main' }, { name: '717' }],
});

db.once('ready', () => {
  console.log('basededato litoh');
});

db.connect();

module.exports = db;
// Imports
import config from './config';
import express from 'express';
import NaCl from './classes/client';

// Bot start
const bot = new NaCl(config);

// Server start (optional, you can delete this)
var server = express();

server.get('/', (rq, rs) => {
	let status: string = (bot['user'] ? 'on' : 'off')
	rs.send('<h1 style="font-family:verdana"> The bot is ' + status +'.</h1>')
});

server.get('/*', (rq, rs) => rs.send('<h1 style="font-family:verdana">Error 404: Not found.</h1>'));

server.listen(config.port, () => console.log('Server ready'));
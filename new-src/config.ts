// Loading .env file
import 'dotenv/config';

// Bot default prefix
var prefix: string = '!!'

// Bot token
var token: string = process.env.TOKEN;

// Replace with your devs
var devs: string[] = ['728828371383091200'];

// Server Port
var port: number = Number(process.env.PORT) || 3000;

// Bot options
var bot = {
	intents: [
		'Guilds',
		'GuildMessages',
		'DirectMessages',
		'GuildVoiceStates',
		'MessageContent'
	],
	partials: [
		'Channel'
	],
	allowedMentions: { 
		repliedUser: !1 
	},
	presence: {
		status: 'idle',
		activities: [
			{
				name: 'No v13? 🥳🥳🥳',
				type: 1,
				url: 'https://twitch.tv/el_padrino_717'
			}
		]
	}			
};

export default {
	bot,
	port,
	devs,
	token,
	prefix
}
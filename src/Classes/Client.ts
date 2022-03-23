/* Imports */
import { Client, Collection } from 'discord.js'
import { Database } from './Database'
import { DisTube } from 'distube'
import { SpotifyPlugin } from '@distube/spotify'
import { SoundCloudPlugin } from '@distube/soundcloud'
import glob from 'glob'

export class NaCl extends Client {
	db:any
	cmds:any
	devs:string[]
	distube:any

	
	constructor(){
		/* new Client({...}) */
		super({
			intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_VOICE_STATES'],
			partials: ['CHANNEL'],
			allowedMentions: {
				repliedUser: !1
			},
			presence: {
				status: 'idle',
				activities: [{
					name: 'No bitches? 😿',
					type: 1,
					url: 'https://twitch.tv/el_padrino_717'
				}]
			}			
		})

		/* Database ('./Database') */
		this.db = new Database({tables: ['guilds', 'users', 'eco'], dir: './database'})

		/* Command Handler */
		this.cmds = new Collection()
		
		/* Developers */
		this.devs = ['728828371383091200', '847818806906847252']
		
		/* Distube */
		this.distube = new DisTube(this, { plugins: [new SpotifyPlugin(), new SoundCloudPlugin()], nsfw: !1, updateYouTubeDL: !1 })
	}

	/* Command Handler */
	loadCmds() {
		glob.sync('/home/runner/NaCl-TS/dist/Cmds/**/*.js').forEach((r:any) => {
			var f:any = require(r)
			this.cmds.set(r, f)
			console.log(`> [Client]: CMD (${f.help.name[0]}) - loaded`)
		})
	}

	/* Event Handler */
	loadEvents() {
		glob.sync('/home/runner/NaCl-TS/dist/Events/Client/*.js').forEach((r:any)=>{
			var [e, en] = [require(r), r.split('/').pop().replace('.js', '')]
			super.on(en, e.bind(null, this))
			
			console.log(`> [Client]: Event (${en}) - loaded`)
		})
			glob.sync('/home/runner/NaCl-TS/dist/Events/Distube/*.js').forEach((r:any)=>{
			var [e, en] = [require(r), r.split('/').pop().replace('.js','')]
			this.distube.on(en, e.bind(null, this))
				
			console.log(`> [Distube]: Event (${en}) - loaded`)
		})
	}

	start() {
		this.loadCmds()
		this.loadEvents()
		console.log('> [Client]: Trying to login')
		super.login(process.env.token)
		super.on('ready', () => console.log('> [Client]: Succesfully logged in'))
	}
}
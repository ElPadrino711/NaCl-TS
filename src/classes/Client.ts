import{Client,Collection}from'discord.js'
import{nDB}from'./Database'
import glob from'glob'
import path from'path'

export class NaCl extends Client {
	cmds:any
	slash:any
	db:any
	devs:string[]
	
	public constructor() {
		super({
			intents:['GUILDS','GUILD_MESSAGES','DIRECT_MESSAGES'],
			partials:['CHANNEL'],
			allowedMentions:{repliedUser:!1},
			presence:{
				status:'idle',
				activities:[{
					name:'No bitches? 😿',
					type:1,
					url:'https://twitch.tv/el_padrino_717'
				}]
			}
		})
		this.cmds=new Collection()
    this.slash=new Collection()
		this.db=new nDB('../../db.json')
		this.devs=['728828371383091200','847818806906847252']
	}
	connect(t:string){
		super.login(t)
		console.log('> [Client]:','Trying to login')
		super.on('ready',(b)=>console.log('  -Succesfully logged in'))
	}
	
	loadCmds(){
		glob.sync(path.join(__dirname,'../cmds')+'/**/*.js').forEach((x:any)=>{
			var f=require(x);
			this.cmds.set(f.help.name[0],f)
			console.log('> [Client]: CMD (',f.help.name.join(' / '),')\n  -Loaded')
		})
	}

	loadEvents(){
		glob.sync(path.join(__dirname,'../events')+'/*.js').forEach((r:any)=>{
			var[e,en]=[require(r),r.split('/').pop().replace('.js','')]
			super.on(en,e.bind(null,this))
			
			console.log('> [Client]: Event (',en,')\n  -Loaded')
		})
	}
}
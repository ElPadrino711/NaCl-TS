import{Client,Collection}from'discord.js'
import{nDB}from'./Database'

export class NaCl extends Client {
	cmds:any
	slash:any
	db:any
	
	constructor(opt:any) {
		super(opt)
		this.cmds=new Collection()
    this.slash=new Collection()
		this.db=new nDB('../../db.json')
	}
}
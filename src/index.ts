// Imports / Vars
import{NaCl}from'./classes/Client'
import web from'./web/index'

var bot = new NaCl()

web.connect()
bot.connect()

export default bot

// Prototypes (i will use a handler later)
declare global{
  interface String{
    tlc(): string
  }
	interface Object{
		has(k:string): any
	}
}

String.prototype.tlc=function(){
	return this.toLowerCase()
}

Object.prototype.has=function(k:string){
	var r:boolean
	try{
		r=this.hasOwnProperty(k)
	}catch{
		r=false
	}
	return r
}
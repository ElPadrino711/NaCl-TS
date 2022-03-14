// Imports / Vars
import{NaCl}from'./classes/Client'
var bot:any=new NaCl()

// Things
bot.connect(process.env.token)
bot.loadCmds()
bot.loadEvents(bot)

// Prototypes (i will use a handler later)
declare global{
  interface String{
    tlc(): string
  }
}

String.prototype.tlc=function(){return this.toLowerCase()}
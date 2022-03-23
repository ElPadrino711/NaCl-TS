import { NaCl } from './Classes/Client'
import express from 'express'
var app = express()
var bot = new NaCl()

app.get('/', async(req:any, res:any) => {
	res.send(`
<h1>${bot.user?.tag} - Asd</h1>
`)
})

app.listen(3030)
bot.start()

/* Prototypes, i will use a handler later */

declare global{
	interface String{
		tlc(): string
	}
	interface Object{
		has(k:string): any
	}
}

String.prototype.tlc = function() {
	return this.toLowerCase()
}

Object.prototype.has = function(k:string) {
	var r:boolean
	try {
		r = this.hasOwnProperty(k)
	} catch {
		r = false
	}
	return r
}
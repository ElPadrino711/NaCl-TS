import express from 'express'
import bot from '../index'
var app=express()

app.get('/',async(req:any,res:any)=>{
	res.send(`
<h1>${bot.user?.tag} - Asd</h1>
`)
})

function connect(){
	app.listen(3030)
}

export default {connect}
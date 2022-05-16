import { NaCl } from '../structures'
import { ClientEvents } from 'discord.js'

export interface Event{
	name: keyof ClientEvents
	run (bot: NaCl,...args:any[]) : void
}
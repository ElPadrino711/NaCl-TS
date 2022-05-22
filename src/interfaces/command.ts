import * as djs from 'discord.js';
import { DisTube, Queue } from 'distube';
import { NaCl } from '../structures';

interface data {
	names: string[];
	category: string[];
	desc: string;
	inDev: boolean;
	onlyDevs: boolean;
	usage: string;
}

interface Run {
	prefix: string;
	cmd: string;
	args: string[];
	bot: NaCl;
	msg: djs.Message;
	args_str: string;
	channel: djs.TextChannel;
	guild: djs.Guild;
	author: djs.User;
	member: djs.GuildMember;
	bot_member: djs.GuildMember;
	perms: string[];
	bot_perms: string[];
	dtb: DisTube;
	queue: Queue;
}

export interface cmd {
	data: data;
	run(d: Run): void;
}

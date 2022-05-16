import { Event } from '../interfaces';

export var event: Event = {
	name: 'ready',
	run: (bot, _) =>
		console.log('Ready As', bot?.user?.tag, '(' + _?.user?.id + ')')
};

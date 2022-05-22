import { event } from '../interfaces';

export var _event: event = {
	name: 'ready',
	run: (bot, _) =>
		console.log('Ready As', bot?.user?.tag, '(' + _?.user?.id + ')')
};

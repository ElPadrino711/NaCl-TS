import { NaCl } from '../structures';

export interface event {
	name: string;
	distube?: boolean;
	run(bot: NaCl, ...args: any[]): void;
}

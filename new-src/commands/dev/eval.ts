import command from '../../classes/commands';
var { create } = require('sourcebin');

class cmd extends command {
	data = {
		names: ['eval', 'e'],
		category: ['dev'],
		desc: 'Eval (devs only)',
		onlyDevs: true,
		usage: 'eval <Code>'
	};
	async run(d) {
		var {
			bot,
			msg,
			channel,
			author,
			member,
			prefix,
			cmd,
			args,
			args_str,
			perms,
			bot_perms,
			bot_member,
			guild,
			db
		} = d;

		if (!args_str) return msg.reply(':x: **[ Escribe algo para evaluar ]**');

		var embed: any, evaled: any = '', type: string;

		try {
			evaled = await eval(`${d.args_str}`);
			type = typeof evaled;
			if (type == 'function')
				evaled = evaled.toString()
			else
				evaled = await require('util').inspect(evaled, { depth: 0 })

		} catch (err) {
			embed = {
				title: 'Error',
				fields: [
					{
						name: 'entrada',
						value: `\`\`\`js\n${d.args_str}\n\`\`\``
					},
					{
						name: 'error',
						value: `\`\`\`\n${err.message}\n\`\`\``
					}
				]
			};

			return channel.send({ embeds: [embed] });
		}

		embed = {
			title: 'Eval',
			fields: [
				{
					name: 'Entrada',
					value: `\`\`\`js\n${args_str}\n\`\`\``
				},
				{
					name: 'Salida',
					value: '```js\n' + evaled + '\n```'.replace(bot.token, '[ ToKeN ]')
				},
				{
					name: 'Type',
					value: `\`\`\`\n${type == 'string'
							? 'String'
							: type == 'object'
								? 'Object'
								: type == 'boolean'
									? 'Boolean'
									: type == 'number'
										? 'Number'
										: type == 'function'
											? 'Function'
											: 'undefined'
						}\n\`\`\``
				}
			]
		};

		if (evaled.length >= 1024) {
			var sb: any = await create(
				[
					{
						content: `${evaled}`,
						language: 'javascript'
					}
				],
				{
					title: 'Eval',
					description: 'result >= 1024'
				}
			);
			embed.fields[1] = {
				name: 'Salida',
				value: `Result >= 1024\n${sb.url}`
			};
		};
		channel.send({ embeds: [embed] });
	}
};

export default cmd;
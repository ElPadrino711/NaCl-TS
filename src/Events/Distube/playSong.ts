module.exports = async(bot:any, queue:any, song:any) => {
	/* Send Message */
	queue.textChannel?.send(`Ahora reproduciendo \`${song.name}\` - añadido por \`${song.user.tag}\``)
}
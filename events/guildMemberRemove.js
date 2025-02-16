const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberRemove,
	env: process.env.NODE_ENV,
	async execute(member) {
		if (member.guild.id !== process.env.GUILD_ID || member.user.bot) return;

		member.guild.channels.cache.get(process.env.CH_LOBBY).send({ embeds: [new EmbedBuilder()
			.setColor('#29A6F9')
			.setAuthor({ name: `😿 Użytkownik ${member.user.tag} opuścił serwer`, iconURL: member.guild.iconURL() })
			.setDescription(
				`Niestety osoba ${member} wyszła z naszego serwera.\nMamy nadzieję, że jeszcze wrócisz do nas. Wierzymy w Ciebie.\nPo stracie tego członka mamy w sumie **${member.guild.members.cache.filter(m => !m.user.bot).size} osób**.`
			)
			.setThumbnail(member.user.displayAvatarURL())],
		});

		try {
			await member.guild.channels.cache.get(process.env.VC_OSOBY).setName(`👥・Osoby: ${member.guild.members.cache.filter(m => !m.user.bot).size} ⬇`);
		} catch (err) {
			console.warn('EventR » The server user count was not updated when a user left the server.', err.message);
		}

		console.log(`EventR » User ${member.user.tag} (${member.id}) has left the server ${member.guild.name}`);
	},
};
const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildBanRemove,
	env: process.env.NODE_ENV,
	async execute(member) {
		if (member.guild.id !== process.env.GUILD_ID || member.user.bot) return;

		member.guild.channels.cache.get(process.env.CH_LOBBY).send({ embeds: [
			new EmbedBuilder()
				.setColor('#0030FF')
				.setAuthor({ name: `Ban osobie ${member.user.tag} został zniesiony`, iconURL: member.guild.iconURL() })
				.setDescription(
					`Hurra! Użytkownik ${member.user} został odbanowany na naszym serwerze!\nPamiętaj, że każde naruszenie naszych zasad, będzie grozić karą.`
				)
				.setThumbnail(member.user.displayAvatarURL())],
		});

		console.log(`EventR » Ban for user ${member.user.tag} (${member.user.id}) has been lifted on the server ${member.guild.name}`);
	},
};
const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildBanAdd,
	env: process.env.NODE_ENV,
	async execute(member) {
		if (member.guild.id !== process.env.GUILD_ID || member.user.bot) return;

		console.log(`EventR » Użytkownik ${member.user.tag} (${member.user.id}) dostał bana na serwerze ${member.guild.name}`);

		member.guild.channels.cache.get(process.env.CH_LOBBY).send({ embeds: [
			new EmbedBuilder()
				.setColor('#FF4800')
				.setAuthor({ name: `Użytkownik ${member.user.tag} otrzymał bana`, iconURL: member.guild.iconURL() })
				.setDescription(
					`Osoba z nickiem ${member.user} została zbanowana na naszym serwerze przez jednego z administratorów. Bywa...\n` +
					`Po stracie tego osobnika mamy w sumie **${member.guild.members.cache.filter(m => !m.user.bot).size - 1} ludzi**.`
				)
				.setThumbnail(member.user.displayAvatarURL())],
		});

		try {
			await member.guild.channels.cache.get(process.env.VC_OSOBY).setName(`👥・Osoby: ${member.guild.members.cache.filter(m => !m.user.bot).size} ⚠`);
		} catch (err) {
			console.warn('EventA » The server user count was not updated when a user was banned.', err.message);
		}
	},
};
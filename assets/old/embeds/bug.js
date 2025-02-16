const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'bug',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#F03A17')
				.setAuthor({ name: 'Zgłoś błąd', iconURL: msg.guild.iconURL(), url: process.env.URL_SEFINEK })
				.setDescription('Znalazłeś błąd w naszych botach Skiffy, LabyBOT lub Noel™? Proszę, zgłoś go!')],
		});
	},
};
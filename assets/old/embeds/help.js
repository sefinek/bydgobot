const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#DA1021')
				.setAuthor({ name: 'Pomoc z botem', iconURL: msg.guild.iconURL(), url: process.env.URL_SEFINEK })
				.setDescription('Potrzebujesz pomocy z <@893234608747999233>, <@546058545917984769> lub <@1078395610375409856>? Pisz śmiało!')],
		});
	},
};
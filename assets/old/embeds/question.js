const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'question',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#FFC83D')
				.setAuthor({ name: 'Pytania do nas', iconURL: msg.guild.iconURL(), url: process.env.URL_SEFINEK })
				.setDescription('Masz jakieś pytanie do naszego zespołu w sprawie botów? Służymy pomocą!')],
		});
	},
};
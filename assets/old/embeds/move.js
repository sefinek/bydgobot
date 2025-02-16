const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'move',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#00FF4E')
				.setDescription('Od teraz ten serwer jest serwerem wsparcia bota <@893234608747999233>, <@1078395610375409856> i <@546058545917984769>!')],
		}).then(() => msg.channel.send('**[<@&918129678877880321>]**'));
	},
};
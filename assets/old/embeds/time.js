const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'time',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#008AFF')
				.setAuthor({ name: `Weryfikacja na serwerze ${msg.guild.name}`, iconURL: msg.guild.iconURL(), url: process.env.URL_SEFINEK })
				.setDescription(
					'Niestety, ale Twój czas na zweryfikowanie się za pomocą <@372022813839851520> upłynął.\n\n> Wpisz polecenie `;verify` na niniejszym kanale, aby ponowić próbę.'
				)],
		});

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#FF004E')
				.setDescription(`> Jeśli powyższe polecenie nie działa, skontaktuj się z <@${process.env.BOT_OWNER}>.`)],
		});
	},
};
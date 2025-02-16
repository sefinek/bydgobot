const { EmbedBuilder } = require('discord.js');
const dmDeliveryMsgError = require('../dm/deliveryError.js');
const msgBackup = require('../dm/msgBackup.js');

module.exports = async msg => {
	const REQUIRED_LENGTH = 38;

	if (msg.content.length > REQUIRED_LENGTH) {
		try {
			await msg.react('❤️');

			const thread = await msg.startThread({ name: `[${msg.author.username}]: Komentarze`, reason: `Użytkownik ${msg.author.tag} (${msg.author.id}) wystawił swe ogłoszenie.`, autoArchiveDuration: 4320 });
			thread.send({ embeds: [
				new EmbedBuilder()
					.setDescription('Tutaj pozostali użytkownicy mogą skomentować niniejsze ogłoszenie.\nPamiętaj, że każdy członek serwera jest zobowiązany do przestrzegania [wytycznych](https://github.com/sefinek/Milosna_Grota/blob/main/Rules.md).')],
			});
		} catch (err) {
			dmDeliveryMsgError.iAmAnIdiot(msg, err, 15000);
		}
		return;
	}

	const deliveredMsg = await msgBackup({ msg, length: REQUIRED_LENGTH });

	return msg.channel.send({ embeds: [new EmbedBuilder()
		.setColor('#004EFF')
		.setAuthor({ name: `Nie możesz wysłać tej wiadomości ${msg.author.username}`, iconURL: msg.guild.iconURL() })
		.setDescription(
			'Publikowanie krótkich wiadomości na tym kanale nie jest możliwe. Prosimy o rozwinięcie swojej wypowiedzi.\n' +
			`${deliveredMsg ? 'Kopia Twojej wiadomości została Ci wysłana w prywatnych wiadomościach.' : 'Niestety, nie udało się dostarczyć kopii Twojej wiadomości w prywatnych wiadomościach. Głównym powodem może być Twój brak zgody na otrzymywanie prywatnych wiadomości od innych użytkowników.' } ` +
			'Życzymy Ci powodzenia!'
		)
		.setThumbnail(msg.author.displayAvatarURL())
		.setFooter({ text: 'Jeśli chcesz skomentować jakiekolwiek ogłoszenie - zrób to w wątku.' })],
	}).then(del => {
		msg.delete();
		setTimeout(() => del.delete(), 20000);

		console.log(`EventM » Użytkownik ${msg.author.tag} (${msg.author.id}) opublikował krótką wiadomość na kanale ${msg.channel.name}. Treść:`, msg.content);
	});
};
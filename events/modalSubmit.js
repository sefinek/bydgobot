const { Events, EmbedBuilder } = require('discord.js');
const d = require('../scripts/switch/time.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(inter, client) {
		if (!inter.isModalSubmit()) return;

		const channel = client.channels.cache.get(process.env.CH_FORMULARZE);
		if (!channel) {
			inter.reply('Wymagany kanał nie został odnaleziony. Skontaktuj się z administratorem.');
			return console.error(`ModalS » Channel ${channel.id} was not found`);
		}


		// Darkweb manager
		if (inter.customId === 'kierownik-darkweba') {
			const challenge = inter.fields.getTextInputValue('challenge');
			const time = inter.fields.getTextInputValue('time.js');
			const changes = inter.fields.getTextInputValue('changes');

			channel.send({ embeds: [
				new EmbedBuilder()
					.setColor('#423B64')
					.setAuthor({ name: `📝 Formularz na kierownika od ${inter.user.tag}`, iconURL: inter.guild.iconURL() })
					.addFields([
						{ name: '» Identyfikator', value: `> ${inter.user.id}`, inline: true },
						{ name: '» Data i godzina', value: `> ${d('td')}`, inline: true },
						{ name: '» Czy podołasz wyzwaniu kierownika czarnego internetu?', value: challenge },
						{ name: '» Ile dziennie czasu poświecisz na serwer?', value: time },
						{ name: '» Opowiedz jakbyś zmienił czarny rynek (opcjonalnie)', value: changes },
					])
					.setThumbnail(inter.user.displayAvatarURL())],
			});

			inter.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#00D26A')
					.setAuthor({ name: '✔️️ Dziękujemy za dostarczenie formularzu', iconURL: inter.user.displayAvatarURL() })
					.setDescription('Otrzymaliśmy Twój formularz i wkrótce się z tobą skontaktujemy.')],
			});
		}


		// Partnership Manager
		if (inter.customId === 'realizator-partnerstw') {
			const question1 = inter.fields.getTextInputValue('question1');
			const question2 = inter.fields.getTextInputValue('question2');

			channel.send({ embeds: [
				new EmbedBuilder()
					.setColor('#FDD641')
					.setAuthor({ name: `🤝️ Formularz na realizatora partnerstw od ${inter.user.tag}`, iconURL: inter.guild.iconURL() })
					.addFields([
						{ name: '» Identyfikator', value: `> ${inter.user.id}`, inline: true },
						{ name: '» Data i godzina', value: `> ${d('td')}`, inline: true },
						{ name: '» Możemy na Ciebie liczyć?', value: question1 },
						{ name: '» Będziesz wywiązywać się ze swoich obowiązków?', value: question2 },
					])
					.setThumbnail(inter.user.displayAvatarURL())],
			});

			inter.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#00D26A')
					.setAuthor({ name: '✔️️ Dziękujemy za dostarczenie formularzu', iconURL: inter.user.displayAvatarURL() })
					.setDescription('Otrzymaliśmy Twój formularz i wkrótce się z tobą skontaktujemy.')],
			});
		}

		console.log(`ModalS » Received a new form: ${inter.customId}`);
	},
};
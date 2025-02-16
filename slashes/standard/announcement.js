const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
const Announcements = require('../../database/models/Announcements.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ogłoszenie')
		.setDescription('Dodaj swoje ogłoszenie poszukuję lub szukam na kanał ogłoszenia.')
		.addSubcommand(sub =>
			sub
				.setName('dodaj')
				.setDescription('Dodaj ogłoszenie na specjalny kanał.')
				.addStringOption(op => op.setName('kogo-szukasz').setDescription('Napisz w tym polu kogo szukasz: chłopaka, dziewczyny, czy przyjaciela.').setRequired(true))
				.addStringOption(op => op.setName('przedstaw-się').setDescription('Opis Twojego wizerunku lub charakteru, bądź bezpośredni link do wiadomości z kanału przedstaw-się.').setRequired(true))
				.addStringOption(op => op.setName('treść-ogłoszenia').setDescription('Wprowadź tutaj informacje (ewentualnie wymagania) na temat kogo szukasz i tym podobne.').setRequired(true))
				.addAttachmentOption(op => op.setName('zdjęcie').setDescription('Opcjonalnie załącz tutaj swoje zdjęcie. Publikacja na własną odpowiedzialność.'))
		)
		.addSubcommand(sub => sub.setName('pomoc').setDescription('Informacje na temat wystawiania ogłoszeń oraz pomoc.')),
	async execute(client, inter) {
		const sub = inter.options.getSubcommand();

		if (sub === 'dodaj') {
			const type = inter.options.getString('kogo-szukasz');
			const bio = inter.options.getString('przedstaw-się');
			const desc = inter.options.getString('treść-ogłoszenia');

			if (type.length > 1024 || bio.length > 1024 || desc.length > 1024) {
				return inter.reply({ embeds: [
					new EmbedBuilder()
						.setColor('#0096FF')
						.setAuthor({ name: '❌ Podane dane są za długie', iconURL: inter.guild.iconURL() })
						.setDescription('Obecny limit znaków to 1024 dla każdego pola.')
						.setThumbnail(inter.user.displayAvatarURL())],
				});
			}

			const img = inter.options.getAttachment('zdjęcie');
			if (img && !['image/png', 'image/jpeg'].includes(img.contentType)) {
				return inter.reply({ embeds: [
					new EmbedBuilder()
						.setColor('#0078FF')
						.setAuthor({ name: '❌ Nieprawidłowy obraz', iconURL: inter.guild.iconURL() })
						.setDescription('Załączony obraz ma niedozwolone rozszerzenie pliku. Przepraszamy.')
						.setThumbnail(inter.user.displayAvatarURL())],
				});
			}

			const data = await Announcements.create({ authorId: inter.user.id, announcement: { type, bio, desc, img: img ? img.url : null } });

			inter.user.send({ embeds: [
				new EmbedBuilder()
					.setColor('#00D26A')
					.setAuthor({ name: `Kopia Twojego ogłoszenia z ${inter.guild.name}`, iconURL: inter.guild.iconURL() })
					.addFields([
						{ name: '💗 » Kogo szukasz?', value: type },
						{ name: '📝 » Przedstaw się', value: bio },
						{ name: '📃 » Treść ogłoszenia', value: desc },
						{ name: '😉 » Dodany załącznik', value: `${img ? `[${img.name}](${img.url})` : 'Brak.' }` },
					])
					.setThumbnail(inter.user.displayAvatarURL())],
			});

			const review = inter.guild.channels.cache.get(process.env.CH_FORMULARZE);
			if (!review) {
				return inter.reply({ embeds: [
					new EmbedBuilder()
						.setColor('#F92F60')
						.setAuthor({ name: '❌ Coś poszło nie tak', iconURL: inter.guild.iconURL() })
						.setDescription('Wymagany kanał nie został odnaleziony. Skontaktuj się z administratorem.')],
				});
			}

			const reviewMsg = await review.send({
				content: `👑 » **Polecenia**\`\`\`${process.env.PREFIX}ogl add ${data.id}\n${process.env.PREFIX}ogl discard ${data.id} <Reason>\`\`\``,
				embeds: [
					new EmbedBuilder()
						.setColor('#00FF7E')
						.setAuthor({ name: `Nowe ogłoszenie do kontroli od ${inter.user.username}`, iconURL: inter.user.displayAvatarURL() })
						.addFields([
							{ name: '📄 » Informacje', value: `\`\`\`Użytkownik: ${inter.user.tag}\nID osoby: ${inter.user.id}\nDane MongoDB: ${moment(data.createdAt).format('HH:mm:ss, DD.MM.YYYY')}\`\`\`` },
							{ name: '💗 » Szuka', value: type },
							{ name: '📝 » Przedstaw się', value: bio },
							{ name: '📃 » Treść ogłoszenia', value: desc },
							{ name: '😉 » Załączony obraz', value: `${img ? `[${img.name}](${img.url}) (${img.height}x${img.width})` : 'Brak załączonego zdjęcia.'}` },
						])
						.setImage(img ? img.url : null),
				],
			});

			await data.updateOne({ 'discord.reviewId': reviewMsg.id });

			return inter.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#00D26A')
					.setAuthor({ name: 'Ogłoszenie zostało wysłane do kontroli ✔️', iconURL: inter.user.displayAvatarURL() })
					.setDescription('Twoje ogłoszenie oczekuje na sprawdzanie przez administrację. Damy Ci znać na PW, czy zostało ono opublikowane, czy też nie. Pamiętaj, aby mieć odpowiednio skonfigurowane ustawienia dot. prywatności. Dziękujemy!')
					.addFields([
						{
							name: '📃 » Dodatkowe informacje',
							value: 'Kopia ogłoszenia została wysłana do Ciebie na prywatne wiadomości, abyś miał(a) do niej późniejszy wygląd. Jeśli ją otrzymałeś - nie musisz przejmować się ustawieniami prywatności.',
						},
						{ name: '⚠️ » Uwaga', value: 'Osoby publikujące niewłaściwe ogłoszenia, będą karane!\n\n> Masz może jakieś pytania? Skontaktuj się z nami!' },
					])],
			});
		}

		if (sub === 'pomoc') {
			return inter.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#00FF2A')
					.setAuthor({ name: 'Pomoc dotycząca wystawiania ogłoszeń', iconURL: inter.user.displayAvatarURL() })
					.addFields([
						{ name: '1. Regulamin ogłoszeń', value: 'Na wstępie proszę zapoznać się z zasadami dostępnymi na naszym GitHubie.\n`[github.com/sefinek/Milosna_Grota](https://github.com/sefinek/Milosna_Grota/blob/main/Rules.md#ogloszenia)`' },
						{
							name: '2. Objaśnienie pól',
							value:
							'`kogo-szukasz` - Wpisz tutaj informacje o tym, kogo szukasz.\n' +
							'`przedstaw-się` - Imię, wiek, opis wizerunku lub charakteru itd.\n' +
							'`treść-ogłoszenia` - Informacje/wymagania na temat kogo szukasz\n' +
							'`zdjęcie` - Opcjonalnie załącz tutaj swoje zdjęcie.',
						},
						{ name: '3. Jak wystawić ogłoszenie?', value: 'Użyj następującego polecenia ukośników **/ogłoszenie dodaj**.' },
					])],
			});
		}
	},
};
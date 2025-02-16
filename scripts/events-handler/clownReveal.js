const { EmbedBuilder } = require('discord.js');
const d = require('../switch/time.js');

module.exports = async msg => {
	if (msg.attachments.size > 0) {
		try {
			await msg.react('😍');
			await msg.react('😕');

			const thread = await msg.startThread({ name: `[${msg.author.username}]: Komentarze`, reason: `Zdjęcie użytkownika ${msg.author.tag} (${msg.author.id}).`, autoArchiveDuration: 4320 });
			thread.send({ embeds: [
				new EmbedBuilder()
					.setFooter({ text: `Zdjęcie nadesłane przez: ${msg.author.tag}\nIdentyfikator: ${msg.author.id}\nLiczba załączników: ${msg.attachments.size}\nData i godzina: ${d('td')} roku` })],
			});
		} catch (err) {
			msg.channel.send({ embeds: [
				new EmbedBuilder()
					.setColor('#FF006C')
					.setAuthor({ name: `Coś poszło nie po naszej myśli ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })
					.setDescription('Niestety nie mogliśmy dodać Twojego zdjęcia na kanał. Skontaktuj się z administratorem, aby uzyskać pomoc. Przepraszamy za problemy.')],
			}).then(del => {
				msg.delete();
				setTimeout(() => del.delete(), 15000);
			});

			console.error(`EventM » Coś poszło nie tak podczas szykowania zdjęcia na kanale ${msg.channel.name}.`, err.message);
		}

		return;
	}

	msg.channel.send({ embeds: [new EmbedBuilder()
		.setColor('#004EFF')
		.setAuthor({ name: `Niestety ta akcja nie jest możliwa ${msg.author.username}`, iconURL: msg.guild.iconURL() })
		.setDescription('Publikowanie wiadomości na tym kanale (bez dołączonych obrazów) nie jest możliwe. Skomentuj dane zdjęcie w wątku. Życzymy Ci powodzenia!')
		.addFields([
			{ name: '» Jak prawidłowo opublikować swoje zdjęcie?', value: 'Po prostu wyślij je na ten kanał i dopisz do niego coś, jeśli chcesz.' },
		])
		.setThumbnail(msg.author.displayAvatarURL())],
	}).then(del => {
		msg.delete();
		setTimeout(() => del.delete(), 20000);

		console.log(`EventM » Użytkownik ${msg.author.tag} (${msg.author.id}) opublikował wiadomość na kanale ${msg.channel.name}. Treść:`, msg.content);
	});
};
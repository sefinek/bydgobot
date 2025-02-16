const { EmbedBuilder } = require('discord.js');

module.exports = async (msg, suggestions) => {
	msg.delete().catch(() => console.warn(`Server » Wiadomość autora na kanale ${suggestions.name} nie została usunięta`));

	const loading = await suggestions.send({ embeds: [
		new EmbedBuilder()
			.setAuthor({ name: `Propozycja od użytkownika ${msg.author.tag}`, iconURL: process.env.LOA })
			.setDescription('Trwa dodawanie propozycji...')
			.setThumbnail(msg.author.displayAvatarURL())],
	});

	try {
		const attachment = msg.attachments.first();

		await loading.react('1127481086499377282');
		await loading.react('1127457936629837845');
		await loading.react('1127481079620718635');

		await loading.startThread({ name: `[${msg.author.username}]: Skomentuj ją`, autoArchiveDuration: 4320, reason: `Użytkownik ${msg.author.tag} (${msg.author.id}) dodał nową propozycje na kanał.` });

		loading.edit({ embeds: [new EmbedBuilder()
			.setAuthor({ name: `Propozycja od użytkownika ${msg.author.tag}`, iconURL: msg.guild.iconURL() })
			.setDescription(msg.content)
			.setThumbnail(msg.author.displayAvatarURL())
			.setImage(attachment ? attachment.url : null)],
		});
	} catch (err) {
		loading.edit({ embeds: [new EmbedBuilder()
			.setAuthor({ name: `Propozycja od użytkownika ${msg.author.tag}`, iconURL: process.env.ERR })
			.setDescription('Przepraszamy, lecz coś poszło nie tak. Spróbuj ponownie.\nJeśli to możliwe, otrzymasz kopię swojej propozycji na PW.')
			.setThumbnail(msg.author.displayAvatarURL())],
		}).then(toDel => setTimeout(() => toDel.delete(), 15000));

		await msg.author.send(`📄 **Kopia twojej propozycji**\n\n» **Treść:**\n\`\`\`\n${msg.content}\`\`\`\n\n⚠️ Jeżeli problem nie ustaje, skontaktuj się z administratorem.`);

		return console.warn('Server » Coś poszło nie tak podczas dodawania nowej propozycji.', err.message);
	}

	console.log(`EventM » Nowa propozycja od użytkownika ${msg.author.tag} (${msg.author.id}), o treści:`, msg.content);
};
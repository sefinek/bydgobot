module.exports = (args, msg, EmbedBuilder) => {
	const text = args.slice(2).join(' ');
	if (!text) return msg.reply(`<a:error:1127481079620718635> **Brak treści**\nPodaj dla nas informacje, ile surowcy chcesz wymienić oraz inne opcjonalne wymagania.\n\n> **${process.env.PREFIX}miner** kup 1 <Wiadomość>`);
	if (text.length < 2) return msg.reply('<a:error:1127481079620718635> **Zbyt krótkie**\nTwoja wprowadzona treść jest zbyt krótka. Wzbogać swoją wypowiedź.');

	msg.guild.channels.cache.get('1127713484394741863').send({ embeds: [
		new EmbedBuilder()
			.setColor('#F3AD61')
			.setAuthor({ name: '🍮 Żądana wymiana surowca na kremówki', iconURL: msg.author.displayAvatarURL() })
			.addFields([
				{ name: '🤔・Użytkownik', value: `> ${msg.author}`, inline: true },
				{ name: '🔢・Identyfikator', value: `> ${msg.author.id}`, inline: true },
				{ name: '📄・Treść wiadomości', value: `\`\`\`${text}\`\`\`` },
			])],
	});

	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Wymiana surowca na kremówki', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Gratulacje! Wymiana została zlecona. Poczekaj aż administrator rozpatrzy Twoje zamówienie. Stan ekwipunku na razie nie uległ zmianie.')
			.addFields([{ name: '📄・Treść wiadomości', value: `> ${text}` }])],
	});
};
module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	const { price } = await Items.findOne({ id: 5 });

	if (memberDb.miner.stick < price.stick || memberDb.miner.stone < price.stone || memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, by dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.stick}** 🪓 ┃ **${memberDb.miner.stone}** 🪨 ┃ **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.stick - memberDb.miner.stick < 0 ? '0' : price.stick - memberDb.miner.stick}** 🪓 ┃ **${price.stone - memberDb.miner.stone < 0 ? '0' : price.stone - memberDb.miner.stone}** 🪨 ┃ **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	const text = args.slice(2).join(' ');
	if (!text) return msg.reply(`<a:error:1127481079620718635> **Brak wiadomości**\nZrozumiano! Czy mogę prosić Cię o podanie konkretów odnośnie do tego zamówienia?\n\n> **${process.env.PREFIX}miner** kup 3 <Wiadomość>`);

	msg.guild.channels.cache.get('1127713484394741863').send({ embeds: [
		new EmbedBuilder()
			.setColor('#009CFF')
			.setAuthor({ name: 'Przypięcie wiadomości na kanale chłopaka, dziewczyny przyjaciela', iconURL: msg.author.displayAvatarURL() })
			.addFields([
				{ name: '🤔 Użytkownik', value: `> ${msg.author}`, inline: true },
				{ name: '🔢 Identyfikator', value: `> ${msg.author.id}`, inline: true },
				{ name: '📄・Treść wiadomości', value: `> ${text}` },
			])],
	});

	await memberDb.updateOne({ $set: { 'miner.stick': memberDb.miner.stick - price.stick, 'miner.stone': memberDb.miner.stone - price.stone, 'miner.diamond': memberDb.miner.diamond - price.diamond } });

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Przypięcie wiadomości na kanale chłopaka, dziewczyny przyjaciela', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Powodzenie! Poczekaj aż administrator rozpatrzy Twoje zamówienie.')
			.addFields([
				{ name: '» Transakcja', value: `> **-${price.stick}** 🪓\n> **-${price.stone}** 🪨\n> **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.stick}** 🪓\n> **${miner.stone}** 🪨\n> **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
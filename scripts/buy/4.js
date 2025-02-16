module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	const { price } = await Items.findOne({ id: 4 });

	if (memberDb.miner.wood < price.wood || memberDb.miner.stick < price.stick) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, by dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.wood}** 🪵 ┃ **${memberDb.miner.stick}** 🪓`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.wood - memberDb.miner.wood < 0 ? '0' : price.wood - memberDb.miner.wood}** 🪓 ┃ **${price.stick - memberDb.miner.stick < 0 ? '0' : price.stick - memberDb.miner.stick}** 🪓`, inline: true },
				])],
		});
	}

	const text = args.slice(2).join(' ');
	if (!text) return msg.reply(`<a:error:1127481079620718635> **Brak wiadomości**\nZrozumiano! Czy mogę prosić Cię o podanie konkretów odnośnie do tego zamówienia?\n\n> **${process.env.PREFIX}miner** kup 4 <Wiadomość>`);

	msg.guild.channels.cache.get('1127713484394741863').send({ embeds: [
		new EmbedBuilder()
			.setColor('#009CFF')
			.setAuthor({ name: 'Przypięcie wiadomości z partnerstwem na kanale partnerstwa', iconURL: msg.author.displayAvatarURL() })
			.addFields([
				{ name: '🤔 Użytkownik', value: `> ${msg.author}`, inline: true },
				{ name: '🔢 Identyfikator', value: `> ${msg.author.id}`, inline: true },
				{ name: '📄・Treść wiadomości', value: `> ${text}` },
			])],
	});

	await memberDb.updateOne({ $set: { 'miner.wood': memberDb.miner.wood - price.wood, 'miner.stick': memberDb.miner.stick - price.stick } });

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Przypięcie wiadomości z partnerstwem na kanale partnerstwa', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Powodzenie! Poczekaj aż administrator rozpatrzy Twoje zamówienie.')
			.addFields([
				{ name: '» Transakcja', value: `> **-${price.wood}** 🪵\n> **-${price.stick}** 🪓`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.wood}** 🪵\n> **${miner.stick}** 🪓`, inline: true },
			])],
	});
};
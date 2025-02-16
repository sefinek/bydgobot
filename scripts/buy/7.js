module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	if (msg.member.roles.cache.has('1127716303084474469')) return msg.reply('<a:error:1127481079620718635> Dokonałeś już wcześniej zakupu tego przedmiotu.');

	const { price } = await Items.findOne({ id: 7 });
	if (memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości surowca, by dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	await memberDb.updateOne({ $set: { 'miner.diamond': memberDb.miner.diamond - price.diamond } });
	msg.member.roles.add('1127716303084474469');

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Zakup roli Pogromca Diaxów', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Dokonano zakupu! Rola została Ci już nadana, a odliczona ilość surowców zabrana.')
			.addFields([
				{ name: '» Transakcja', value:   `> **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
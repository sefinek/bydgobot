module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	if (msg.member.roles.cache.has('1127712739754770512')) return msg.reply('<a:error:1127481079620718635> Dokonałeś już wcześniej zakupu tego przedmiotu.');

	const { price } = await Items.findOne({ id: 8 });
	if (memberDb.miner.gold < price.gold || memberDb.miner.iron < price.iron || memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, aby dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.gold}** 🪙 ┃ **${memberDb.miner.iron}** 💮 ┃ **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.gold - memberDb.miner.gold < 0 ? '0' : price.gold - memberDb.miner.gold}** 🪙 ┃ **${price.iron - memberDb.miner.iron < 0 ? '0' : price.iron - memberDb.miner.iron}** 💮 ┃ **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	await memberDb.updateOne({ $set: { 'miner.gold': memberDb.miner.gold - price.gold, 'miner.iron': memberDb.miner.iron - price.iron, 'miner.diamond': memberDb.miner.diamond - price.diamond } });
	msg.member.roles.add('1127712739754770512');

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Zakup roli Król Bydogszczy', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Dokonano zakupu! Rola została Ci już nadana, a odliczona ilość surowców zabrana.')
			.addFields([
				{ name: '» Transakcja', value:   `> **-${price.gold}** 🪙 ┃ **-${price.iron}** 💮 ┃ **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value:  `> **${miner.gold}** 🪙 ┃ **${miner.iron}** 💮 ┃ **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
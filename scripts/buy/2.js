module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	if (msg.member.roles.cache.has('1127711605753380885')) return msg.reply('<a:error:1127481079620718635> Dokonałeś już wcześniej zakupu tego przedmiotu.');

	const { price } = await Items.findOne({ id: 2 });
	if (memberDb.miner.wood < price.wood || memberDb.miner.stick < price.stick || memberDb.miner.stone < price.stone || memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, aby dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.wood}** 🪵 ┃ **${memberDb.miner.stick}** 🪓\n> **${memberDb.miner.stone}** 🪨 ┃ **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.wood - memberDb.miner.wood < 0 ? '0' : price.wood - memberDb.miner.wood}** 🪵 ┃ **${price.stick - memberDb.miner.stick < 0 ? '0' : price.stick - memberDb.miner.stick}** 🪓\n> **${price.stone - memberDb.miner.stone < 0 ? '0' : price.stone - memberDb.miner.stone}** 🪨 ┃ **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	await memberDb.updateOne({ $set: { 'miner.stone': memberDb.miner.stone - price.stone, 'miner.gold': memberDb.miner.gold - price.gold, 'miner.iron': memberDb.miner.iron - price.iron, 'miner.diamond': memberDb.miner.diamond - price.diamond } });
	msg.member.roles.add('1127711605753380885');

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Rola Posejdon', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Pomyślnie dokonano zakupu. Rola <@&1127711605753380885> została Ci nadana.')
			.addFields([
				{ name: '» Transakcja', value: `> **-${price.stone}** 🪨\n> **-${price.gold}** 🪙\n> **-${price.iron}** 💮\n> **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.stone}** 🪨\n> **${miner.gold}** 🪙\n> **${miner.iron}** 💮\n> **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
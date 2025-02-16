module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	if (msg.member.roles.cache.has('1127719481532227634')) return msg.reply('<a:error:1127481079620718635> Dokonałeś już wcześniej zakupu tego przedmiotu.');

	const { price } = await Items.findOne({ id: 6 });
	if (memberDb.miner.stone < price.stone || memberDb.miner.gold < price.gold || memberDb.miner.iron < price.iron || memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, aby dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.stone}** 🪨 ┃ **${memberDb.miner.gold}** 🪙\n> **${memberDb.miner.iron}** 💮 ┃ **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.stone - memberDb.miner.stone < 0 ? '0' : price.stone - memberDb.miner.stone}** 🪨 ┃ **${price.gold - memberDb.miner.gold < 0 ? '0' : price.gold - memberDb.miner.gold}** 🪙\n> **${price.iron - memberDb.miner.iron < 0 ? '0' : price.iron - memberDb.miner.iron}** 💮 ┃ **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	await memberDb.updateOne({ $set: { 'miner.stone': memberDb.miner.stone - price.stone, 'miner.gold': memberDb.miner.gold - price.gold, 'miner.iron': memberDb.miner.iron - price.iron, 'miner.diamond': memberDb.miner.diamond - price.diamond } });
	msg.member.roles.add('1127719481532227634');

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Rola Pingwiniarz', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Pomyślnie dokonano zakupu. Rola <@&1127719481532227634> została Ci nadana.')
			.addFields([
				{ name: '» Transakcja', value: `> **-${price.stone}** 🪨\n> **-${price.gold}** 🪙\n> **-${price.iron}** 💮\n> **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.stone}** 🪨\n> **${miner.gold}** 🪙\n> **${miner.iron}** 💮\n> **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
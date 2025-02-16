module.exports = async (args, msg, EmbedBuilder, memberDb, Items, Members) => {
	const { price } = await Items.findOne({ id: 3 });

	if (memberDb.miner.stone < price.stone || memberDb.miner.gold < price.gold || memberDb.miner.iron < price.iron || memberDb.miner.diamond < price.diamond) {
		return msg.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0084CE')
				.setAuthor({ name: '❌ Niewystarczająca kwota', iconURL: msg.author.displayAvatarURL() })
				.setDescription('Nie posiadasz odpowiedniej ilości jednego z surowców, by dokonać zakupu.')
				.addFields([
					{ name: '» Saldo', value: `> **${memberDb.miner.stone}** 🪓 ┃ **${memberDb.miner.gold}** 🪙\n> **${memberDb.miner.iron}** 💮 ┃ **${memberDb.miner.diamond}** 💎`, inline: true },
					{ name: '» Potrzebujesz', value: `> **${price.stone - memberDb.miner.stone < 0 ? '0' : price.stone - memberDb.miner.stone}** 🪨 ┃ **${price.gold - memberDb.miner.gold < 0 ? '0' : price.gold - memberDb.miner.gold}** 🪙\n> **${price.iron - memberDb.miner.iron < 0 ? '0' : price.iron - memberDb.miner.iron}** 💮 ┃ **${price.diamond - memberDb.miner.diamond < 0 ? '0' : price.diamond - memberDb.miner.diamond}** 💎`, inline: true },
				])],
		});
	}

	await memberDb.updateOne({ $set: { 'miner.stone': memberDb.miner.stone - price.stone, 'miner.gold': memberDb.miner.gold - price.gold, 'miner.iron': memberDb.miner.iron - price.iron, 'miner.diamond': memberDb.miner.diamond - price.diamond } });

	await msg.author.send({ embeds: [
		new EmbedBuilder()
			.setColor('#00CCFF')
			.setAuthor({ name: 'Easter eggi', iconURL: msg.author.displayAvatarURL() })
			.setDescription(
				'**1.** https://noel.sefinek.net/.env\n' +
			'**2.** https://noel.sefinek.net/config.json\n' +
			'**3.** https://noel.sefinek.net/wp-config.php (nie działa ze względu na zabezpieczenia [Cloudflare](https://www.cloudflare.com))\n' +
			'**4.** https://kremowka.sefinek.net/kremowka\n' +
			'> **Kliknij następujące litery lub znaki na stronie powyżej.**\n' +
			'- W `i`mieniu naszego kraju ogłaszam...\n' +
			'- Copyright 2022 © by Sefinek. All Rights Reserved`.`'
			)],
	});

	const { miner } = await Members.findOne({ userId: msg.author.id });
	msg.reply({ embeds: [
		new EmbedBuilder()
			.setColor('#00D26A')
			.setAuthor({ name: '✔️️ Odkrycie wszystkich easter eggów na naszych stronach www', iconURL: msg.author.displayAvatarURL() })
			.setDescription('Pomyślnie dokonano zakupu. Sprawdź swoje prywatne wiadomości!')
			.addFields([
				{ name: '» Transakcja', value: `> **-${price.stone}** 🪨\n> **-${price.gold}** 🪙\n> **-${price.iron}** 💮\n> **-${price.diamond}** 💎`, inline: true },
				{ name: '» Obecne saldo', value: `> **${miner.stone}** 🪨\n> **${miner.gold}** 🪙\n> **${miner.iron}** 💮\n> **${miner.diamond}** 💎`, inline: true },
			])],
	});
};
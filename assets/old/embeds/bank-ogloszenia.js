const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'bank',
	admin: true,
	execute: (client, msg) => {
		msg.delete();

		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#00bb7c')
				.setAuthor({ name: 'Jeżeli chcesz wziąć pożyczkę, musisz', iconURL: msg.guild.iconURL() })
				.setDescription('**Napisać:** „Proszę Pożyczkę o kwocie (55000 [KRM]) do dnia 00.00.0000 <@917778912883396659>”')
				.addFields([
					{
						name: '» I znać poniższe podpunkty',
						value: '**1.** Pożyczkę można wziąć maksymalnie do kwoty 55000 KRM.\n' +
					'**2.** Pamiętaj, aby spłacić pożyczkę w wyznaczonym terminie.\n' +
					'**3.** Za niespłacenie pożyczki zostanie nałożona na Ciebie kara o wysokości od 2500 do 15000 KRM!\n' +
					'**4.** Codziennie zostają doliczanie odsetki. Zależnie od kwoty!\n' +
					'**5.** Prosze nie kłócić się z administracją.\n\n' +
					'> KRM lub <:kremowka:1127459149899366550> = Kremówki\n' +
					'> Bank Papieżak Poleca „Liczą się tylko kremówki”',
					},
				])],
		});
	},
};
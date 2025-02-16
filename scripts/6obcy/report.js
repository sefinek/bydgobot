module.exports = async (client, inter, EmbedBuilder, WebhookClient) => {
	const webhook = new WebhookClient({ url: process.env.BYDGO_LOGS });

	await webhook.send({ embeds: [new EmbedBuilder()
		.setColor('#FF6723')
		.setAuthor({ name: `🟠 Zgłoszenie od użytkownika ${inter.user.tag}`, iconURL: inter.guild.iconURL() })
		.setDescription('Żądana zmiana adresu IP internetu.')
		.addFields([
			{ name: '» ID użytkownika', value: `> ${inter.user.id}`, inline: true },
			{ name: '» ID serwera', value: `> ${inter.guild.id}`, inline: true },
		])
		.setThumbnail(inter.user.displayAvatarURL())
		.setFooter({ text: `Serwer ${inter.guild.name}`, iconURL: inter.guild.iconURL() })],
	});

	inter.channel.send({ embeds: [new EmbedBuilder()
		.setColor('#00D26A')
		.setAuthor({ name: '✔️️ Dziękujemy za zgłoszenie', iconURL: inter.user.displayAvatarURL() })
		.setDescription('Administrator został powiadomiony o tej sytuacji. Możesz się teraz rozłączyć z obcym.')
		.addFields([
			{
				name: '» Dodatkowa informacja',
				value:
                    'Czasami nasz [adres IP](https://pl.wikipedia.org/wiki/Adres_IP) może znajdować się na czarnej liście serwisu [6obcy](https://6obcy.org), dlatego do rozmów są przydzielane boty.\n' +
                    'Nie korzystamy z żadnego serwera [proxy](https://pl.wikipedia.org/wiki/Serwer_po%C5%9Brednicz%C4%85cy), więc z tego powodu musimy ręcznie zmieniać IP od czasu do czasu. Prosimy o wyrozumiałość.',
			},
			{
				name: '» Co będzie dalej?',
				value: 'Jeżeli rzeczywiście połączyłeś się z botem a nie z obcym, zmienimy nasz adres IP. Bot będzie wtedy niedostępny na kilkanaście sekund.',
			},
		])],
	});
};
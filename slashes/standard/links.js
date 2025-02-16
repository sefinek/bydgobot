const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('linki')
		.setDescription('Lista przydatnych linków.'),
	execute(client, inter) {
		inter.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0AA2BF')
				.setAuthor({ name: 'Zbiór przydatnych linków', iconURL: inter.guild.iconURL(), url: process.env.URL_SEFINEK })

				.addFields([
					{ name: '» Serwer wsparcia', value: `> [\`Kliknij tutaj\`](${process.env.URL_SEFINEK}/support)`, inline: true },
					{ name: '» Oficjalna strona', value: `> [\`Kliknij tutaj\`](${process.env.URL_SEFINEK})`, inline: true },
					{ name: '» Dodaj Noel lub Skiffy', value: `> [\`Kliknij tutaj\`](${process.env.URL_SEFINEK}/add)`, inline: true },

					{ name: '» Testowa wersja Skiffy', value: `> [\`Kliknij tutaj\`](${process.env.URL_NOEL})`, inline: true },
					{ name: '» Info o LabyBOT', value: `> [\`Kliknij tutaj\`](${process.env.URL_SEFINEK}/labybot)`, inline: true },
					{ name: '» Strona statusu', value: `> [\`Kliknij tutaj\`](${process.env.URL_STATUS})`, inline: true },

					{
						name: '» Nasze zaufane domeny oraz subdomeny',
						value:
						`• [\`sefinek.net/skiffy\`](${process.env.URL_SEFINEK}) » Główna domena, z której obecnie korzystamy.\n` +
						`• [\`api.sefinek.net\`](${process.env.URL_API}) » Darmowy interfejs API dla programistów.`,
					},
					{
						name: '» Pozostałe adresy URL',
						value:
						`• [\`sefinek.net/skiffy/datadog\`](${process.env.URL_SEFINEK}/datadog) » Statystyki hosta - użycie CPU, RAM itd.\n` +
						'• [`trello.com/b/v4r9fmHL`](https://trello.com/b/v4r9fmHL) » Tablica na Trello.\n' +
						`• [\`discord.gg/CR9dGgdtVP\`](${process.env.URL_SKIFFY_SUPPORT}) » Stary (informacyjny) serwer wsparcia botów.`,
					},
				])],
		});
	},
};
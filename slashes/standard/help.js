const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, version } = require('discord.js');
const commands = require('../../scripts/commands.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pomoc')
		.setDescription('Dzięki tej komendzie uzyskasz wszystkie informacje związane z botem wykonanym pod ten serwer itp.'),
	async execute(client, inter) {
		const buttons = new ActionRowBuilder().addComponents([
			new ButtonBuilder({
				label: 'Oficjalna witryna',
				url: process.env.URL_SEFINEK,
				style: ButtonStyle.Link,
				emoji: { id: '914623706880413726' },
			}),
			new ButtonBuilder({
				label: 'Statystyki Noel',
				url: `${process.env.URL_NOEL}/stats`,
				style: ButtonStyle.Link,
				emoji: { id: '914623706532294727' },
			}),
			new ButtonBuilder({
				label: 'Strona statusu',
				url: process.env.URL_STATUS,
				style: ButtonStyle.Link,
				emoji: { id: '914623706842681364' },
			}),
		]);

		const owner = client.users.cache.get(process.env.BOT_OWNER);

		await inter.reply({
			embeds: [
				new EmbedBuilder()
					.setColor('#1EA4DB')
					.setAuthor({ name: `Polecenie pomocy serwerowego bota ${client.user.username}`, iconURL: inter.guild.iconURL(), url: process.env.URL_SEFINEK })
					.addFields([
						{ name: '» Właściciel serwera', value: `> ${owner}`, inline: true },
						{ name: '» Twórca Skiffy & Laby', value: `> ${owner}`, inline: true },
						{ name: '» Powstania serwera', value: '> 14.12.2022 r.', inline: true },

						{ name: '» Wersja klienta', value: `> ${client.version}`, inline: true },
						{ name: '» Node.js', value: `> ${process.version}`, inline: true },
						{ name: '» Discord.js', value: `> v${version}`, inline: true },

						{ name: '» Polecenia tego bota', value: commands.bot.join('\n') },
						{ name: '» Komendy informacyjne', value: commands.project.join('\n') },

						{
							name: '» Warte uwagi boty',
							value:
							`<@1078395610375409856> • [Strona bota](${process.env.URL_NOEL}) • [Dodaj na serwer](${process.env.URL_NOEL}/add)\n` +
							'Działająca wersja testowa bota Skiffy. Więcej informacji uzyskasz na stronie www.\n\n' +

							`<@893234608747999233> • [Strona bota](${process.env.URL_SEFINEK})\n` +
							'Nieopublikowana wersja odświeżona LabyBOT\'a z panelem i nie tylko. Projekt anulowany.\n\n' +

							`<@546058545917984769> • [Więcej informacji](${process.env.URL_SEFINEK}/labybot) • [Dodaj na serwer](https://discord.com/oauth2/authorize?client_id=546058545917984769&permissions=8&scope=bot) • [Zagłosuj (Top.gg)](https://top.gg/bot/546058545917984769/vote)\n` +
							'„Niewspierany” już bot, który powinien być offline i w sumie to jest nadal...',
						},
					])
					.setFooter({ text: `Ping: ${Math.floor(client.ws.ping)}ms • Użycie RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)} MB • Copyright 2022 © by ${owner.tag}`, iconURL: client.user.displayAvatarURL() }),
			], components: [buttons],
		});
	},
};
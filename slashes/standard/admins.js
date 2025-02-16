const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admini')
		.setDescription('Spis administracji całego projektu Skiffy oraz serwera.'),
	execute(client, inter) {
		const owners = inter.guild.roles.cache.get(process.env.RO_WLASCICIEL).members.map(m => m);
		const admins = inter.guild.roles.cache.get(process.env.RO_ADMIN).members.map(m => m);
		const mods = inter.guild.roles.cache.get(process.env.RO_MODERATOR).members.map(m => m);
		const helpers = inter.guild.roles.cache.get(process.env.RO_POMOCNIK).members.map(m => m);

		inter.reply({
			embeds: [
				new EmbedBuilder()
					.setColor('#0AA2BF')
					.setAuthor({ name: 'Spis administracji serwera i bota', iconURL: inter.guild.iconURL(), url: process.env.URL_SEFINEK })
					.addFields([
						{
							name: `👑 » Właściciele (${owners.length})`,
							value: owners.join(', ') || 'Brak. Dziwne. Coś musiało pójść nie tak.',
						},
						{ name: `💥 » Administracja (${admins.length})`, value: admins.join(', ') || 'Brak administracji.' },
						{ name: `🛡️ » Moderacja (${mods.length})`, value: mods.join(', ') || 'Brak moderacji.' },
						{ name: `🍀 » Pomocnicy (${helpers.length})`, value: helpers.join(', ') || 'Brak pomocników.' },
						{
							name: '✨ » Twórca LabyBOT, Noel™, Skiffy i BydgoBOT 😻',
							value: `[Zespół wsparcia | Noel™ - Wersja testowa bota Skiffy](${process.env.URL_NOEL}/admins).`,
						},
					]),
			],
		});
	},
};
const { EmbedBuilder } = require('discord.js');
const { exec } = require('node:child_process');
const { cpu } = require('node-os-utils');
const getChannels = require('./scripts/getChannel.js');
const d = require('../scripts/switch/time.js');
const Members = require('../database/models/Members');

module.exports = async client => {
	const { raport } = getChannels();

	const loading = await raport.send({ embeds: [new EmbedBuilder().setColor('#4169E1').setAuthor({ name: 'Trwa wykonywanie diagnostyki...', iconURL: process.env.LOA })] });
	console.log(`CronEx » ------------------------------------- ${d('td')} -------------------------------------`);

	exec('speedtest', async (err, stdout) => {
		if (err) {
			loading.edit({ embeds: [new EmbedBuilder().setColor('#F92F60').addFields([{ name: '❌ Coś poszło nie tak', value: `\`\`\`${err.length >= 1024 ? 'Błąd jest za długi.' : `js\n${err}`}\`\`\`` }])] });

			return console.error(err);
		}

		const wrfNotify1 = await Members.find({ wrfNotify: 1 });
		const wrfNotify2 = await Members.find({ wrfNotify: 2 });

		loading.edit({ embeds: [new EmbedBuilder()
			.setColor('#39A9FF')
			.setAuthor({ name: `Wygenerowano raport z godziny ${d('td')}`, iconURL: 'https://noel.sefinek.net/favicon.ico' })
			.addFields([
				{ name: '» Test szybkości łącza internetowego', value: stdout.length >= 1024 ? 'Wyjście danych jest za długie.' : stdout },
				{ name: '» Ping API bota', value: `> ${Math.floor(client.ws.ping)}ms`, inline: true },
				{ name: '» Użycie CPU', value: `> ${await cpu.usage()}%`, inline: true },
				{ name: '» Zużycie pamięci', value: `> ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)} MB`, inline: true },
				{ name: '» Niezweryfikowane osoby', value: `> ${wrfNotify1 ? wrfNotify1.length : '❓'}`, inline: true },
				{ name: '» Wyrzuceni członkowie', value: `> ${wrfNotify2 ? wrfNotify2.length : '❓'}`, inline: true },
			])],
		});
	});
};
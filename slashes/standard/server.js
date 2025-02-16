const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Server = require('../../database/models/Guilds');
const Members = require('../../database/models/Members');
const Announcements = require('../../database/models/Announcements');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serwer')
		.setDescription('Uzyskaj informacje na temat tego serwera związane z naszym botem.'),
	async execute(client, inter) {
		const serverDb = await Server.findOne({ guildId: inter.guild.id });
		if (!serverDb) {
			await inter.editReply('❌ **Wystąpił fatalny błąd**\nWymagane dane w bazie nie zostały odnalezione. Zgłoś ten błąd administratorowi.');
			console.error('Server » serverDb is undefined or null');
		}

		const memBydTrue = await Members.find({ bydgoszcz: true });
		const memBydFalse = await Members.find({ bydgoszcz: false });
		const anns = await Announcements.find({});

		const strazBydgoska = inter.guild.roles.cache.get(process.env.NODE_ENV === 'production' ? '1127462608883171478' : '994651848881492048').members.map(m => m);
		const kierownikDarkweba = inter.guild.roles.cache.get(process.env.NODE_ENV === 'production' ? '1127475996849877022' : '994651893383057509').members.map(m => m);
		const darkweber = inter.guild.roles.cache.get(process.env.NODE_ENV === 'production' ? '1121994541973647381' : '994651933505765456').members.map(m => m);


		inter.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0074BA')
				.setAuthor({ name: inter.guild.name, iconURL: inter.guild.iconURL(), url: process.env.URL_SEFINEK })
				.addFields([
					{ name: '🌍 » Rekord online', value: `> ${serverDb.onlineRecord}`, inline: true },
					{ name: '🤖 » CleverBot', value: `> ${serverDb.cleverbot ? '<a:success:1127481086499377282> Włączony' : '<a:error:1127481079620718635> Wyłączony'}`, inline: true },
					{ name: '💗 » Liczba ogłoszeń', value: `> ${anns.length}`, inline: true },

					{ name: '🐂 » Suma więźniów Choroszczy', value: `> ${memBydTrue.length}`, inline: true },
					{ name: '🤕 » Uciekinierzy z Choroszczy', value: `> ${memBydFalse.length}`, inline: true },

					{ name: `👹 » Strażnicy Choroszczy (${strazBydgoska.length})`, value: strazBydgoska.join(', ') || 'Brak strażników.' },
					{ name: `🪄 » Kierownicy dark weba (${kierownikDarkweba.length})`, value: kierownikDarkweba.join(', ') || 'Brak kierowników.' },
					{ name: `🌏 » Posada dark webera (${darkweber.length})`, value: darkweber.join(', ') || 'Brak osób.' },
				])],
		});
	},
};
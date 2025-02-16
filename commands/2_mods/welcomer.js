const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const Servers = require('../../database/models/Guilds');

module.exports = {
	name: 'welcomer',
	execute: async (client, msg) => {
		if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return msg.reply('<a:error:1127481079620718635> Nie posiadasz uprawnień **Zarządzanie kanałami**.');

		const serverDb = await Servers.findOne({ guildId: msg.guild.id });
		if (!serverDb) return msg.reply('❌ Brak informacji o serwerze w bazie danych.');

		if (serverDb.welcomer) {
			await serverDb.updateOne({ welcomer: false });

			msg.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#F04947')
					.setAuthor({ name: 'Wiadomości powitalne zostały wyłączone', iconURL: process.env.ERR })],
			});
		} else {
			await serverDb.updateOne({ welcomer: true });

			msg.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#43B481')
					.setAuthor({ name: 'Wiadomości powitalne zostały włączone', iconURL: process.env.SUC })],
			});
		}
	},
};
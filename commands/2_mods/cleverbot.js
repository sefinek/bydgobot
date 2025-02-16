const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const Servers = require('../../database/models/Guilds');

module.exports = {
	name: 'cleverbot',
	execute: async (client, msg) => {
		if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return msg.reply('<a:error:1127481079620718635> Nie posiadasz uprawnień **Zarządzanie kanałami**.');

		const serverDb = await Servers.findOne({ guildId: msg.guild.id });
		if (!serverDb) return msg.reply('❌ Brak informacji o serwerze w bazie danych.');

		if (serverDb.cleverbot) {
			await serverDb.updateOne({ cleverbot: false });

			msg.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#F04947')
					.setAuthor({ name: 'CleverBot został wyłączony', iconURL: process.env.ERR })],
			});
		} else {
			await serverDb.updateOne({ cleverbot: true });

			msg.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#43B481')
					.setAuthor({ name: 'CleverBot został włączony', iconURL: process.env.SUC })],
			});
		}
	},
};
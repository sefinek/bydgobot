const { Events } = require('discord.js');
const checkMessage = require('../scripts/checkMessage.js');

module.exports = {
	name: Events.MessageUpdate,
	async execute(_, newMsg, client) {
		if (newMsg.guild && (newMsg.guild.id !== process.env.GUILD_ID || newMsg.author.bot)) return;

		await checkMessage(client, newMsg, 'update');
	},
};
const { Events } = require('discord.js');
const CleverBot = require('@sefinek/cleverbot-free');
const Server = require('../database/models/Guilds');
const context = [];

module.exports = {
	name: Events.MessageCreate,
	env: process.env.NODE_ENV,
	async execute(msg) {
		const serverDb = await Server.findOne({ guildId: msg.guild.id });
		if (msg.author.bot || msg.channel.id !== process.env.CH_CLEVER_BOT || !msg.content.length || !serverDb.cleverbot) return;

		await msg.channel.sendTyping();

		try {
			const res = await CleverBot.interact(msg.content, context, 'pl');

			context.push(msg.content);
			context.push(res);

			msg.reply(res);
		} catch (err) {
			msg.reply(`❌ **To nie jest wina bota tylko www.cleverbot.com**\n> ${err.message}`);

			console.error(err);
		}
	},
};
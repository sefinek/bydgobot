const { Schema, model } = require('mongoose');

const Guilds = new Schema({
	guildId: { type: String, default: process.env.GUILD_ID, required: true },
	onlineRecord: { type: Number, default: 0 },
	welcomer: { type: Boolean, default: false },
	cleverbot: { type: Boolean, default: true },
}, { versionKey: false });

module.exports = model('servers', Guilds);
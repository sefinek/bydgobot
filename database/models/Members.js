const { Schema, model } = require('mongoose');

const Members = new Schema({
	userId: { type: String, required: true },
	bydgoszcz: { type: Boolean, default: false },
	wrfNotify: { type: Number, default: 0 },
	miner: {
		wood: { type: Number, default: 0 },
		stick: { type: Number, default: 0 },
		stone: { type: Number, default: 0 },
		gold: { type: Number, default: 0 },
		iron: { type: Number, default: 0 },
		diamond: { type: Number, default: 0 },
	},
}, { timestamps: true, versionKey: false });

module.exports = model('members', Members);
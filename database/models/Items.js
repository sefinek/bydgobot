const { Schema, model } = require('mongoose');

const Items = new Schema({
	id: { type: Number, required: true },
	name: { type: String, default: '' },
	description: { type: String, default: '' },
	price: {
		wood: { type: Number, default: 0 },
		stick: { type: Number, default: 0 },
		stone: { type: Number, default: 0 },
		gold: { type: Number, default: 0 },
		iron: { type: Number, default: 0 },
		diamond: { type: Number, default: 0 },
	},
}, { versionKey: false });

module.exports = model('items', Items);
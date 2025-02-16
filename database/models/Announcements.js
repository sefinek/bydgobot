const { Schema, model } = require('mongoose');

const Announcements = new Schema({
	authorId: { type: String, required: true },
	adminId: { type: String, default: null },
	status: { type: Number, default: 201 },
	canceledStr: { type: String, default: null },
	discord: {
		messageId: { type: String, default: null },
		reviewId: { type: String, default: null },
	},
	announcement: {
		type: { type: String, default: null },
		bio: { type: String, default: null },
		desc: { type: String, default: null },
		img: { type: String, default: null },
	},
}, { timestamps: true, versionKey: false });

module.exports = model('announcements', Announcements);
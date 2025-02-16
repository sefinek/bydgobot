const { Events } = require('discord.js');
const checkMessage = require('../scripts/checkMessage.js');
const handleClownReveal = require('../scripts/events-handler/clownReveal.js');
const handleAboutMe = require('../scripts/events-handler/aboutMe.js');
const handleLookingFor = require('../scripts/events-handler/lookingFor.js');
const handleChannels = require('../scripts/events-handler/channels.js');
const handleAnnouncements = require('../scripts/events-handler/announcements.js');
const handleSuggestions = require('../scripts/events-handler/suggestions.js');

module.exports = {
	name: Events.MessageCreate,
	env: process.env.NODE_ENV,
	async execute(msg, client) {
		if (msg.guild && (msg.guild.id !== process.env.GUILD_ID || msg.author.bot)) return;

		// 🧹 Auto-mod
		const AutoMod = await checkMessage(client, msg, 'create');
		if (AutoMod && msg.channel.id === process.env.CH_PROPOZYCJE) return;

		// 「📣」ogłoszenia
		if (msg.channel.id === process.env.CH_OGLOSZENIA) return handleAnnouncements(msg);

		// 「✅」propozycje
		const suggestions = await msg.guild.channels.cache.get(process.env.CH_PROPOZYCJE);
		if (suggestions && (msg.channel.id === suggestions.id && msg.content !== `${process.env.PREFIX}sug`)) await handleSuggestions(msg, suggestions);

		// 「📸」pokaż-się
		if (msg.channel.id === process.env.CH_POKAZ_RYJEK) return handleClownReveal(msg);

		// 「😽」przedstaw-się
		if (msg.channel.id === process.env.CH_PRZEDSTAW_SIE) return handleAboutMe(msg);

		// 「🌈」kogoś-lgbt 「✨」chłopaka 「💙」dziewczyny 「😊」przyjaciela 「😻」przyjaciółki
		if ([process.env.CH_KOGOS_LGBT, process.env.CH_CHLOPAKA, process.env.CH_DZIEWCZYNY, process.env.CH_PRZYJACIELA, process.env.CH_PRZYJACIOLKI].includes(msg.channel.id)) return handleLookingFor(msg);

		// 「😂」memy 「💻」pokaż-pulpit
		if ([process.env.CH_MEMY, process.env.CH_POKAZ_PULPIT].includes(msg.channel.id) && msg.attachments.size > 0) return handleChannels(msg);
	},
};

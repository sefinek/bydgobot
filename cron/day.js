const getChannels = require('./scripts/getChannel.js');
// const Servers = require('../database/models/Guilds');

module.exports = async (guild, online, chat, banners) => {
	await guild.edit({ banner: banners.day2, name: 'Miłosna Grota・😻' });

	// Czy to ma sens?
	const int = await online(guild);
	if (int <= 9) return;

	const { przedstawSie, pokazSie, animeIManga, muzyka, filmy, waszeZwierzaki, ksiazki, cleverBot, komendy, obcy1, pokazPulpit, choroszcz, bydgoszcz, darkweb } = getChannels();

	// Pisanie
	await chat.setRateLimitPerUser(0);
	await przedstawSie.setRateLimitPerUser(1800);
	await pokazSie.setRateLimitPerUser(3600);
	await animeIManga.setRateLimitPerUser(0);
	await muzyka.setRateLimitPerUser(0);
	await filmy.setRateLimitPerUser(0);
	await ksiazki.setRateLimitPerUser(0);
	await waszeZwierzaki.setRateLimitPerUser(0);

	// Do zabawy
	await komendy.setRateLimitPerUser(0);
	await obcy1.setRateLimitPerUser(1);
	await pokazPulpit.setRateLimitPerUser(0);
	await cleverBot.setRateLimitPerUser(1);

	// Centra
	await choroszcz.setRateLimitPerUser(0);
	await bydgoszcz.setRateLimitPerUser(0);

	// Pozostałe
	await darkweb.setRateLimitPerUser(1);


	// Baza
	// const serverDb = await Servers.findOne({ guildId: guild.id });
	// await serverDb.updateOne({ welcomer: true });

	chat.send('☀️ » **Tryb nocny został wyłączony**\nDzień dobry moi drodzy! Sefinek życzy wam miłego dnia (:');
	console.log('CronEx » Night mode has been turned off');
};
const getChannels = require('./scripts/getChannel.js');
// const Servers = require('../database/models/Guilds');

module.exports = async (guild, online, chat, banners) => {
	await guild.edit({ banner: banners.rdNightBanner(), name: 'Miłosna Grota・😴' });

	// Czy to ma sens?
	const int = await online(guild);
	if (int <= 9) return;

	const { przedstawSie, pokazSie, animeIManga, muzyka, filmy, waszeZwierzaki, ksiazki, cleverBot, komendy, obcy1, pokazPulpit, choroszcz, bydgoszcz, darkweb } = getChannels();

	// Pisanie
	await chat.setRateLimitPerUser(1);
	await przedstawSie.setRateLimitPerUser(3600);
	await pokazSie.setRateLimitPerUser(7200);
	await animeIManga.setRateLimitPerUser(1);
	await muzyka.setRateLimitPerUser(1);
	await filmy.setRateLimitPerUser(2);
	await ksiazki.setRateLimitPerUser(2);
	await waszeZwierzaki.setRateLimitPerUser(1);

	// Do zabawy
	await komendy.setRateLimitPerUser(1);
	await obcy1.setRateLimitPerUser(2);
	await pokazPulpit.setRateLimitPerUser(1);
	await cleverBot.setRateLimitPerUser(2);

	// Centra
	await choroszcz.setRateLimitPerUser(1);
	await bydgoszcz.setRateLimitPerUser(1);

	// Pozostałe
	await darkweb.setRateLimitPerUser(1);


	// Baza
	// const serverDb = await Servers.findOne({ guildId: guild.id });
	// await serverDb.updateOne({ welcomer: false });

	chat.send('🌙 » **Tryb nocny został włączony**\nMiłej nocki moi mili oraz pobytu na serwerze!');
	console.log('CronEx » Night mode has been activated');
};
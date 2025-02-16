module.exports.start = async (guild, online, chat, banners) => {
	const int = await online(guild);
	if (int <= 4) return;

	chat.send(`<:papiez:1127457965419540510> **GODZINA PAPIEŻOWA** <:papiez:1127457965419540510>\nWybiła godzina <@&${process.env.RO_PING_PAPIEZOWA}>!\n\n> https://www.youtube.com/watch?v=1vZ28SAgzKc`);

	await chat.setRateLimitPerUser(0);
	await guild.edit({ banner: banners.papajTime, name: 'Miłosna Grota・🍮' });
};

module.exports.end = async (guild, online, chat, banners) => {
	const int = await online(guild);
	if (int <= 4) return;

	chat.send('<:papiez:1127457965419540510> **GODZINA PAPIEŻOWA** <:papiez:1127457965419540510>\nNiestety, ale godzina 21:37 dobiegła końca.');

	await chat.setRateLimitPerUser(1);
	await guild.edit({ banner: banners.day1, name: 'Miłosna Grota・😍' });
};
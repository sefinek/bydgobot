module.exports = guild => {
	const przedstawSie = guild.channels.cache.get(process.env.CH_PRZEDSTAW_SIE);
	const pokazSie = guild.channels.cache.get(process.env.CH_POKAZ_RYJEK);
	const animeIManga = guild.channels.cache.get(process.env.CH_ANIME_I_MANGA);
	const muzyka = guild.channels.cache.get(process.env.CH_MUZYKA);
	const filmy = guild.channels.cache.get(process.env.CH_FIMLY);
	const ksiazki = guild.channels.cache.get(process.env.CH_KSIAZKI);
	const waszeZwierzaki = guild.channels.cache.get(process.env.CH_WASZE_ZWIERZAKI);
	const cleverBot = guild.channels.cache.get(process.env.CH_CLEVER_BOT);

	const komendy = guild.channels.cache.get(process.env.CH_KOMENDY);
	const obcy1 = guild.channels.cache.get(process.env.CH_6OBCY);
	const pokazPulpit = guild.channels.cache.get(process.env.CH_POKAZ_PULPIT);

	const choroszcz = guild.channels.cache.get(process.env.CH_CHOROSZCZ);
	const bydgoszcz = guild.channels.cache.get(process.env.CH_BYDGOSZCZ);

	const darkweb = guild.channels.cache.get(process.env.CH_DARKWEB);

	return { przedstawSie, pokazSie, animeIManga, muzyka, filmy, waszeZwierzaki, ksiazki, cleverBot, komendy, obcy1, pokazPulpit, choroszcz, bydgoszcz, darkweb };
};
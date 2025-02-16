module.exports = async (guild, online, chat) => {
	const int = await online(guild);
	if (int <= 4) return;

	chat.send(`<@&${process.env.RO_PING_DEADCHAT}>, budzimy się!`);
};
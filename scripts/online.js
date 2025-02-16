module.exports = async guild => {
	const members = await guild.members.fetch();
	return members.filter(m => !m.user.bot && m.presence?.status === 'online' || !m.user.bot && m.presence?.status === 'dnd' || !m.user.bot && m.presence?.status === 'idle').size;
};
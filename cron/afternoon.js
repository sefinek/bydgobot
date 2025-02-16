module.exports = async (guild, chat, banners) => {
	await guild.edit({ banner: banners.day1, name: 'Miłosna Grota 😽' });

	// chat.send('<a:thumbsup:978071011280973825> » Administracja życzy wam miłego wieczorku.');
	console.log('CronEx » Scheduled task activated at 17:30. Server banner has been changed!');
};
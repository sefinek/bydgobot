const { schedule } = require('node-cron');

// Scripts
const online = require('../scripts/online.js');
const banners = require('./scripts/getBanner.js');

// For the cron
// const papajCron = require('./papaj.js');
// const wakeupCron = require('./wakeup.js');
const nightCron = require('./night.js');
const dayCron = require('./day.js');
const afternoonCron = require('./afternoon.js');
const verificationCron = require('./verification.js');
const diagnosticCron = require('./diagnostic.js');

// Variables
const settings = { scheduled: true, timezone: 'Europe/Warsaw' };

module.exports = client => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID);
	const chat = guild.channels.cache.get(process.env.CH_GENERALY);


	// Messages
	// schedule('37 21 * * *', async () => {
	// 	await papajCron.start(guild, online, chat, banners);
	// }, settings);
	//
	// schedule('38 21 * * *', async () => {
	// 	await papajCron.end(guild, online, chat, banners);
	// }, settings);

	// schedule('35 17 * * 0-6/2', async () => {
	// 	await wakeupCron(guild, online, chat);
	// }, settings);


	// Change banner
	schedule('30 6 * * *', async () => {
		await dayCron(guild, online, chat, banners);
	}, settings);

	schedule('30 23 * * *', async () => {
		await nightCron(guild, online, chat, banners);
	}, settings);

	// Zawka pozdrawia i praktyki <: 26.05.2022 😴 27.07.2023 🐦 21.10.2023 😿
	schedule('30 17 * * *', async () => {
		await afternoonCron(guild, chat, banners);
	}, settings);


	// Verification
	schedule('30 19 * * *', async () => {
		await verificationCron(guild);
	}, settings);

	// Diagnostics
	schedule('0 5 * * 0-6/3', async () => {
		await diagnosticCron(client);
	}, settings);



	// Loaded
	console.log('CronEx » Loaded cron tasks');
};
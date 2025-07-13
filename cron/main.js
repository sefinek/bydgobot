const { CronJob } = require('cron');

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
const timezone = 'Europe/Warsaw';

module.exports = client => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID);
	const chat = guild.channels.cache.get(process.env.CH_GENERALY);

	// Messages
	// new CronJob('37 21 * * *', async () => {
	// 	await papajCron.start(guild, online, chat, banners);
	// }, null, true, timezone);
	//
	// new CronJob('38 21 * * *', async () => {
	// 	await papajCron.end(guild, online, chat, banners);
	// }, null, true, timezone);

	// new CronJob('35 17 * * 0-6/2', async () => {
	// 	await wakeupCron(guild, online, chat);
	// }, null, true, timezone);

	// Change banner
	new CronJob('30 6 * * *', async () => {
		await dayCron(guild, online, chat, banners);
	}, null, true, timezone);

	new CronJob('30 23 * * *', async () => {
		await nightCron(guild, online, chat, banners);
	}, null, true, timezone);

	// Zawka pozdrawia i praktyki <: 26.05.2022 😴 27.07.2023 🐦 21.10.2023 😿
	new CronJob('30 17 * * *', async () => {
		await afternoonCron(guild, chat, banners);
	}, null, true, timezone);

	// Verification
	new CronJob('30 19 * * *', async () => {
		await verificationCron(guild);
	}, null, true, timezone);

	// Diagnostics
	new CronJob('0 5 * * 0-6/3', async () => {
		await diagnosticCron(client);
	}, null, true, timezone);

	// Loaded
	console.log('CronEx » Loaded cron tasks');
};
const { Events } = require('discord.js');
const online = require('../scripts/online.js');
const Server = require('../database/models/Guilds');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const serverDb = await Server.findOne({ guildId: guild.id }).lean();
		if (!serverDb) await Server.create({ guildId: guild.id });

		require('../scripts/setActivity.js')(client.user);
		if (process.env.NODE_ENV === 'production') require('../cron/main.js')(client);


		console.log(`CReady » Logged as bot ${client.user.tag} [${process.env.PREFIX}] (${client.guilds.cache.size} guilds)`);

		// Run express instance
		require('../server.js')(client);

		// Only for production
		if (process.env.NODE_ENV === 'development') return;

		// First refresh at startup
		const onlChannel = guild.channels.cache.get(process.env.VC_ONLINE);
		try {
			const onl = await online(guild);
			await onlChannel.setName(`🌍・Online: ${onl}`);

			await guild.channels.cache.get(process.env.VC_OSOBY).setName(`👥・Osoby: ${guild.members.cache.filter(m => !m.user.bot).size}`);
		} catch (err) {
			console.warn('CReady » Server user counters were not updated.', err.message);
		}

		// Loop 300000ms
		const recordOnline = guild.channels.cache.get(process.env.VC_REKORD_ONLINE);
		const mainChat = guild.channels.cache.get(process.env.CH_GENERALY);
		setInterval(async () => {
			const onl = await online(guild);

			// Online counter
			try {
				await onlChannel.setName(`🌍・Online: ${onl}`);
			} catch (err) {
				console.error('CReady » Something went wrong while refreshing the online user count.', err);
			}

			// Online record
			const dbInt = await Server.findOne({ guildId: guild.id });
			if (onl > dbInt.onlineRecord) {
				await dbInt.updateOne({ onlineRecord: onl });

				try {
					await recordOnline.setName(`💙・Rekord online: ${onl}`);
					await mainChat.send(`<:swagcat_thumbsup:1127457979269136406> » **Dziękujemy!**\nPobito rekord osób online na naszym serwerze - **${onl}**!`);
				} catch (err) {
					console.error('CReady » Something went wrong in the try-catch block.', err);
				}
			}
		}, 300000);
	},
};
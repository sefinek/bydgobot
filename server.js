const express = require('express');
const helmet = require('helmet');
const { EmbedBuilder } = require('discord.js');
const app = express();

const findMember = async (client, validation, body) => {
	if (validation) return { status: 400, message: 'Missing data' };

	const guild = await client.guilds.fetch(process.env.GUILD_ID);
	if (!guild) return { status: 500, message: `Guild ${process.env.GUILD_ID} was not found` };

	await guild.members.fetch();

	const member = guild.members.cache.get(body.userId);
	if (!member) return { status: 404, message: 'User was not found' };

	return { status: 200, guild, member };
};

module.exports = client => {
	app.use(helmet());
	app.use(express.json({ limit: '3kb' }));
	app.use(express.urlencoded({ limit: '3kb', extended: true }));

	app.get('/api/v1/info', (req, res) => {
		res.json({
			code: 200,
			tag: client.user.tag,
			status: ['online', 'idle', 'dnd'].includes(client.user.presence.status) ? 'Online' : 'Offline',
			ping : client.ws.ping,
		});
	});

	app.post('/api/v1/verification-passed', async (req, res) => {
		try {
			const data = await findMember(client, !req.body.userId, req.body);
			if (data.status !== 200) return res.status(data.status).json(data);

			const guildMember = data.member;
			const verificationRole = await data.guild.roles.cache.get(process.env.RO_WERYFIKACJA);
			if (!guildMember.roles.cache.has(verificationRole.id)) {
				console.log(`${data.member.user.username} is already verified`);
				return res.status(400).json({ status: 400, message: 'The user is already verified' });
			}

			const datingRole = await data.guild.roles.cache.get(process.env.RO_RANDKOWICZ);
			await guildMember.roles.remove(verificationRole);
			await guildMember.roles.add(datingRole);

			res.json({ status: 200, message: 'Verification successful, role updated' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ status: 500, message: 'Internal server error' });
		}
	});

	app.post('/api/v1/send-dm-message', async (req, res) => {
		const data = await findMember(client, !req.body.userId || !req.body.title || !req.body.dmMessage, req.body);
		if (data.status !== 200) return res.status(data.status).json(data);

		try {
			data.member.send({ embeds: [
				new EmbedBuilder()
					.setColor('#FCFFFF')
					.setImage(`${process.env.URL_CDN}/discord/bydgobot/verification/standard.png`),

				new EmbedBuilder()
					.setColor('#79E0F2')
					.setAuthor({ name: req.body.title, iconURL: data.guild.iconURL(), url: process.env.URL_SEFINEK })
					.setDescription(req.body.dmMessage),
			] });

			console.log(`Embeds for ${data.member.id} have been successfully sent`);
			res.sendStatus(200);
		} catch (err) {
			if (err.code === 50007) {
				console.log(err.message);
				res.send({ status: 200, message: err.message });
			} else {
				console.error(err);
				res.status(500).send({ status: 500, message: err });
			}
		}
	});

	app.use((req, res) => res.status(404).json({ code: 404, message: 'Not Found' }));

	app.use((err, req, res, next) => {
		if (err) console.error(err);
		res.status(500).json({ code: 500, message: 'Internal Server Error' });
		return next;
	});

	app.listen(process.env.API_PORT, () => {
		if (process.env.NODE_ENV === 'production') {
			try {
				process.send('ready');
			} catch (err) {
				console.log('ServFA » The ready signal was not sent', err.message);
			}
		}

		console.log(`ServRD » BydgoBOT API is running on http://127.0.0.1:${process.env.API_PORT}\n`);
	});
};
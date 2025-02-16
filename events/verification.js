const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');
const Servers = require('../database/models/Guilds');

module.exports = {
	name: Events.MessageCreate,
	env: process.env.NODE_ENV,
	async execute(msg, client) {
		if (msg.channel.id !== process.env.CH_WERYFIKACJA1 || msg.author.bot || msg.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return;

		msg.delete().catch(() => console.warn('EventV » Message from the verification channel was not deleted'));

		if (msg.content.toLowerCase() === 'love') {
			const verified = await msg.guild.roles.cache.get(process.env.RO_RANDKOWICZ);
			const wrfRole = await msg.guild.roles.cache.get(process.env.RO_WERYFIKACJA);
			if (!verified || !wrfRole) {
				msg.channel.send({
					embeds: [
						new EmbedBuilder()
							.setColor('#ED2F5D')
							.setAuthor({ name: `❌ Nie mogę zweryfikować ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })
							.setDescription(`Bot nie znalazł wymaganych ról do weryfikacji.\nSkontaktuj się z administratorem <@${process.env.BOT_OWNER}>.`)
							.setImage(`${process.env.URL_CDN}/discord/bydgobot/verification/error.png`),
					],
					content: `**Ping właściciela:** <@${process.env.BOT_OWNER}>`,
				}).then(toDel => setTimeout(() => toDel.delete(), 9000));

				return console.error(`EventV » One of the roles likely does not exist. User verification for ${msg.author.tag} (${msg.author.id}) has failed.`);
			}

			try {
				await msg.member.roles.add(verified);

				const altDentifier = msg.member.roles.cache.has(process.env.RO_ALTDENTIFIER);
				await msg.channel.send({ embeds: [
					new EmbedBuilder()
						.setColor('#FFBEB8')
						.setAuthor({ name: `💗 Powodzenie ${msg.author.username}`, iconURL: msg.guild.iconURL() })
						.setDescription(
							altDentifier ? `Przejdź na kanał <#${process.env.CH_WERYFIKACJA2}>, aby ukończyć ostatni etap weryfikacji. Życzymy powodzenia!` : `Dziękujemy za zweryfikowanie się ${msg.author}!\nŻyczymy Ci miłego pobytu na naszym serwerze.`
						)
						.setThumbnail(msg.author.displayAvatarURL())
						.setImage(`${process.env.URL_CDN}/discord/bydgobot/verification/successfully.png`)],
				}).then(toDel => setTimeout(() => toDel.delete(), 4000));

				await msg.member.roles.remove(wrfRole);

				const serverDb = await Servers.findOne({ guildId: msg.guild.id });
				if ((serverDb && serverDb.welcomer) && !altDentifier) client.channels.cache.get(process.env.CH_GENERALY).send(`💗 **Przywitajmy użytkownika ${msg.member} na naszym serwerze**\n> Dziękujemy Ci za dołączenie. Życzmy miłego pobytu.`);
			} catch (err) {
				msg.channel.send({
					embeds: [
						new EmbedBuilder()
							.setColor('#D64539')
							.setAuthor({ name: `❌ Nie mogę zweryfikować ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })
							.setDescription(`Przepraszamy, lecz coś poszło nie po naszej myśli. Wybacz.\nSkontaktuj się z administratorem <@${process.env.BOT_OWNER}> na PW.`)
							.setImage(`${process.env.URL_CDN}/discord/bydgobot/verification/error.png`),
					],
					content: `**Ping administratora:** <@${process.env.BOT_OWNER}>`,
				}).then(toDel => setTimeout(() => toDel.delete(), 10000));

				return console.error(`EventV » Something went wrong in the try-catch block. User verification for ${msg.author.tag} (${msg.author.id}) has failed.\n`, err);
			}

			return console.log(`EventV » User ${msg.author.tag} (${msg.author.id}) has been successfully verified`);
		}


		msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#000000')
				.setAuthor({ name: `❌ ${msg.author.username}, oczekiwano innej odpowiedzi`, iconURL: msg.author.displayAvatarURL() })
				.setDescription('Zapoznaj się z informacjami na górze. Spróbuj ponownie.')
				.setImage(`${process.env.URL_CDN}/discord/bydgobot/verification/old/fail.jpg`)],
		}).then(toDel => setTimeout(() => toDel.delete(), 6000));

		console.log(`EventV » User ${msg.author.tag} (${msg.author.id}) sent unexpected message during verification. Content: ${msg.content}`);
	},
};

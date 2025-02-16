const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const getChannels = require('./scripts/getChannel.js');
const Members = require('../database/models/Members');

module.exports = async guild => {
	await guild.members.fetch();
	const users = guild.roles.cache.get(process.env.RO_WERYFIKACJA).members.map(m => m.user);

	const { wrf } = getChannels();

	console.log(`CronEx » Messages are being sent to ${users.length} users with verification information...`);

	for (const member of users) {
		if (member.permissions.has(PermissionsBitField.Flags.ManageGuild)) console.log(`CronEx » Użytkownik ${member.username} posiada uprawienia Zarządzenie serwerem. Przerwano akcje.`);

		let memberDb = await Members.findOne({ userId: member.id });
		if (!memberDb) memberDb = await Members.create({ userId: member.id });

		memberDb.wrfNotify++;
		await memberDb.updateOne(memberDb);

		if (memberDb.wrfNotify === 2) {
			member.send({ embeds: [
				new EmbedBuilder()
					.setColor('#FFB02E')
					.setAuthor({ name: `⚠️ Wyrzucono Cię z serwera ${guild.name}`, iconURL: guild.iconURL() })
					.setDescription('Niestety pomimo wcześniejszego uprzedzenia, nadal się nie zweryfikowałeś.\n\n» Trzymaj zaproszenie, jeżeli zechciałbyś wrócić do nas spowrotem.\n> https://discord.gg/WeDskJZuNb')],
			}).then(() => {
				console.log(`CronEx » ✔️ ${member.tag} (${member.id}) otrzymał wiadomość o tym, że dostał kicka za niezweryfikowanie się`);
			}).catch(err => console.log(`CronEx » ${member.tag} (${member.id}) did not receive a DM (Direct Message)`, err.message));

			try {
				await guild.members.cache.get(member.id).kick({ reason: 'Ten użytkownik nie zweryfikował się pomimo nadesłanych wcześniej informacji.' });
			} catch (err) {
				console.warn(`CronEx » User with nickname ${member.tag} (${member.id}) did not receive a kick`, err.message);
			}

			memberDb.updateOne({ wrfNotify: 0 });
		}

		const information = new EmbedBuilder()
			.setColor('#00A6ED')
			.setAuthor({ name: `🔎 Weryfikacja na Ciebie czeka ${member.username}`, iconURL: guild.iconURL() })
			.setDescription(`Czy możesz zweryfikować na naszym serwerze z nazwą **${guild.name}**?\nJeśli tego nie zrobisz, w następnym dniu zostaniesz wyrzucony z serwera.\n\n> Wpisz słowo \`Choroszcz\` na kanale <#${process.env.CH_WERYFIKACJA1}>.`)
			.setFooter({ text: '» Niniejsza wiadomość została wysłana automatycznie. Życzymy powodzenia.' });

		member.send({ embeds: [information] }).then(() => {
			console.log(`CronEx » ✔️ ${member.tag} (${member.id}) received the message`);
		}).catch(async err => {
			const del = await wrf.send({ content: ` 🔎 **[${member}]**`, embeds: [information] });
			setTimeout(() => del.delete(), 300000);

			console.log(`CronEx » ✘ ${member.tag} (${member.id}) did not receive the message. It was delivered to the verification channel.`, err.message);
		});
	}
};
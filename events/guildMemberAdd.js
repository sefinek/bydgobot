const { Events, EmbedBuilder } = require('discord.js');
const Members = require('../database/models/Members');

module.exports = {
	name: Events.GuildMemberAdd,
	env: process.env.NODE_ENV,
	async execute(member) {
		if (member.guild.id !== process.env.GUILD_ID || member.user.bot) return;

		const memberDb = await Members.findOne({ userId: member.id });
		if (memberDb && memberDb.bydgoszcz) {
			try {
				member.roles.add(process.env.RO_WIEZIEN_CHOROSZCZY);

				console.log('EventA » Choroszcz role successfully added');
			} catch (err) {
				console.warn('EventA » Choroszcz role was not added due to an error.', err.message);
			}
		}

		member.roles.add(process.env.RO_WERYFIKACJA).catch(err => console.warn('EventA » Role was not assigned to the user due to an error.', err.message));

		member.guild.channels.cache.get(process.env.CH_LOBBY).send({ embeds: [new EmbedBuilder()
			.setColor('#2EE47B')
			.setAuthor({ name: `👋 Użytkownik ${member.user.tag} dołączył do nas`, iconURL: member.guild.iconURL() })
			.setDescription(
				`Witaj ${member} na naszym serwerze! Mamy wielką nadzieje, że zostaniesz u nas na dłuższy czas. Miłego pobytu.\n` +
				`Jesteś naszym **${member.guild.members.cache.filter(m => !m.user.bot).size} gościem**. Dziękujemy Ci za dołączenie!`
			)
			.setThumbnail(member.user.displayAvatarURL())],
		});

		member.send({
			embeds: [
				new EmbedBuilder()
					.setColor('#0078FF')
					.setAuthor({ name: `Witamy serdecznie na ${member.guild.name}`, iconURL: member.guild.iconURL() })
					.setDescription(`Dziękujemy za dołączenie! Po zweryfikowaniu zapoznaj się z [regulaminem](https://github.com/sefinek/Milosna_Grota/blob/main/Rules.md) serwera.\nNastępnie zachęcam do przywitania się z nami na kanale <#${process.env.CH_GENERALY}>!`)
					.addFields([
						{
							name: '💗 » Czy naprawdę jest to serwer randkowy?',
							value:
							'Cóż, otóż tak! Jest to serwer stworzony z myślą o randkach. Dlaczego akurat taka tematyka? Na tego typu serwerach zwykle jest dużo kontekstu do rozmowy. Macie szansę poznać tu swoją drugą połówkę lub przyjaźń na długie lata.',
						},
						{
							name: '😍 » Jesteś może graczem Genshin Impact?',
							value: 'Jeśli tak, odwiedź projekt [Genshin Stella Mod](https://stella.sefinek.net).\nW zupełności nie pożałujesz, a nawet zyskasz - lepszą grafikę w grze i nie tylko! Zapoznaj się z dostępnymi informacjami na stronie.',
						},
						{
							name: '🎶 » Lubisz może słuchać muzyki?',
							value: 'Jeśli interesują Cię kanały na których można znaleźć pełno sped upów przeróżnych piosenek, odwiedź: [www.youtube.com/@sefinek](https://www.youtube.com/@sefinek)',
						},
						{
							name: '🤖 » Polecamy godnego zaufania bota Noel. Dodaj go na swój serwer!',
							value: `> **Oficjalna strona:** ${process.env.URL_NOEL}\n`,
						},
						{
							name: '👋 » Zakończenie',
							value:
							`W razie jakichkolwiek pytań, skontaktuj się z <@${process.env.BOT_OWNER}>. Jeśli chcesz miło pogadać lub po prostu się przywitać - również pisz!\n\n` +
							'~ Życzymy Ci miłego pobytu! Pozdrawiamy.',
						},
					]),
			],
		}).catch(err => console.log('EventA » Private message was not delivered to the user.', err.message));

		try {
			await member.guild.channels.cache.get(process.env.VC_OSOBY).setName(`👥・Osoby: ${member.guild.members.cache.filter(m => !m.user.bot).size} ⬆`);
			await member.guild.channels.cache.get(process.env.VC_NOWY).setName(`👋・Nowy: ${member.user.username}`);
		} catch (err) {
			console.warn('EventA » Voice channels were not updated when a user joined the server.', err.message);
		}

		console.log(`EventA » User ${member.user.tag} (${member.id}) has joined the server ${member.guild.name}`);
	},
};

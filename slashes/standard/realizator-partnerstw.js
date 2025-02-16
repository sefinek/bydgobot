const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('realizator-partnerstw')
		.setDescription('Rekrutacja na Realizatora partnerstw.')
		.addSubcommand(sub => sub.setName('pomoc').setDescription('Uzyskaj pomoc i inne cenne informacje na temat rekrutacji.'))
		.addSubcommand(sub => sub.setName('formularz').setDescription('Formularz rekrutacyjny na stanowisko Realizatora partnerstw.')),
	async execute(client, interaction) {
		const subCommand = interaction.options.getSubcommand();

		if (subCommand === 'pomoc') {
			interaction.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#8C5543')
					.addFields([
						{
							name: '🤝 » Obowiązki oraz wymagania realizatorów',
							value:
							'**1.** Ustawienie sobie do statusu informacji, ze szukasz partnerstw na jakiś czas.\n' +
							'**2.** Minimum 3 partnerstwa w tygodniu. Inaczej rola zostanie Ci zdjęta.',
						},
						{
							name: '💼 » Jakie korzyści będziesz otrzymywał jako realizator?',
							value:
							'- Ekskluzywna ranga.\n' +
							'- Pieniądze za zakup niewolnika będą przyznawane Tobie.\n' +
							'- Większa pozycje na serwerze (jeśli się spiszesz, będziesz miał większe szanse na zgarnięcie admina w przyszłości).\n' +
							'- Pełną listę nagród znajdziesz [tutaj](https://github.com/sefinek/Milosna_Grota/tree/main/Partnerships).',
						},
						{
							name: '⭐ » Dodatkowe informacje',
							value:
							'Nie oczekujemy rozbudowanych zdań w formularzu. Odpowiedz na pytania, najlepiej w kilku lub kilkunastu słowach.\n' +
							'Właściciele nieodpowiednich treści w formularzu będą karani.\n\n' +
							'> Wpisz `/realizator-partnerstw formularz`, aby wypełnić formularz.',
						},
					])],
			});
		}

		if (subCommand === 'formularz') {
			const modal = new ModalBuilder()
				.setCustomId('realizator-partnerstw')
				.setTitle('Realizator partnerstw - Rekrutacja');

			const question1Input = new TextInputBuilder()
				.setCustomId('question1')
				.setLabel('Możemy na Ciebie liczyć?')
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true);


			const question2Input = new TextInputBuilder()
				.setCustomId('question2')
				.setLabel('Będziesz wywiązywać się ze swoich obowiązków?')
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true);

			const firstActionRow = new ActionRowBuilder().addComponents(question1Input);
			const secondActionRow = new ActionRowBuilder().addComponents(question2Input);

			modal.addComponents(firstActionRow, secondActionRow);

			await interaction.showModal(modal);
		}
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kierownik-darkweba')
		.setDescription('Rekrutacja na Kierownika dark webu.')
		.addSubcommand(sub => sub.setName('pomoc').setDescription('Uzyskaj pomoc i inne cenne informacje na temat rekrutacji.'))
		.addSubcommand(sub => sub.setName('formularz').setDescription('Formularz rekrutacyjny na stanowisko Kierownik dark webu.')),
	async execute(client, interaction) {
		const subCommand = interaction.options.getSubcommand();

		if (subCommand === 'pomoc') {
			interaction.reply({ embeds: [
				new EmbedBuilder()
					.setColor('#0074BA')
					.addFields([
						{
							name: '🌍 » Jakie bys miał obowiązki jako kierownik dark weba?',
							value: 'Po pierwsze musiałbyś przestrzegać zasad czarnego rynku. Miałbyś również obowiązek sprzedawać ludzi na przeznaczonym do tego kanale, którzy nie przestrzegali\n' +
							'regulaminu. Jeśli dana osoba zakupi niewolnika, będziesz musiał zawiadomić administracje. Jeżeli nie będziesz spełniać tych obowiązków, ranga zostanie ci zdjęta.',
						},
						{
							name: '👊 » Jakie korzyści będziesz mieć z tego, jak przejdziesz rekrutacje:',
							value: '- Ekskluzywna ranga.\n' +
							'- Pieniądze za zakup niewolnika będą przyznawane Tobie.\n' +
							'- Większa pozycje na serwerze (jeśli się spiszesz, będziesz miał większe szanse na zgarnięcie admina w przyszłości).',
						},
						{
							name: '🔥 » Wymagania do przystąpienia w rekrutacji:',
							value: '5 poziom i przestrzeganie regulaminu.',
						},
					])],
			});
		}

		if (subCommand === 'formularz') {
			const modal = new ModalBuilder()
				.setCustomId('kierownik-darkweba')
				.setTitle('Rekrutacja na Kierownika dark webu');

			const challengeInput = new TextInputBuilder()
				.setCustomId('challenge')
				.setLabel('Czy podołasz wyzwaniu kierownika?')
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true);

			const timeInput = new TextInputBuilder()
				.setCustomId('time')
				.setLabel('Ile dziennie czasu poświecisz na serwer?')
				.setStyle(TextInputStyle.Short)
				.setRequired(true);

			const changesInput = new TextInputBuilder()
				.setCustomId('changes')
				.setLabel('Opowiedz jakbyś zmienił czarny rynek')
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true);

			const firstActionRow = new ActionRowBuilder().addComponents(challengeInput);
			const secondActionRow = new ActionRowBuilder().addComponents(timeInput);
			const thirdActionRow = new ActionRowBuilder().addComponents(changesInput);

			modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

			await interaction.showModal(modal);
		}
	},
};
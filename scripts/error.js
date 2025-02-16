module.exports = (EmbedBuilder, inter, err) => {
	const embed = new EmbedBuilder()
		.setColor('#FF0048')
		.setAuthor({ name: '❌ Coś poszło nie po naszej myśli', iconURL: inter.commandName ? inter.user.displayAvatarURL() : inter.author.displayAvatarURL() })
		.setDescription('Serdecznie przepraszamy za problemy. Jeśli owy błąd będzie się powtarzać, skontaktuj się z administratorem niniejszego serwera.');

	setTimeout(async () => {
		console.error('Client »', err);

		if (inter.replied) {
			await inter.followUp({ embeds: [embed] });
		} else if (inter.deferred) {
			await inter.editReply({ embeds: [embed] });
		} else {
			await inter.reply({ embeds: [embed] });
		}
	}, 2500);
};
module.exports = (inter, newSession, EmbedBuilder, err) => {
	inter.editReply({
		content: '',
		embeds: [
			new EmbedBuilder()
				.setColor('#F8312F')
				.setAuthor({ name: `🔴 Captcha ${newSession.attempts} - ${inter.user.tag}`, iconURL: inter.user.displayAvatarURL() })
				.setDescription('Wybacz ale coś poszło nie tak. Czy możesz wpisać polecenie `/obcy`?'),
		],
		files: [],
	});

	console.error(err);
};
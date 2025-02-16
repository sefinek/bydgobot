const { EmbedBuilder } = require('discord.js');

module.exports.aboutMe = (msg, err, timeToDelete) => {
	msg.channel.send({ embeds: [
		new EmbedBuilder()
			.setColor('#FF006C')
			.setAuthor({ name: `Coś poszło nie po naszej myśli ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })
			.setDescription('Niestety nie mogliśmy dodać Twojego przedstawienia się na ten kanał. Skontaktuj się z administratorem, aby uzyskać pomoc. Przepraszamy za problemy.')],
	}).then(del => {
		msg.delete();
		setTimeout(() => del.delete(), timeToDelete || 15000);
	});

	console.error(`EventM » Coś poszło nie tak podczas szykowania przedstawienia się na kanale ${msg.channel.name}.`, err.message);
};

module.exports.iAmAnIdiot = (msg, err, timeToDelete) => {
	msg.channel.send({ embeds: [
		new EmbedBuilder()
			.setColor('#FF006C')
			.setAuthor({ name: `Coś poszło nie po naszej myśli ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })
			.setDescription('Niestety nie mogliśmy dodać Twojego ogłoszenia na ten kanał. Skontaktuj się z administratorem, aby uzyskać pomoc. Przepraszamy za problemy.')],
	}).then(del => {
		msg.delete();
		setTimeout(() => del.delete(), timeToDelete);
	});

	console.error(`EventM » Coś poszło nie tak podczas szykowania ogłoszenia na kanale ${msg.channel.name}.`, err.message);
};
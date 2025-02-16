const { EmbedBuilder } = require('discord.js');

module.exports = async ({ msg, length }) => {
	let delivered;
	try {
		await msg.author.send({ embeds: [
			new EmbedBuilder()
				.setColor('#004EFF')
				.setAuthor({ name: `Kopia Twojej wiadomości z kanału ${msg.channel.name}`, iconURL: msg.guild.iconURL() })
				.setDescription(`\`\`\`${msg.content}\`\`\``)
				.setFooter({ text: `Obecna długość wypowiedzi to ${msg.content.length}/${length} znaków` })],
		});

		delivered = true;
	} catch (err) {
		delivered = false;
	}

	return delivered;
};

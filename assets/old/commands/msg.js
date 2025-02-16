const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'msg',
	admin: true,
	execute: async (client, msg, args) => {
		if (!args[0]) return msg.reply('<a:error:1127481079620718635> Proszę podać identyfikator wiadomości.');

		const message = await msg.channel.messages.fetch(args[0]).catch(() => {return false;});
		if (!message) return msg.reply('<a:error:1127481079620718635> Wiadomość nie została odnaleziona na tym kanale.');

		const attachment = message.attachments.first();
		client.channels.cache.get('921960287572221962').send({ embeds: [
			new EmbedBuilder()
				.setColor('Random')
				.setAuthor({ name: `Post użytkownika ${message.author.tag}`, iconURL: message.author.displayAvatarURL(), url: message.url })
				.setDescription(message.content)
				.setImage(attachment ? attachment.url : null)
				.setTimestamp()
				.setFooter({ text: `Wiadomość dodana przez ${msg.author.username}`, iconURL: msg.author.displayAvatarURL() })],
		}).then(scs => {
			scs.react('⭐');
			msg.delete();

			msg.channel.send({ embeds: [
				new EmbedBuilder()
					.setColor('#00FF78')
					.setAuthor({ name: `${msg.author.tag}, powodzenie!`, iconURL: msg.author.displayAvatarURL() })
					.setDescription(`[[Skocz do wiadomości]](${scs.url})`)],
			});
		});
	},
};
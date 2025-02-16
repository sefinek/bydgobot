const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emoji')
		.setDescription('Darmowe nitro. Legit 100%.')
		.addStringOption(op => op.setName('nazwa').setDescription('Podaj samą nazwę emoji, bez dwukropków.').setRequired(true)),
	async execute(client, inter) {
		const args = inter.options.getString('nazwa');
		if (!args) return inter.reply('<a:error:1127481079620718635> Podaj samą nazwę emoji.');

		const emoji = inter.guild.emojis.cache.find(e => e.name === args);
		if (!emoji) return inter.reply('<a:error:1127481079620718635> Emoji nie zostało znalezione na tym serwerze.');

		await inter.reply({ embeds: [
			new EmbedBuilder()
				.setColor('#0066FF')
				.setAuthor({ name: 'Proszę czekać...', iconURL: process.env.LOA }),
		], ephemeral: true });

		try {
			const wh = await inter.channel.createWebhook({ name: inter.user.username, avatar: inter.user.displayAvatarURL(), reason: `Użytkownik ${inter.user.tag} (${inter.user.id}) użył polecenia /emoji.` });

			await wh.send(`<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`);

			await inter.editReply({ embeds: [
				new EmbedBuilder()
					.setColor('#43B481')
					.setAuthor({ name: 'Powodzenie!', iconURL: process.env.SUC })],
			});

			await wh.delete();
		} catch (err) {
			await inter.editReply({ embeds: [new EmbedBuilder().setColor('#F04947').setAuthor({ name: 'Coś poszło nie tak', iconURL: process.env.ERR })] });

			console.error(err);
		}
	},
};
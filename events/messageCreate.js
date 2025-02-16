const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { admins } = require('../config');

module.exports = {
	name: Events.MessageCreate,
	async execute(msg, client) {
		if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

		const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
		const cmd = args.shift().toLowerCase();

		const command = client.commands.get(cmd);
		if (!command) return;

		if (!msg.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) {
			return console.log(`Server » I don't have SendMessages permission on ${msg.guild.name} (${msg.guild.id}). ${msg.author.tag} (${msg.author.id}), command ${command.name}`);
		}

		if (command.admin && !admins.includes(msg.author.id)) {
			return console.log(`Server » User ${msg.author.tag} (${msg.author.id}) without permissions attempted to access administrative bot commands on the server ${msg.guild.name} (${msg.guild.id})!`);
		}

		try {
			await command.execute(client, msg, args);
		} catch (err) {
			require('../scripts/error.js')(EmbedBuilder, msg, err);
		}

		if (!command.admin) {
			console.log(`PrfCMD » Command '${command.name}' was used by '${msg.author.tag}' (${msg.author.id}) on the server '${msg.guild.name}' (${msg.guild.id})`);
		} else {
			console.log(`AdmCMD » Administrative command '${command.name}' was used by ${msg.author.tag} (${msg.author.id}) on '${msg.guild.name}' (${msg.guild.id})`);
		}
	},
};

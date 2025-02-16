const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const isInvitation = require('is-discord-invite');
const crypto = require('node:crypto');

const PATTERNS = [
	// grex "kutas" "penis" "chujem" "cipa" "cipsko" "cipska" "wagin" "p0rn" "porno" "sex" "seks" "ruchanie" "ruchania" "ruchać" "ruchac" "ruhać" "ruhac" "ruchańsko" "ruchansko" "ruchał" "ruchal" "ruchali" "cum" "gangbang" "gengbeng" "hentai" "hentaj" "zboczony" "zboczone" "zboczoną" "zboczona" "dick" "pussy" "porn" "nudes" "nudle" "dużego chuja" "durzego chuja" "dużego huja" "duzego huja" "naplet" "pedo" "masturbacja" "masturbuje" "masturbowanie" "spuszczanie" "spuczczają"
	{ regex: /du(?:rzego c|(?:(?:żego c|zego )|żego ))huja|masturb(?:owanie|acja|uje)|spuszczanie|s(?:puczczają|ex)|ru(?:cha(?:nsko|ńsko|ni[ae]|li|[cćł])|ha[cć])|g(?:angba|engbe)ng|zboczon[aeyą]|ruchal|c(?:ip(?:sk[ao]|a)|hujem|um)|n(?:aplet|udes)|henta[ij]|p(?:orno|ussy)|(?:peni|kuta|sek)s|wagin|nudle|porn|dick|pedo|p0rn/i, category: 'NSFW content', reaction: '😿' },

	// grex "zdechnij" "zabij" "kys" "zajebał" "zakurw"
	{ regex: /z(?:dechnij|a(?:(?:jebał|kurw)|bij))|kys/i, category: 'Kys', reaction: '💩' },

	// grex "sieg heil" "siegheil" "sieg hail" "sieghail" "heil hitler" "heilhitler" "hail hitler" "hailhitler" "hail hitla" "hailhitla" "white power" "whitepower" "wchite power" "wchitepower" "atom waffen" "atomwaffen" "swastyka" "swastyki" "swastyczki" "nazi" "wermacht" "schutzstaffel" "auschwitz" "aushwitz" "gestapo" "luftwaffe" "holokaust" "nsdap" "reichsführer" "reichsfuhrer" "żyd" "jews" "adolf" "hitler"
	{ regex: /s(?:chutzstaffel|wasty(?:czki|k[ai])|ieg(?: h[ae]i|h[ae]i)l)|(?:w(?:chite ?pow|hite ?pow)|h(?:eil ?hitl|itl))er|reichsf[uü]hrer|a(?:tom ?waffen|usc?hwitz|dolf)|hail ?hitler|hail ?hitla|holokaust|luftwaffe|wermacht|gestapo|nsdap|jews|nazi|żyd/i, category: 'Nazi word / other', reaction: '😶‍🌫️' },

	// grex "faggot" "pedał" "pedau" "pedal" "pedale" "gay" "gej" "geju"
	{ regex: /peda(?:le|[uł])|faggot|pedal|g(?:eju|ay)|gej/i, category: 'Faggot word', reaction: '😥' },

	// grex "jebać lgbt" "jebac lgbt" "palić lgbt" "palic lgbt" "jebane lgbt" "fuck lgbt"
	{ regex: /(?:jeba(?:ne|[cć])|fuck) lgbt|pali[cć] lgbt/i, category: 'Fck LGBT', reaction: '😥' },

	// grex "niger" "nigger" "niggęr" "niggeł" "nlgger" "niga" "nigga" "nyger" "nygger" "nyga" "nygga" "nyguch" "nygguch" "murzyn" "mudzin" "czarnuch" "czarnuh" "czarnuszek"
	{ regex: /czarnu(?:szek|c?h)|nygg?uch|n(?:ig(?:g(?:e[rł]|a)|a)|(?:ig(?:gę|e)|ygg?e)r|lgger|ygg?a)|mu(?:dzi|rzy)n/i, category: 'N-word', reaction: '🤡' },

	// grex "liga" "lige" "ligi" "lola" "ligusia" "ligusie" "ligusi" "ligunie" "league of legends"
	{ regex: /l(?:eague of legends|ig(?:u(?:si[ae]|nie)|[aei])|igusi|ola)/i, category: 'League of Legends', reaction: '🤓' },

	// grex "9 lat" "10 lat" "11 lat" "12 lat" "13 lat" "14 lat" "15 lat" "10lat" "11lat" "12lat" "13lat" "14lat" "15lat" "9 yo" "10 yo" "11 yo" "12 yo" "13 yo" "14 yo" "15 yo" "10yo" "11yo" "12yo" "13yo" "14yo" "15yo"
	{ regex: /1[0-5] (?:lat|yo)|1[0-5]lat|9 (?:lat|yo)|1[0-5]yo/i, category: 'Underage' },
];

const autoModSend = async (client, msg, event, category, { perms, reaction } = {}) => {
	const msgId = crypto.randomBytes(4).toString('hex');
	const amChannel = msg.guild.channels.cache.get(process.env.AUTOMOD_CHANNEL);
	if (!amChannel) return console.error(`AutoMD » [${msgId}] Channel 'AUTOMOD_CHANNEL' not found`);

	let infoMsg;
	try {
		infoMsg = await amChannel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#006CFF')
				.setAuthor({ name: `${msg.author.globalName || msg.author.username} / ${msg.author.id}`, iconURL: msg.author.displayAvatarURL() })
				.setDescription(`» **Message sent by ${msg.author} ready for deletion in ${msg.channel}**\n${msg.content}`)
				.addFields({ name: `» Details (ID ${msgId})`, value: `${category} || [Jump to this message](${msg.url})` }),
		] });
	} catch (err) {
		console.warn(`AutoMD » [${msgId}] Message to ${amChannel.name} not delivered. ${err.message}`);
	}

	if (category === 'Discord invitation') return;

	console.log(`AutoMD » [${msgId}] Message by ${msg.author.tag} (${msg.author.id}) in ${msg.channel.name} (${msg.channel.id}) ready for deletion; ${category}; ${event};\n\n${msg.author.globalName || msg.author.tag} — ${new Date(msg.createdTimestamp).toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw', hour12: false })}\n${msg.content}\n`);

	if ((msg.member.permissions.has(perms) || process.env.NODE_ENV === 'development') && reaction) {
		try {
			await msg.react(reaction);
		} catch (err) {
			console.log(`AutoMD » [${msgId}] Reaction not added to the message ${msg.id}.`, err.message);
		}
	}

	setTimeout(async () => {
		if (!infoMsg) return;

		try {
			await msg.delete();
			await infoMsg.react('✅');
			console.log(`AutoMD » [${msgId}] Message by ${msg.author.tag} in ${msg.channel.name} deleted`);
		} catch (err) {
			if (err.status === 404) {
				await infoMsg.react('🗑️');
				console.log(`AutoMD » [${msgId}] Message already deleted`);
			} else {
				await infoMsg.react('⚠️');
				console.warn(`AutoMD » [${msgId}] Message not deleted.`, err.message);
			}
		}
	}, 540000);
};

module.exports = async (client, msg, event) => {
	const result = await isInvitation.online(msg.content);

	if (result.isInvitation) {
		if (msg.member.permissions.has(PermissionsBitField.Flags.Administrator) && process.env.NODE_ENV === 'production') return false;
		const serverId = result.guild.id;
		if (serverId === process.env.GUILD_ID) return false;

		try {
			await msg.delete();
		} catch (err) {
			console.warn('EventM » Invitation not deleted', err.message);
		}

		const serverName = result.guild.name;
		if (!msg.member.bannable && process.env.NODE_ENV === 'production') {
			return console.warn(`EventM » Unable to ban ${msg.author.tag} for inviting to ${serverName}`);
		}

		try {
			await msg.author.send({ embeds: [
				new EmbedBuilder()
					.setColor('#FFB02E')
					.setAuthor({ name: `⚠️ Banned from ${msg.guild.name}`, iconURL: msg.author.displayAvatarURL() })
					.setDescription(`You have been banned for inviting to **${serverName}**.`),
			] });
		} catch (err) {
			console.log('EventM » Ban notification failed.', err.message);
		}

		if (process.env.NODE_ENV === 'production') {
			await msg.member.ban({ reason: `Invitation to ${serverName}, Channel: ${msg.channel.name}, User ID: ${msg.author.id}` });
		}

		const infoMsg = msg.channel.send({ embeds: [
			new EmbedBuilder()
				.setColor('#F8312F')
				.setAuthor({ name: `🤡 We had a clown - ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL() })
				.setDescription(`This user invited to **${serverName}** and got banned. Nice try.`)
				.setThumbnail(`https://cdn.discordapp.com/icons/${serverId}/${result.guild.icon}`),
		] });

		setTimeout(() => {
			if (infoMsg) infoMsg.delete();
		}, 40000);

		await autoModSend(client, msg, event, 'Discord invitation');
		return true;
	}

	for (const pattern of PATTERNS) {
		if (pattern.regex.test(msg.content)) {
			await autoModSend(client, msg, event, pattern.category, { perms: PermissionsBitField.Flags.ManageMessages, reaction: pattern.reaction });
			return true;
		}
	}
};
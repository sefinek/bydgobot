module.exports = async msg => {
	try {
		await msg.react('👍');
		await msg.react('👎');
	} catch (err) {
		console.warn(`EventM » Nie dodano reakcji do wiadomości na kanale ${msg.channel.name}.`, err.message);
	}
};
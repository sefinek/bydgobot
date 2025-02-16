module.exports = async msg => {
	try {
		await msg.react('1127481086499377282');
	} catch (err) {
		console.warn(`EventM » Nie dodano reakcji do wiadomości na kanale ${msg.channel.name}.`, err.message);
	}
};
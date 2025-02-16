module.exports = async (client, readdir, join) => {
	console.log('SlashC » Loading slash commands...');
	const commandsPath = join(__dirname, '..', 'slashes');

	try {
		const commandCategories = await readdir(commandsPath);

		for (const category of commandCategories) {
			const categoryPath = join(commandsPath, category);
			const commandFiles = (await readdir(categoryPath)).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const filePath = join(categoryPath, file);
				const command = require(filePath);

				if ('data' in command && 'execute' in command) {
					client.interactions.set(command.data.name, command);
				} else {
					console.error(`SlashC » The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			}
		}
	} catch (err) {
		console.error('SlashC » An error occurred while reading command files:', err);
	}
};
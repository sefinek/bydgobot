module.exports = async (client, readdir, join) => {
	console.log('PrfCMH » Loading prefix commands...');
	const commandsPath = join(__dirname, '..', 'commands');

	try {
		const commandCategories = await readdir(commandsPath);

		for (const category of commandCategories) {
			const categoryPath = join(commandsPath, category);
			const commandFiles = (await readdir(categoryPath)).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const filePath = join(categoryPath, file);
				const command = require(filePath);

				if (command.name) {
					await client.commands.set(command.name, command);
				} else {
					console.error(`PrfCMH » The file '${category}/${file}' is missing a command name`);
				}
			}
		}
	} catch (err) {
		console.error('PrfCMH » An error occurred while reading command files:', err);
	}
};
const { presence } = require('../config.js');

module.exports = client => {
	client.setActivity({ name: presence.name, type: presence.type });

	client.setStatus(presence.status);
};
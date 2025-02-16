const checkMsg = require('../checkMessage.js');

const msg = [
	'https://discord.gg/example',
	'https://disCOrd.gg/7548215',
	'http://discord.gg/5213567',
	'https://discord.com/invite/6246848',
	'https://discordapp.com/invite/9567935',

	'https://disboard.org/server/join/000000000000000000',
	'https://disboard.org/pl/server/join/000000000000000000',
	'https://discord.me/server/join/direct/example',

	'https://example.com',
	'https://wikipedia.org',
	'https://google.com',
	'https://github.com/sefinek',

	'Hello world! 🐱',

	'asdf fasd fsad 14 lat sd fafsd afsd asfad sfd a',
	'safdasdfasfdsdfasfdfjskdhn15 latfadloshjhdkjnalhskdfja',
	'sdffsdafdgavlnfhslhjkgflhk13latabfdsjkdfbaksjbaafbiuw3',
	'fadsnlfasdnlkjafsdnkafskdnllnskfajd342414latasdfhjnlkfasdlkjnafkjdls',
	'Jesteś kidem i masz 13 lat',
	'Kiddosem jesteś, masz 9 latek',

	'fjaslkdfmjasl;dfjma;efmjwi16 latekafsnlbasdkljfhbaslkd',
	'mam 16 lat pozdrawiam',
	'20lat',
	'20 lat',

	'hehehe nigger',
	'nigga',
	'nygger',

	'porno',
	'seks',
	'pchanie',
	'obciąganie',
	'stykanie się',
	'chujami',
];

for (let i = 0; i < msg.length; i++) {
	checkMsg({ content: msg[i], test: true }).then(result => console.log(`${result} → ${msg[i]}`));
}
const { readFileSync } = require('node:fs');

// Day
const day1 = readFileSync('./assets/banners/day/cat_and_fish.jpg');
const day2 = readFileSync('./assets/banners/day/cat_purple.jpg');

// Night
const night1 = readFileSync('./assets/banners/night/sleepy-fox_1.gif');
const night2 = readFileSync('./assets/banners/night/cat_boat.jpg');
const night3 = readFileSync('./assets/banners/night/cat_cute.jpg');

// 2137
const papajTime = readFileSync('./assets/banners/papiezowa.gif');

// Random banner for night
const rdNightBanner = () => {
	switch (Math.floor(Math.random() * 3) + 1) {
	case 1: return night1;
	case 2: return night2;
	case 3: return night3;
	default: throw Error('nightBanner() unknown value');
	}
};

module.exports = { day1, day2, night1, night2, night3, papajTime, rdNightBanner };
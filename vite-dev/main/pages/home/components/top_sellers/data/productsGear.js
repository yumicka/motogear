import getMainUrl from 'helpers/getMainUrl';
const helmet = getMainUrl() + 'img/images_gear/helmet_sellers.jpg';
const boots = getMainUrl() + 'img/images_sellers/boots.jpg';
const commander_boots = getMainUrl() + 'img/images_gear/commander_boots.jpg';
const ipsum_helmet = getMainUrl() + 'img/images_gear/ipsum_helmet.jpg';
const trousers = getMainUrl() + 'img/images_gear/Trousers.jpg';
const drift_helmet = getMainUrl() + 'img/images_gear/drift_helmet.jpg';
const crossfire_boots = getMainUrl() + 'img/images_gear/crossfire_boots.jpg';
const goggles = getMainUrl() + 'img/images_gear/goggles.jpg';
const solid_helmet = getMainUrl() + 'img/images_gear/solid_helmet.jpg';

export const productsGear = [
	{
		id: 1,
		img: helmet,
		priceNow: 69.99,
		priceOld: 129.99,
		discount: '-46%',
		rating: '★★★★★',
		reviews: 12,
		name: 'Raven Airborne Evo MX Helmet',
		to: '#',
	},
	{
		id: 2,
		img: boots,
		priceNow: 114.99,
		priceOld: 149.99,
		discount: '-23%',
		rating: '★★★★☆',
		reviews: 441,
		name: 'Raven Trooper MX Boots',
	},
	{
		id: 3,
		img: commander_boots,
		priceNow: 102.99,
		priceOld: 159.99,
		discount: '-23%',
		rating: '★★★★☆',
		reviews: 60,
		name: 'Raven Commander Enduro Boots',
	},
	{
		id: 4,
		img: ipsum_helmet,
		priceNow: 259.99,
		priceOld: 429.99,
		discount: '-40%',
		rating: '★★★★★',
		reviews: 60,
		name: 'Raven Ipsum Evo Mips® MX Helmet',
	},
	{
		id: 5,
		img: trousers,
		priceNow: 39.99,
		priceOld: 79.99,
		discount: '-50%',
		rating: '★★★★★',
		reviews: 60,
		name: 'Raven RV-Two MX Trousers',
	},
	{
		id: 6,
		img: drift_helmet,
		priceNow: 79.99,
		priceOld: 149.99,
		discount: '-47%',
		rating: '★★★★★',
		reviews: 60,
		name: 'Course Drift Adventure Helmet',
	},
	{
		id: 7,
		img: crossfire_boots,
		priceNow: 369.99,
		priceOld: 569.99,
		discount: '-35%',
		rating: '★★★★★',
		reviews: 9,
		name: 'Sidi Crossfire 3 SRS MX Bootes',
	},
	{
		id: 8,
		img: goggles,
		priceNow: 29.99,
		priceOld: 59.99,
		discount: '-50%',
		rating: '★★★★★',
		reviews: 240,
		name: 'Raven Sniper Crew MX Goggles',
	},
	{
		id: 9,
		img: solid_helmet,
		priceNow: 169.99,
		priceOld: 199.99,
		discount: '-15%',
		rating: '★★★★★',
		reviews: 4,
		name: 'Alpinestarts SM3 Solid MX Helmet',
	},
];

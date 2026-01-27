// Exports and creates an object with nav items that include title and link

import getMainUrl from 'helpers/getMainUrl';

const navItems = [
	{
		title: _g.lang('home'),
		link: getMainUrl(true),
	},
	{
		title: _g.lang('about_us'),
		link: getMainUrl(true) + 'par-mums',
	},
	{
		title: _g.lang('projects'),
		link: getMainUrl(true) + 'projekti',
	},
	{
		title: _g.lang('contacts'),
		link: getMainUrl(true) + 'kontakti',
	},
];

export default navItems;

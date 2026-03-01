const menu = [];

const baseName = '/administration';

menu.push({
	name: 'blog',
	title: 'Produktu ieraksti',
	url: baseName + '/blog/blog_entries',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'categories',
	title: 'Produktu kategorijas',
	url: baseName + '/blog/blog_categories',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'brands',
	title: 'Brands',
	url: baseName + '/blog/brands',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'orders',
	title: 'Pasutījumi',
	url: baseName + '/blog/orders',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'users',
	title: 'Lietotāji',
	url: baseName + '/users',
	icon: _g.getMainUrl() + 'assets/icons/users.svg',
});

menu.push({
	name: 'translations',
	title: 'Tulkojumi',
	url: baseName + '/translations',
	icon: _g.getMainUrl() + 'assets/icons/translations.svg',
});

// menu.push({
// 	name: 'metadata',
// 	title: 'Lapas meta dati',
// 	url: baseName + '/metadata',
// 	icon: _g.getMainUrl() + 'assets/icons/book.svg',
// });

menu.push({
	name: 'settings',
	title: 'Iestatījumi',
	url: baseName + '/settings',
	icon: _g.getMainUrl() + 'assets/icons/cog.svg',
});

export default menu;

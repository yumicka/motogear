// @ts-nocheck
import styles from './Categories_gallery.module.less';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const helmet = getMainUrl()+'img/categories/helmet.jpg';
const clothes = getMainUrl()+'img/categories/motocross_clothing.jpg';
const goggles = getMainUrl()+'img/categories/motocross_goggles.jpg';
const boots = getMainUrl()+'img/categories/motocross_boots.jpg';
const tools = getMainUrl()+'img/categories/tools.jpg';
const gloves = getMainUrl()+'img/categories/motocross_gloves.jpg';
const pants = getMainUrl()+'img/categories/motocross_pants.jpg';
const protection = getMainUrl()+'img/categories/motocross_protection.jpg';
const frame = getMainUrl()+'img/categories/Frame.jpg';
const oils = getMainUrl()+'img/categories/oil_lubricants.jpg';

const items = [
	{ title: 'Motocross helmets', img: helmet, href: '/shopHelmet' },
	{ title: 'Motocross clothing kits', img: clothes, href: '#' },
	{ title: 'Motocross goggles', img: goggles, href: '#' },
	{ title: 'Motocross boots', img: boots, href: '#' },
	{ title: 'Tools', img: tools, href: '#' },
	{ title: 'Motocross gloves', img: gloves, href: '#' },
	{ title: 'Motocross pants', img: pants, href: '#' },
	{ title: 'Motocross protection', img: protection, href: '#' },
	{ title: 'Frame & Chassis Parts', img: frame, href: '#' },
	{ title: 'Oils & Lubricants', img: oils, href: '#' },
];

const CategoriesGallery = () => {
	const trackRef = useRef(null);

	const scroll = (dir) => {
		const el = trackRef.current;
		const amount = 300;
		el.scrollBy({ left: dir * amount, behavior: 'smooth' });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.titleSection}>
					<h2>Shop by Category</h2>
				</div>
				<div className={styles.carousel}>
					<button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)}>
						‹
					</button>

					<div className={styles.viewport}>
						<div className={styles.galleryGrid} ref={trackRef}>
							{items.map((item) => (
								<Link
									key={item.title}
									className={`${styles.card} ${styles.categoryCard}`}
									to={item.href}>
									<Image
										src={item.img}
										alt={item.title}
										className={styles.image}
									/>
									<div className={styles.overlay} />
									<div className={styles.content}>
										<h3>{item.title}</h3>
									</div>
								</Link>
							))}
						</div>
					</div>
					<button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)}>
						›
					</button>
				</div>
			</div>
		</div>
	);
};

export default CategoriesGallery;

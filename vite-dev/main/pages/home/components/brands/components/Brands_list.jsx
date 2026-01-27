import Link from 'core/navigation/link';
import styles from './BrandList.module.less';
import getMainUrl from 'helpers/getMainUrl';
import Image from 'ui/media/image';

const raven = getMainUrl() + 'img/brands_logo/raven.jpg';
const alpinestars = getMainUrl() + 'img/brands_logo/alpinestars.jpg';
const leatt = getMainUrl() + 'img/brands_logo/leatt.jpg';
const shot = getMainUrl() + 'img/brands_logo/shot.jpg';
const oneal = getMainUrl() + 'img/brands_logo/oneal.png';
const acerbis = getMainUrl() + 'img/brands_logo/acerbis.jpg';
const airoh = getMainUrl() + 'img/brands_logo/airoh.jpg';
const percent = getMainUrl() + 'img/brands_logo/percent.jpg';
const prox = getMainUrl() + 'img/brands_logo/prox.jpg';
const fox = getMainUrl() + 'img/brands_logo/fox.png';

const brands = [
	{ name: 'Raven', img: raven },
	{ name: 'Alpinestars', img: alpinestars },
	{ name: 'Leatt', img: leatt },
	{ name: 'Shot', img: shot },
	{ name: 'Oneal', img: oneal },
	{ name: 'Acerbis', img: acerbis },
	{ name: 'Airoh', img: airoh },
	{ name: 'Percent', img: percent },
	{ name: 'Prox', img: prox },
	{ name: 'Fox', img: fox },
];

const Brands = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					{brands.map((brand) => (
						<Link key={brand.name} className={styles.box} to="#">
							<Image
								src={brand.img}
								alt={brand.name}
								className={styles.image}
							/>
							<h3 className={styles.title}>{brand.name}</h3>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Brands;

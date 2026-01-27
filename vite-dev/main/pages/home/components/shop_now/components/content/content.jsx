// @ts-ignore
import Image from 'ui/media/image';
import styles from './content.module.less';
import getMainUrl from 'helpers/getMainUrl';
import Link from 'core/navigation/link';
const wheels = getMainUrl()+'img/shop_now/wheels.jpg';
const moto = getMainUrl()+'img/shop_now/moto.jpg';

const Content = () => {
	return (
		<div className={styles.content}>
			<Link className={`${styles.contentBox} ${styles.firstBox}`}  to="#">
				<div className={styles.image}>
					<Image src={wheels} alt="Wheels" />
				</div>
				<div className={styles.text}>
					<h2>Customize your own look</h2>
					<p>
						Choose the colours of your wheels & seat cover, personalise your own
						bike decal kit, get your name stitched onto a gear bag or printed
						onto the 24MX tent walls!
					</p>
					<button className={`${styles.ctaButton} ${styles.firstButton}`}>Shop Now</button>
				</div>
			</Link>
			<Link className={`${styles.contentBox} ${styles.secondBox}`}  to="#">
				<div className={styles.image}>
					<Image src={moto} alt="Motorcycle" />
				</div>
				<div className={styles.text}>
					<h2>Proworks expands again – now with 25,000+ new fitments</h2>
					<p>
						With more product variation, better performance, and brands like A9
						joining the family. Proworks is your go-to for quality parts and
						accessories. Gear up right – for your next ride.
					</p>
					<button className={`${styles.ctaButton} ${styles.secondButton}`}>Shop Now</button>
				</div>
			</Link>
		</div>
	);
};

export default Content;

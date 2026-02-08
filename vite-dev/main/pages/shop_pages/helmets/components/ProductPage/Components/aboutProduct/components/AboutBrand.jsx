import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';
import styles from '../AboutProduct.module.less';

const logo = getMainUrl() + 'img/brands_logo/oneal.png';

const AboutBrand = () => {
	return (
		<div className={styles.AboutBrand}>
			<div className={styles.text}>
				<p>
					O&apos;Neal has decades of experience in producing high quality
					motocross clothing and protective gear for motocross riders.
					O&apos;Neal ensures that their products are off the perfect comfort,
					flexibility and of course the offer the best protection...
				</p>
			</div>

			<div className={styles.images}>
				<Image src={logo} />
			</div>
		</div>
	);
};

export default AboutBrand;

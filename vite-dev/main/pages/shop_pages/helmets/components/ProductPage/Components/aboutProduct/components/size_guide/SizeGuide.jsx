/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from '../../AboutProduct.module.less';
import getMainUrl from 'helpers/getMainUrl';

const OnealSize = getMainUrl() + 'img/size_guides/Oneal_SizeGuide.jpg';
const AirohSize = getMainUrl() + 'img/size_guides/Airoh_SizeGuide.jpg';

const SizeGuide = ({ specifications }) => {
	const productBrand =
		specifications.find((spec) => {
			const title = spec.title.toLowerCase();
			return title === 'brand' || title === 'brends' || title === 'бренд';
		})?.content || '';

	const brand = () => {
		switch (productBrand) {
			case "O'Neal":
				return <Image src={OnealSize} />;
			case 'Airoh':
				return <Image src={AirohSize} />;
			default:
				return null;
		}
	};
	return <div className={styles.sizeGuide}>{brand()}</div>;
};

export default SizeGuide;

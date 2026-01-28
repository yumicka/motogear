import Image from 'ui/media/image';
import styles from '../../AboutProduct.module.less';
import getMainUrl from 'helpers/getMainUrl';

const size = getMainUrl() + 'img/size_guides/Oneal_SizeGuide.jpg';

const SizeGuide = () => {
	return (
		<div className={styles.sizeGuide}>
			<Image src={size} />
		</div>
	);
};

export default SizeGuide;

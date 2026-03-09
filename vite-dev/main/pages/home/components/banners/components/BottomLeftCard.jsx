import styles from '../Banners.module.less';
import Image from 'ui/media/image';
import PropTypes from 'prop-types';
import Link from 'core/navigation/link';

import WithUi from 'hoc/store/ui';

import { head } from 'lodash-es';

import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			bottom_left_card: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let BottomLeftCard = ({ langData, data, image }) => {
	return (
		<Link className={`${styles.card} ${styles.bottomLeftCard}`} to={data.link}>
			<Image src={image.image} alt={langData.title} className={styles.image} />
			<div className={styles.overlay} />
			<div className={styles.contentLeftButton}>
				<Editable
					edit={{
						name: 'bottom_left_card',
					}}>
					<h3>{langData.title}</h3>
					<button className={styles.btn}>
						{langData.content}
					</button>
				</Editable>
			</div>
		</Link>
	);
};

BottomLeftCard.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};

// @ts-ignore
BottomLeftCard = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(BottomLeftCard);

export default WithUi(uiProps)(BottomLeftCard);

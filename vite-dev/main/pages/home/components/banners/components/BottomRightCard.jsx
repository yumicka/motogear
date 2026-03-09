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
			bottom_right_card: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let BottomRightCard = ({ langData, data, image }) => {
	return (
		<Link className={`${styles.card} ${styles.bottomRightCard}`} to={data.link}>
			<Image src={image.image} alt={langData.title} className={styles.image} />
			<div className={styles.overlay} />
			<div className={styles.contentRightButton}>
				<Editable
					edit={{
						name: 'bottom_right_card',
					}}>
					<h3 dangerouslySetInnerHTML={{ __html: langData.title }} />

					<button className={styles.btn}>{langData.content}</button>
				</Editable>
			</div>
		</Link>
	);
};

BottomRightCard.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};

// @ts-ignore
BottomRightCard = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(BottomRightCard);

export default WithUi(uiProps)(BottomRightCard);

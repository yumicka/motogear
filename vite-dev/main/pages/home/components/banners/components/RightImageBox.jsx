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
			right_image_box: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let RightImageBox = ({ langData, data, image }) => {
	return (
		<Link className={`${styles.card} ${styles.sideTop}`} to={data.link}>
			<Image
				src={image.image}
				alt={langData.title}
				className={styles.image}
			/>
			<div className={styles.overlay} />
			<div className={styles.contentLeft}>
				<Editable
					edit={{
						name: 'right_image_box',
					}}>
					<h3 dangerouslySetInnerHTML={{ __html: langData.title }} />
					<button className={styles.btnPrimary} >{langData.content}</button>
				</Editable>
			</div>
		</Link>
	);
};

RightImageBox.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};

// @ts-ignore
RightImageBox = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(RightImageBox);

export default WithUi(uiProps)(RightImageBox);

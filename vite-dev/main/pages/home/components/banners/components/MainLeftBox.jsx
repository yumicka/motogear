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
			homepage_firstBox: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let MainLeftBox = ({ langData, data, image }) => {
	return (
		<Link className={`${styles.card} ${styles.hero}`} to={data.link}>
			<Image src={image.image} alt={langData.title} className={styles.image} />
			<div className={styles.overlay} />
			<div className={styles.contentLeft}>
				<Editable
					edit={{
						name: 'homepage_first_box',
					}}>
					<h2>{langData.title}</h2>
					<button className={styles.btn}>{langData.content}</button>
				</Editable>
			</div>
		</Link>
	);
};

MainLeftBox.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};


// @ts-ignore
MainLeftBox = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(MainLeftBox);

export default WithUi(uiProps)(MainLeftBox);

import Image from 'ui/media/image';
import styles from '../content.module.less';
import Link from 'core/navigation/link';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { head } from 'lodash-es';

import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			customize_your_look_left: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let LeftBox = ({ langData, data, image }) => {
	return (
		<Link
			className={`${styles.contentBox} ${styles.firstBox}`}
			to={data.link_left}>
			<div className={styles.image}>
				<Image src={image.image} alt={langData.title_left} />
			</div>
			<Editable
				edit={{
					name: 'customize_your_look_left',
				}}>
				<div className={styles.text}>
					<h2>{langData.title_left}</h2>
					<p>{langData.content_left}</p>
					<button className={`${styles.ctaButton} ${styles.firstButton}`}>
						{langData.button_title_left}
					</button>
				</div>
			</Editable>
		</Link>
	);
};

LeftBox.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};

// @ts-ignore
LeftBox = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(LeftBox);

export default WithUi(uiProps)(LeftBox);

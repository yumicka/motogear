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
			customize_your_look_right: {
				langData: 'langData',
				data: 'data',
				media: {
					images: 'images',
				},
			},
		},
	};
};

let RightBox = ({ langData, data, image }) => {
	return (
		<Link
			className={`${styles.contentBox} ${styles.secondBox}`}
			to={data.link_right}>
			<Editable
				edit={{
					name: 'customize_your_look_right',
				}}>
				<div className={styles.image}>
					<Image src={image.image} alt={langData.title_right} />
				</div>
				<div className={styles.text}>
					<div className={styles.textContent}>
						<h2>{langData.title_right}</h2>
						<p>{langData.content_right}</p>
					</div>

					<button className={`${styles.ctaButton} ${styles.secondButton}`}>
						{langData.button_title_right}
					</button>
				</div>
			</Editable>
		</Link>
	);
};

RightBox.propTypes = {
	langData: PropTypes.object,
	data: PropTypes.object,
	image: PropTypes.object,
};

// @ts-ignore
RightBox = WithUi((ownProps) => {
	return {
		images: {
			[head(ownProps.images)]: 'image',
		},
	};
})(RightBox);

export default WithUi(uiProps)(RightBox);

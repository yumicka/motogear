/* eslint-disable react/prop-types */
import Link from 'core/navigation/link';
import styles from './MotocrossTyres.module.less';
import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			motocross_tyres: {
				langData: 'langData',
				data: 'data',
			},
		},
	};
};

const HeroVideoCard = ({ langData, data }) => {
	const src =
		'https://player.vimeo.com/video/776139052?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1';

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.card}>
					<Editable
						edit={{
							name: 'motocross_tyres',
						}}>
						<div className={styles.content}>
							<div className={styles.heading}>
								{langData.title}
							</div>
							<div className={styles.text}>
								{langData.content}
							</div>
							<div className={styles.footer}>
								<Link className={styles.button} to={data.link}>
									{langData.button_title}
								</Link>
							</div>
						</div>
					</Editable>

					<div className={styles.media}>
						<iframe
							className={styles.iframe}
							src={src}
							frameBorder="0"
							allow="autoplay; fullscreen; picture-in-picture"
							allowFullScreen
							title="Motocross tyres video"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(HeroVideoCard);


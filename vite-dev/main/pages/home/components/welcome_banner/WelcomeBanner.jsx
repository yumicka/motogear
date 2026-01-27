// @ts-nocheck
import styles from './WelcomeBanner.module.less';
import Content from './components/Content';
import getMainUrl from 'helpers/getMainUrl';

const rider = getMainUrl() + 'img/rider.jpg';

const WelcomeBanner = () => {
	return (
		<div
			className={styles.wrapper}
			style={{ '--bg-image': `url(${rider})` }}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					<Content />
				</div>
			</div>
		</div>
	);
};

export default WelcomeBanner;

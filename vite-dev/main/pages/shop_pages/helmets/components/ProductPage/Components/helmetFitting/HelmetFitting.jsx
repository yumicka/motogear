import styles from './HelmetFitting.module.less';

const HelmetFitting = () => {
	return (
		<div className={styles.content}>
			<div className={styles.videoWrapper}>
				<iframe
					src="https://player.vimeo.com/video/879341401"
					title="Helmet fitting video"
					frameBorder="0"
					allow="fullscreen; picture-in-picture"
					allowFullScreen
				/>
			</div>

			<div className={styles.vimeo_discription}>
				<h2>How to check if your helmet fits correctly?</h2>
				<p>
					Watch Max Hind go through a short introduction on how to correctly
					check and maximize the safety potential of your helmet! He will show
					you how to measure your head and what signs to look out for when a
					helmet is too big.
				</p>
			</div>
		</div>
	);
};

export default HelmetFitting;

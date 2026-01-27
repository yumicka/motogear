import Link from 'core/navigation/link';
import styles from './Content.module.less';
// import getMainUrl from 'helpers/getMainUrl';

// const rider = getMainUrl() + 'img/rider.jpg';

const Content = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					<div className={styles.text}>
						<div className={styles.label}>
							<h1>Welcome to 24MX</h1>
						</div>
						<div className={styles.paragraph}>
							<p>
								<strong>
									We are more than just Europe’s largest Motocross and Enduro
									Store.
								</strong>
								At 24MX, you will find a wide range of products for both you and
								your bike, regardless of whether you are a beginner or a
								professional. We offer the world’s hottest brands within these
								sports for competitive prices. In addition to this, we carry our
								own high-quality <Link>brands</Link> at consistently best
								prices.
							</p>
							<p>
								<strong>Find the right parts immediately.</strong> You can easily see products
								made specifically for your bike by selecting its make, model and
								year in our <Link>Fit My Bike function</Link>. Doing this allows you to see only parts that are
								compatible with your bike. <Link>Click here to start browsing our parts</Link>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Content;

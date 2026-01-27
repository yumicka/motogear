import styles from './ShopHelmets.module.less';
import { Outlet } from 'react-router-dom';
import Elements from './components/Elements/Element';

const PlasticKitsSample = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.header}>
					<Elements />
				</div>

				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PlasticKitsSample;

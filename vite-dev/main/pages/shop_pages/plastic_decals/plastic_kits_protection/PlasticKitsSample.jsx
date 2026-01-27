import styles from './PlasticKitsSample.module.less';
import PlasticFilter from '../components/filter/PlasticFilter';
import { Outlet } from 'react-router-dom';

const PlasticKitsSample = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.filter}>
					<PlasticFilter />
				</div>

				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PlasticKitsSample;

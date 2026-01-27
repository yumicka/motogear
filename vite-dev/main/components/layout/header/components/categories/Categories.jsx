import styles from './Categories.module.less';
import { Link } from 'react-router-dom';

const Categories = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<Link to="/shopHelmet" className={styles.category}>Helmets</Link>
				<div className={styles.category}>Motocross Gear</div>
				<Link to="/plasticsDecals" className={styles.category}>Plastics & Decals</Link>
				<div className={styles.category}>Tyres & Wheels</div>
				<div className={styles.category}>Oils & Lubricants</div>
				<div className={styles.category}>Motocross Parts</div>
				<div className={styles.category}>Accessories</div>
			</div>
		</div>
	);
};

export default Categories;

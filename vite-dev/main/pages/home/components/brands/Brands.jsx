import styles from './Brands.module.less';
import Brands_list from './components/Brands_list';

const Brands = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.title}>
					<h2>Our wide range of brands</h2>
				</div>

				<div className={styles.content}>
					<Brands_list />
				</div>
			</div>
		</div>
	);
};

export default Brands;

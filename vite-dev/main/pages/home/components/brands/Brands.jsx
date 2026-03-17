import styles from './Brands.module.less';
import Brands_list from './components/Brands_list';

const Brands = ({brands}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.title}>
					<h2>{_g.lang('wide_range')}</h2>
				</div>

				<div className={styles.content}>
					<Brands_list brands={brands}/>
				</div>
			</div>
		</div>
	);
};

export default Brands;

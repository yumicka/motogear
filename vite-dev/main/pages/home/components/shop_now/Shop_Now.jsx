// @ts-nocheck
import styles from './Snop_Now.module.less';
import Content from './components/content/content';

const ShopNow = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.titleSection}>
					<Content />
				</div>
			</div>
		</div>
	);
};

export default ShopNow;

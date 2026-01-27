/* eslint-disable react/prop-types */
import styles from './Top_sellers.module.less';

const TopSellers = ({ title, children }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.titleSection}>
					{typeof title === 'string' ? <h2>{title}</h2> : title}
				</div>

				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default TopSellers;

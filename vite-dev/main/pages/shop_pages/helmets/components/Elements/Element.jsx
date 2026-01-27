import ContentHeader from '../Elements/ContentHeader/ContentHeader';
import FilterElement from './Filter/FilterElement';
import styles from './Elements.module.less';

const Elements = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.content}>
					<div>
						<ContentHeader />
					</div>

					<div>
						<FilterElement />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Elements;

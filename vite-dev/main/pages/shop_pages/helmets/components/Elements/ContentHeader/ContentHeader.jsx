import { useParams } from 'react-router-dom';
import styles from './ContentHeader.module.less';

const CATEGORY_TITLES = {
	'motocross': 'Motocross Helmets',
	'adventure': 'Adventure Helmets',
	'trial': 'Trial Helmets',
	'accessories': 'Helmets Parts & Accessories',
};

const ContentHeader = () => {
	const { category } = useParams();

	const title = category
		? CATEGORY_TITLES[category]
		: 'All Helmets';

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div>
					<p>Helmets /</p>
				</div>

				<div>
					<h3>{title}</h3>
				</div>
			</div>
		</div>
	);
};

export default ContentHeader;

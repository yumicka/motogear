import Link from 'core/navigation/link';
import styles from './Categories.module.less';
import getMainUrl from 'helpers/getMainUrl';
import WithUi from 'hoc/store/ui';
// import { Link } from 'react-router-dom';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
	};
};

const Categories = ({ categories }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				{categories.map((category) => {
					return (
						<Link
							key={category.id}
							to={getMainUrl(true) + 'veikals?categoryId=' + category.id}
							className={styles.category}>
							{category.title}
						</Link>
					);
				})}
				
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Categories);
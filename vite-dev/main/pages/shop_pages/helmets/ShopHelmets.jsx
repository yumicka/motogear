import { useState } from 'react';
import Elements from './components/Elements/Element';
import styles from './ShopHelmets.module.less';
import WithUi from 'hoc/store/ui';
import HelmetsPage from './components/ShopHelmetsPages/HelmetsPage';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
	};
};

const ShopHelmet = ({ categories }) => {
	const [activeId, setActiveId] = useState(null);
	const searchParams = new URLSearchParams(window.location.search);
	const categoryId = Number(searchParams.get('categoryId'));

	// const title = CATEGORY_TITLES[categoryId] ?? 'Shop';

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.header}>
					<Elements
						categoryId={categoryId}
						activeId={activeId}
						setActiveId={setActiveId}
						categories={categories}
					/>
				</div>

				<div className={styles.content}>
					<HelmetsPage categoryId={activeId ?? categoryId} />
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(ShopHelmet);

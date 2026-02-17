/* eslint-disable react/prop-types */
import { useState } from 'react';
import Elements from './components/Elements/Element';
import styles from './Shop.module.less';
import WithUi from 'hoc/store/ui';
import Page from './components/ShopPage/Page';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
	};
};

const Shop = ({ categories }) => {
	const [activeId, setActiveId] = useState(null);
	const searchParams = new URLSearchParams(window.location.search);
	const categoryId = Number(searchParams.get('categoryId'));

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
					<Page categoryId={activeId ?? categoryId} />
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Shop);

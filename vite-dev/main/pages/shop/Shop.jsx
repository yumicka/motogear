/* eslint-disable react/prop-types */
import { useState } from 'react';
import Elements from './components/Elements/Element';
import styles from './Shop.module.less';
import WithUi from 'hoc/store/ui';
import Page from './components/ShopPage/Page';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
		brands: 'brands',
	};
};

const Shop = ({ categories, brands }) => {
	const [activeId, setActiveId] = useState(null);
	const [filters, setFilters] = useState({
		brands: [],
		price_range: null,
		sizes: [],
	});
	const [productCount, setProductCount] = useState();
	const searchParams = new URLSearchParams(window.location.search);
	const categoryId = Number(searchParams.get('categoryId'));

	return (
		<div className={styles.wrapper}>
			<div className="pageFade">
				<div className={styles.innerWrapper}>
					<div className={styles.header}>
						<Elements
							categoryId={categoryId}
							activeId={activeId}
							setActiveId={setActiveId}
							categories={categories}
							filters={filters}
							setFilters={setFilters}
							brands={brands}
							productCount={productCount}
						/>
					</div>

					<div className={styles.content}>
						<Page
							categoryId={activeId ?? categoryId}
							filters={filters}
							setProductCount={setProductCount}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Shop);

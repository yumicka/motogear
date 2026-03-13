import ContentHeader from '../Elements/ContentHeader/ContentHeader';
import CategoriesElement from './Categories/CategoriesElement';
import styles from './Elements.module.less';

import PropTypes from 'prop-types';
import Filters from './Filter/Filters';

const Elements = ({
	categoryId,
	activeId,
	setActiveId,
	categories,
	filters,
	setFilters,
	productCount,
	brands,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.content}>
					<div>
						<ContentHeader
							categoryId={categoryId}
							activeId={activeId}
							categories={categories}
						/>
					</div>

					<div>
						<CategoriesElement
							categoryId={categoryId}
							activeId={activeId}
							setActiveId={setActiveId}
							categories={categories}
						/>
					</div>

					<div>
						<Filters
							filters={filters}
							setFilters={setFilters}
							productCount={productCount}
							brands={brands}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

Elements.propTypes = {
	categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	setActiveId: PropTypes.func,
	categories: PropTypes.array,
	filters: PropTypes.object,
	setFilters: PropTypes.func,
	productCount: PropTypes.number,
};

export default Elements;

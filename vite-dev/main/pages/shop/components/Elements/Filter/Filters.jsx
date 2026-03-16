import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './Filters.module.less';

// const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40'];

const PRODUCT_AGE_OPTIONS = [
	{ value: 'new', label: _g.lang('new_products') || 'New' },
	{ value: 'old', label: _g.lang('old_products') || 'Old' },
];

const Filters = ({ filters, setFilters, productCount, brands }) => {
	const [minPrice, setMinPrice] = useState(filters?.price_range?.[0] ?? '');
	const [maxPrice, setMaxPrice] = useState(filters?.price_range?.[1] ?? '');
	const [openDropdown, setOpenDropdown] = useState(null);

	const BRAND_OPTIONS =
		brands?.map((brand) => ({
			id: brand.id,
			label: brand.brand_name,
		})) || [];

	useEffect(() => {
		setMinPrice(filters?.price_range?.[0] ?? '');
		setMaxPrice(filters?.price_range?.[1] ?? '');
	}, [filters?.price_range]);

	const toggleDropdown = (key) => {
		setOpenDropdown((prev) => (prev === key ? null : key));
	};

	const toggleArrayFilter = (key, value) => {
		const currentValues = filters?.[key] || [];
		const exists = currentValues.includes(value);

		setFilters({
			...filters,
			[key]: exists
				? currentValues.filter((item) => item !== value)
				: [...currentValues, value],
		});
	};

	const setSingleFilter = (key, value) => {
		setFilters({
			...filters,
			[key]: filters?.[key] === value ? null : value,
		});
	};

	const applyPriceFilter = () => {
		const min = Number(minPrice);
		const max = Number(maxPrice);

		if (minPrice === '' && maxPrice === '') {
			setFilters({
				...filters,
				price_range: null,
			});
			return;
		}

		if (!Number.isNaN(min) && !Number.isNaN(max) && max >= min) {
			setFilters({
				...filters,
				price_range: [min, max],
			});
			setOpenDropdown(null);
		}
	};

	const clearPriceFilter = () => {
		setFilters({
			...filters,
			price_range: null,
		});
		setMinPrice('');
		setMaxPrice('');
	};

	const resetAllFilters = () => {
		setFilters({
			brands: [],
			price_range: null,
			sizes: [],
			product_age: null,
		});
		setMinPrice('');
		setMaxPrice('');
		setOpenDropdown(null);
	};

	const getBrandsLabel = () => {
		const count = filters?.brands?.length || 0;
		return count > 0 ? `${_g.lang('brands')} (${count})` : _g.lang('brands');
	};

	// const getSizesLabel = () => {
	// 	const count = filters?.sizes?.length || 0;
	// 	return count > 0 ? `${_g.lang('size')} (${count})` : _g.lang('size');
	// };

	const getPriceLabel = () => {
		if (filters?.price_range) {
			return `${_g.lang('price')} ${filters.price_range[0]}€ - ${filters.price_range[1]}€`;
		}
		return _g.lang('price');
	};

	const getProductAgeLabel = () => {
		if (filters?.product_age === 'new') {
			return _g.lang('new_products') ;
		}

		if (filters?.product_age === 'old') {
			return _g.lang('old_products');
		}

		return _g.lang('product_type');
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.content}>
					<div className={styles.filtersBox}>
						<div className={styles.dropdown}>
							<button
								type="button"
								className={styles.dropdownButton}
								onClick={() => toggleDropdown('brands')}>
								<span>{getBrandsLabel()}</span>
								<span
									className={`${styles.arrow} ${openDropdown === 'brands' ? styles.arrowOpen : ''}`}>
									⌄
								</span>
							</button>

							{openDropdown === 'brands' && (
								<div className={styles.dropdownMenu}>
									{BRAND_OPTIONS.map((brand) => (
										<label key={brand.id} className={styles.option}>
											<input
												type="checkbox"
												checked={filters?.brands?.includes(brand.id)}
												onChange={() => toggleArrayFilter('brands', brand.id)}
											/>
											<span>{brand.label}</span>
										</label>
									))}
								</div>
							)}
						</div>

						<div className={styles.dropdown}>
							<button
								type="button"
								className={styles.dropdownButton}
								onClick={() => toggleDropdown('price')}>
								<span>{getPriceLabel()}</span>
								<span
									className={`${styles.arrow} ${openDropdown === 'price' ? styles.arrowOpen : ''}`}>
									⌄
								</span>
							</button>

							{openDropdown === 'price' && (
								<div className={styles.dropdownMenu}>
									<div className={styles.priceInputs}>
										<input
											type="number"
											placeholder="Min"
											value={minPrice}
											onChange={(e) => setMinPrice(e.target.value)}
											className={styles.priceInput}
										/>
										<input
											type="number"
											placeholder="Max"
											value={maxPrice}
											onChange={(e) => setMaxPrice(e.target.value)}
											className={styles.priceInput}
										/>
									</div>

									<div className={styles.priceActions}>
										<button
											type="button"
											className={styles.applyBtn}
											onClick={applyPriceFilter}>
											{_g.lang('apply')}
										</button>

										<button
											type="button"
											className={styles.clearBtn}
											onClick={clearPriceFilter}>
											{_g.lang('clear')}
										</button>
									</div>
								</div>
							)}
						</div>

						{/* <div className={styles.dropdown}>
							<button
								type="button"
								className={styles.dropdownButton}
								onClick={() => toggleDropdown('sizes')}>
								<span>{getSizesLabel()}</span>
								<span
									className={`${styles.arrow} ${openDropdown === 'sizes' ? styles.arrowOpen : ''}`}>
									⌄
								</span>
							</button>

							{openDropdown === 'sizes' && (
								<div className={styles.dropdownMenu}>
									{SIZE_OPTIONS.map((size) => (
										<label key={size} className={styles.option}>
											<input
												type="checkbox"
												checked={filters?.sizes?.includes(size)}
												onChange={() => toggleArrayFilter('sizes', size)}
											/>
											<span>{size}</span>
										</label>
									))}
								</div>
							)}
						</div> */}

						<div className={styles.dropdown}>
							<button
								type="button"
								className={styles.dropdownButton}
								onClick={() => toggleDropdown('product_age')}>
								<span>{getProductAgeLabel()}</span>
								<span
									className={`${styles.arrow} ${openDropdown === 'product_age' ? styles.arrowOpen : ''}`}>
									⌄
								</span>
							</button>

							{openDropdown === 'product_age' && (
								<div className={styles.dropdownMenu}>
									{PRODUCT_AGE_OPTIONS.map((item) => (
										<label key={item.value} className={styles.option}>
											<input
												type="radio"
												name="product_age"
												checked={filters?.product_age === item.value}
												onChange={() => setSingleFilter('product_age', item.value)}
											/>
											<span>{item.label}</span>
										</label>
									))}

									<button
										type="button"
										className={styles.clearBtn}
										onClick={() => setSingleFilter('product_age', null)}>
										{_g.lang('clear')}
									</button>
								</div>
							)}
						</div>

						<button
							type="button"
							className={styles.resetBtn}
							onClick={resetAllFilters}>
							{_g.lang('reset_filters')}
						</button>
					</div>

					<div className={styles.productCount}>
						<p>
							{productCount} {_g.lang('products')}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

Filters.propTypes = {
	filters: PropTypes.object,
	setFilters: PropTypes.func,
	productCount: PropTypes.number,
	brands: PropTypes.array,
};

export default Filters;
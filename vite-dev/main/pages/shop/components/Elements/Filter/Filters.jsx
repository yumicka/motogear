import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './Filters.module.less';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40'];

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
		});
		setMinPrice('');
		setMaxPrice('');
		setOpenDropdown(null);
	};

	const getBrandsLabel = () => {
		const count = filters?.brands?.length || 0;
		return count > 0 ? `Brands (${count})` : 'Brands';
	};

	const getSizesLabel = () => {
		const count = filters?.sizes?.length || 0;
		return count > 0 ? `Size (${count})` : 'Size';
	};

	const getPriceLabel = () => {
		if (filters?.price_range) {
			return `Price: ${filters.price_range[0]}€ - ${filters.price_range[1]}€`;
		}
		return 'Price';
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
											Apply
										</button>

										<button
											type="button"
											className={styles.clearBtn}
											onClick={clearPriceFilter}>
											Clear
										</button>
									</div>
								</div>
							)}
						</div>

						<div className={styles.dropdown}>
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
						</div>
					</div>

					<div className={styles.productCount}>
						<p>
							{productCount} {_g.lang('products')}
						</p>

						<button
							type="button"
							className={styles.resetBtn}
							onClick={resetAllFilters}>
							Reset filters
						</button>
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
};

export default Filters;

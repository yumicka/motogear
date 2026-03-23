/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './Page.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeftLong,
	faArrowRightLong,
	faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';
import { useEffect, useMemo, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const formatPrice = (n) => Number(n).toFixed(2);

const uiProps = () => ({ products: 'products' });

const RESULTS_PER_PAGE = 40;
const MAX_VISIBLE_PAGES = 7;

function getPageItems(current, last, maxVisible = 7) {
	if (last <= maxVisible) return Array.from({ length: last }, (_, i) => i + 1);

	const pages = [];
	const half = Math.floor(maxVisible / 2);

	let start = Math.max(1, current - half);
	let end = Math.min(last, current + half);

	const windowSize = end - start + 1;
	if (windowSize < maxVisible) {
		const missing = maxVisible - windowSize;
		start = Math.max(1, start - missing);
		end = Math.min(last, end + (missing - (start === 1 ? 0 : 0)));
	}

	start = Math.max(1, start);
	end = Math.min(last, end);

	if (start > 1) {
		pages.push(1);
		if (start > 2) pages.push('...');
	}

	for (let p = start; p <= end; p++) pages.push(p);

	if (end < last) {
		if (end < last - 1) pages.push('...');
		pages.push(last);
	}

	return pages;
}

const Page = ({ categoryId, filters, setProductCount }) => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchPage = (page) => {
		setLoading(true);

		remoteRequest({
			url: 'products/search',
			data: {
				category_id: categoryId,
				results_per_page: RESULTS_PER_PAGE,
				page: page,
				filters: filters,
			},
			onSuccess: (response) => {
				setLoading(false);
				setProducts(response.rows || []);
				setLastPage(response.lastPage || 1);
				setProductCount(response.total);
				setCurrentPage(page);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			},
			onError: () => {
				setLoading(false);
				setProducts([]);
				setLastPage(1);
				setCurrentPage(1);
			},
		});
	};

	useEffect(() => {
		fetchPage(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, filters]);

	const pageItems = useMemo(
		() => getPageItems(currentPage, lastPage, MAX_VISIBLE_PAGES),
		[currentPage, lastPage],
	);

	const canPrev = currentPage > 1;
	const canNext = currentPage < lastPage;

	if (loading)
		return (
			<div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
				<ThreeDots height="80" width="80" color="#adadad" />
			</div>
		);

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.container}>
					{products.map((item) => {
						const isAvailable = item.is_available;
						const imgSrc = item.image?.image;
						const originalPrice = parseFloat(item.product_price);
						const discount = parseFloat(item.product_discount) || 0;
						const hasDiscount = discount !== 0 && !isNaN(discount);
						const calculatedPrice = item.calculated_price;

						return (
							<Link to={item.url} className={`${styles.card} ${!isAvailable ? styles.unavailableCard : ''}`} key={item.id}>
								<div className={styles.imageWrap}>
									<Image
										src={imgSrc}
										alt={item.title}
										className={styles.image}
									/>
									{!isAvailable && (
										<div className={styles.outOfStockBadge}>Out of stock</div>
									)}
								</div>

								<div className={styles.text}>
									<div className={styles.actual_price}>
										<p
											className={
												hasDiscount
													? styles.price_now_discounted
													: styles.price_now
											}>
											<FontAwesomeIcon icon={faEuroSign} />
											{formatPrice(calculatedPrice)}
										</p>

										{hasDiscount && (
											<p className={styles.discount}>-{discount}%</p>
										)}
									</div>

									{hasDiscount && (
										<p className={styles.price_old}>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(originalPrice)}
										</p>
									)}

									<div className={styles.title}>
										<p>{item.title}</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>

				{/* Pagination */}
				{lastPage > 1 && (
					<div className={styles.pagination}>
						<button
							className={styles.pageBtn}
							disabled={!canPrev}
							onClick={() => canPrev && fetchPage(currentPage - 1)}>
							<FontAwesomeIcon icon={faArrowLeftLong} />
						</button>

						{pageItems.map((p, idx) =>
							p === '...' ? (
								<span key={`dots-${idx}`} className={styles.dots}>
									…
								</span>
							) : (
								<button
									key={p}
									className={`${styles.pageBtn} ${p === currentPage ? styles.activePage : ''}`}
									onClick={() => fetchPage(p)}>
									{p}
								</button>
							),
						)}

						<button
							className={styles.pageBtn}
							disabled={!canNext}
							onClick={() => canNext && fetchPage(currentPage + 1)}>
							<FontAwesomeIcon icon={faArrowRightLong} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Page);

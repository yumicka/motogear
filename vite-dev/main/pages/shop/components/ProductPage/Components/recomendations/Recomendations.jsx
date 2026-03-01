/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './Recomendations.module.less';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import Link from 'core/navigation/link';

const formatPrice = (n) => Number(n).toFixed(2);

const Recomendations = ({ product }) => {
	const [sizesMap, setSizesMap] = useState({});
	const [items, setItems] = useState([]);
	const [toast, setToast] = useState(null);
	const [toastType, setToastType] = useState('success');

	const helmetsCategoryId = useMemo(() => {
		return product?.categories?.find(
			(c) => c.title?.trim().toLowerCase() === 'helmets',
		)?.id;
	}, [product]);

	useEffect(() => {
		if (!helmetsCategoryId) {
			setItems([]);
			return;
		}

		remoteRequest({
			url: 'products/search',
			data: {
				category_id: helmetsCategoryId,
				results_per_page: 10,
				page: 1,
				order_by: 'id',
				order_dir: 'desc',
			},
			onSuccess: (response) => {
				const rows = response.rows || [];
				const latest = rows.filter((p) => p.id !== product?.id).slice(0, 2);
				setItems(latest);
			},
			onError: () => {
				setItems([]);
			},
		});
	}, [helmetsCategoryId, product?.id]);

	if (!items.length) return null;

	const addToCart = (item) => {
		const selectedSize = sizesMap[item.id];

		if (item.sizes?.length && !selectedSize) {
			setToastType('error');
			setToast('Please select size for the product!');
			setTimeout(() => setToast(null), 5000);
			return;
		}

		remoteRequest({
			url: 'cart/actions',
			data: {
				action: 'add',
				product_id: item.id,
				quantity: 1,
				variant_id: selectedSize ? Number(selectedSize) : 0,
			},
			onSuccess: (response) => {
				uiStore.set('cart', response.cart);
				setToastType('success');
				setToast('Product has been added to cart!');
				setTimeout(() => setToast(null), 5000);
			},
			onError: (err) => {
				setToastType('error');
				setToast('Product has not been added to cart!');
				setTimeout(() => setToast(null), 5000);
			},
		});
	};

	return (
		<div className={styles.content}>
			{toast && (
				<div
					className={styles.toast}
					style={{
						background: toastType === 'error' ? '#e74c3c' : '#2bbc68',
					}}>
					{toast}
				</div>
			)}
			<div className={styles.title}>
				<p>You may also like...</p>
			</div>

			<div className={styles.container}>
				{items.map((item) => {
					const SIZES = item.sizes || [];
					const imgSrc = item.image?.image;
					const price = Number(item.product_price) || 0;
					const discount = Number(item.product_discount) || 0;

					const hasDiscount = discount > 0;
					const discountedPrice = hasDiscount
						? price * (1 - discount / 100)
						: price;

					return (
						<div key={item.id} className={styles.container_box}>
							<Link to={item.url} className={styles.images}>
								<Image src={imgSrc} alt={item.title} />
							</Link>

							<div className={styles.discription}>
								<Link to={item.url} className={styles.name}>
									<h3>{item.title}</h3>
								</Link>

								<div className={styles.price}>
									<h4
										className={
											hasDiscount
												? styles.discounted_price
												: styles.normal_price
										}>
										<FontAwesomeIcon icon={faEuroSign} />
										{formatPrice(discountedPrice)}
									</h4>

									{hasDiscount && (
										<p className={styles.old_price}>
											<FontAwesomeIcon icon={faEuroSign} /> {formatPrice(price)}
										</p>
									)}

									{SIZES.length > 0 && (
										<div className={styles.size_block}>
											<select
												className={styles.size_select}
												value={sizesMap[item.id] || ''}
												onChange={(e) =>
													setSizesMap((prev) => ({
														...prev,
														[item.id]: e.target.value,
													}))
												}>
												<option value="" disabled>
													Select size
												</option>
												{SIZES.map((s) => (
													<option key={s.id} value={s.id}>
														{s.product_size}
													</option>
												))}
											</select>
										</div>
									)}
								</div>

								<button className={styles.btn} onClick={() => addToCart(item)}>
									Add to cart
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Recomendations;

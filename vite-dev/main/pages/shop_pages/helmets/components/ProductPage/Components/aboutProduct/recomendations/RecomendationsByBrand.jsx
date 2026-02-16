/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './RecomendationsByBrand.module.less';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Link from 'core/navigation/link';

const formatPrice = (n) => Number(n).toFixed(2);

const RecomendationsByBrand = ({ product, specifications }) => {
	const [items, setItems] = useState([]);

	const selectedBrand =
		specifications
			.find((spec) => {
				const title = (spec.title || '').trim().toLowerCase();
				return title === 'brand' || title === 'brends' || title === 'бренд';
			})
			?.content?.trim() || '';

	useEffect(() => {
		if (!selectedBrand) {
			setItems([]);
			return;
		}

		remoteRequest({
			url: 'products/searchByBrand',
			data: {
				brand: selectedBrand,
				results_per_page: 5,
				page: 1,
			},
			onSuccess: (response) => {
				const rows = response.rows || [];

				const filtered = rows.filter((p) => p.id !== product?.id);
				setItems(filtered.slice(0, 3));
			},
			onError: () => setItems([]),
		});
	}, [selectedBrand, product?.id]);

	if (!items.length) return null;

	return (
		<div className={styles.content}>
			<div className={styles.container}>
				{items.map((item) => {
					const imgSrc = item.image?.image;
					const originalPrice = Number(item.product_price) || 0;
					const discount = Number(item.product_discount) || 0;

					const hasDiscount = discount > 0;
					const currentPrice = hasDiscount
						? originalPrice * (1 - discount / 100)
						: originalPrice;

					return (
						<Link to={item.url} key={item.id} className={styles.container_box}>
							<div className={styles.images}>
								<Image src={imgSrc} alt={item.title} />
							</div>

							<div className={styles.text}>
								<div className={styles.price_box}>
									<p
										className={
											hasDiscount
												? styles.price_now_discounted
												: styles.price_now
										}>
										<FontAwesomeIcon icon={faEuroSign} />
										{formatPrice(currentPrice)}
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
							</div>

							<div className={styles.discription}>
								<div className={styles.name}>
									<h3>{item.title}</h3>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default RecomendationsByBrand;

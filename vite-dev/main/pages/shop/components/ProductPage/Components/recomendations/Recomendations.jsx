/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './Recomendations.module.less';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import Link from 'core/navigation/link';

const formatPrice = (n) => Number(n).toFixed(2);

const Recomendations = ({ product }) => {
	const [items, setItems] = useState([]);

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

	return (
		<div className={styles.content}>
			<div className={styles.title}>
				<p>You may also like...</p>
			</div>

			<div className={styles.container}>
				{items.map((item) => {
					const imgSrc = item.image?.image;
					const price = Number(item.product_price) || 0;
					const discount = Number(item.product_discount) || 0;

					const hasDiscount = discount > 0;
					const discountedPrice = hasDiscount
						? price * (1 - discount / 100)
						: price;

					return (
						<Link to={item.url} key={item.id} className={styles.container_box}>
							<div className={styles.images}>
								<Image src={imgSrc} alt={item.title} />
							</div>

							<div className={styles.discription}>
								<div className={styles.name}>
									<h3>{item.title}</h3>
								</div>

								<div className={styles.price}>
									<h4 className={hasDiscount ? styles.discounted_price : styles.normal_price}>
										<FontAwesomeIcon icon={faEuroSign} />
										{formatPrice(discountedPrice)}
									</h4>

									{hasDiscount && (
										<p className={styles.old_price}>
											<FontAwesomeIcon icon={faEuroSign} /> {formatPrice(price)}
										</p>
									)}
								</div>

								<button className={styles.btn}>Add to cart</button>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Recomendations;

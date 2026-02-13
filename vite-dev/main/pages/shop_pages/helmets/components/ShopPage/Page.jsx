/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './Page.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const formatPrice = (n) => Number(n).toFixed(2);

const uiProps = (ownProps) => {
	return {
		products: 'products',
	};
};

const Page = ({ categoryId }) => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		setLoading(true);

		remoteRequest({
			url: 'products/search',
			data: {
				category_id: categoryId,
				results_per_page: 30,
				page: 1,
			},
			onSuccess: (response) => {
				setLoading(false);
				setProducts(response.rows || []);
				setLastPage(response.lastPage || 1);
			},
			onError: () => {
				setLoading(false);
				setProducts([]);
			},
		});
	}, [categoryId]);
	

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
						const imgSrc = item.image?.image;
						const price = parseFloat(item.product_price);
						const discount = parseFloat(item.product_discount);
						const discountedPrice = discount
							? price * (1 - discount / 100)
							: price;

						return (
							<Link to={item.url} className={styles.card} key={item.id}>
								<div className={styles.imageWrap}>
									<Image
										src={imgSrc}
										alt={item.title}
										className={styles.image}
									/>
								</div>

								<div className={styles.text}>
									<div className={styles.actual_price}>
										<p className={styles.price_now}>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(discountedPrice)}
										</p>

										{item.product_discount && (
											<p className={styles.discount}>-{discount}%</p>
										)}
									</div>

									{discountedPrice && (
										<p className={styles.price_old}>
											<FontAwesomeIcon icon={faEuroSign} /> {formatPrice(price)}
										</p>
									)}

									<div className={styles.rating}>
										<span>{item.rating}</span>
										<p>{item.reviews} Reviews</p>
									</div>

									<div className={styles.title}>
										<p>{item.title}</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Page);

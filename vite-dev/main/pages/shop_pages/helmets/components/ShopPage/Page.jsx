/* eslint-disable react/prop-types */
import Image from 'ui/media/image';
import styles from './Page.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';

const formatPrice = (n) => Number(n).toFixed(2);

const uiProps = (ownProps) => {
	return {
		products: 'products',
	};
};

const Page = ({ categoryId, products }) => {

	const filtredProducts = products.filter((product) => {
		if (product.subCategory === categoryId) {
			return true;
		}

		if (product.category === categoryId) {
			return true;
		}

		return false;
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.container}>
					{filtredProducts.map((item) => {
						const imgSrc = item.image?.image;
						const price = parseFloat(item.product_price); // обычная цена
						const discount = parseFloat(item.product_discount); // % скидки
						const discountedPrice = discount ? price * (1 - discount / 100) : price;

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
											<p className={styles.discount}>
												-{discount}%
											</p>
										)}
									</div>

									{discountedPrice && (
										<p className={styles.price_old}>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(price)}
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

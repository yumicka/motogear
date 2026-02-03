import Image from 'ui/media/image';
import styles from './HelmetsPage.module.less';
import getMainUrl from 'helpers/getMainUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import WithUi from 'hoc/store/ui';

const formatPrice = (n) => Number(n).toFixed(2);



const uiProps = (ownProps) => {
	return {
		products: 'products',
	};
};


const HelmetsPage = ({categoryId, products}) => {
	console.log(products);

	const filtredProducts = products.filter((product) => {
		if (product.subCategory === categoryId) {
			return true;
		}

		if (product.category === categoryId) {
			return true;
		}

		return false;
	});
	// const { category } = useParams();

	// const categoryName = category ? CATEGORY_MAP[category] : null;

	// const filteredItems = categoryName
	// 	? items.filter((item) => item.category === categoryName)
	// 	: items;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.container}>
					{filtredProducts.map((item) => {
						const imgSrc = item.image?.image;

						const oldPrice = item.product_discount
							? item.product_price / (1 - item.product_discount / 100)
							: null;

						return (
							<Link to={`/shopHelmet/product/${item.id}`} className={styles.card} key={item.id}>
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
											{formatPrice(item.product_price)}
										</p>

										{item.product_discount && (
											<p className={styles.discount}>-{item.product_discount}%</p>
										)}
									</div>

									{oldPrice && (
										<p className={styles.price_old}>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(oldPrice)}
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

export default WithUi(uiProps)(HelmetsPage);

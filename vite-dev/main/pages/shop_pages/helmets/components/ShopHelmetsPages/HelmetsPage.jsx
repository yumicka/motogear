import Image from 'ui/media/image';
import styles from './HelmetsPage.module.less';
import getMainUrl from 'helpers/getMainUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import items from '../../helmets_items.json';

const formatPrice = (n) => Number(n).toFixed(2);

const CATEGORY_MAP = {
	'motocross': 'Motocross Helmets',
	'adventure': 'Adventure Helmets',
	'trial': 'Trial Helmets',
	'accessories': 'Helmets Parts & Accessories',
};


const HelmetsPage = () => {
	const { category } = useParams();

	const categoryName = category ? CATEGORY_MAP[category] : null;

	const filteredItems = categoryName
		? items.filter((item) => item.category === categoryName)
		: items;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.container}>
					{filteredItems.map((item) => {
						const imgSrc = getMainUrl() + item.preview_image;

						const oldPrice = item.discount
							? item.price / (1 - item.discount / 100)
							: null;

						return (
							<Link to={`/shopHelmet/product/${item.id}`} className={styles.card} key={item.id}>
								<div className={styles.imageWrap}>
									<Image
										src={imgSrc}
										alt={item.name}
										className={styles.image}
									/>
								</div>

								<div className={styles.text}>
									<div className={styles.actual_price}>
										<p className={styles.price_now}>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(item.price)}
										</p>

										{item.discount && (
											<p className={styles.discount}>-{item.discount}%</p>
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
										<p>{item.name}</p>
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

export default HelmetsPage;

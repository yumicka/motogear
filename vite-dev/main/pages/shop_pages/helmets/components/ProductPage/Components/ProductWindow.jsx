import styles from './ProductWindow.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBagShopping,
	faBoltLightning,
	faCircleCheck,
	faDollarSign,
	faRepeat,
	faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import items from '../../../helmets_items.json';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductWindow = () => {
	const { id } = useParams();
	const product = items.find((item) => item.id === Number(id));

	if (!product) {
		return <div>Product not found</div>;
	}

	const title = product.name;
	const rating = product.rating;
	const reviews = product.reviews;
	const imageSrc = getMainUrl() + product.preview_image;
	const discount = product.discount;
	const price = product.price;

	const oldPrice = product.discount
		? product.price / (1 - product.discount / 100)
		: null;

	const savings = oldPrice - price;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [size, setSize] = useState('');
	return (
		<div className={styles.content}>
			<div className={styles.discription}>
				<h1 className={styles.title}>{title}</h1>

				<div className={styles.reviews}>
					<span className={styles.stars}>{rating}</span>
					<span className={styles.text}>{reviews} Reviews</span>
				</div>

				<div className={styles.qualities}>
					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faBoltLightning} />
						</div>
						<div className={styles.text}>Fast deliveries to Latvia</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faCircleCheck} />
						</div>
						<div className={styles.text}>Lowest Price Guarantee</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faDollarSign} />
						</div>
						<div className={styles.text}>Free shipping over €150*</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faRepeat} />
						</div>
						<div className={styles.text}>60-day return policy*</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faBagShopping} />
						</div>
						<div className={styles.text}>Huge Assortment</div>
					</div>
				</div>
			</div>

			<div className={styles.image}>
				<Image src={imageSrc} />
			</div>

			<div className={styles.price}>
				<p className={styles.discount}>-{discount}%</p>
				<h2 className={styles.discounted_price}>
					<FontAwesomeIcon icon={faEuroSign} /> {price.toFixed(2)}
				</h2>
				<div className={styles.price_box}>
					<span className={styles.price_now}>
						<FontAwesomeIcon icon={faEuroSign} />
						{oldPrice.toFixed(2)}
					</span>
					<span className={styles.save}>
						You save <FontAwesomeIcon icon={faEuroSign} /> {savings.toFixed(2)}
					</span>
				</div>

				<div className={styles.size_block}>
					<select
						className={styles.size_select}
						value={size}
						onChange={(e) => setSize(e.target.value)}>
						<option value="" disabled>
							Select size
						</option>

						{SIZES.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				<button className={styles.btn}>Add to cart</button>

				<div className={styles.shipment}>
					<span className={styles.latvia_icon} />

					<span className={styles.latvia_text}>Yes, we ship to Latvia</span>
				</div>
			</div>
		</div>
	);
};

export default ProductWindow;

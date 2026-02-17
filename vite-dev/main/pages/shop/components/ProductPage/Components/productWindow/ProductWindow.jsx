/* eslint-disable react/prop-types */
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

import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import Image from 'ui/media/image';
import { useState } from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductWindow = ({ product }) => {
	console.log(product);
	// const { id } = useParams();
	const productId = product.id;
	// const product = items.find((item) => item.id === Number(id));

	if (!productId) {
		return <div>Product not found</div>;
	}

	const title = product.title;
	const rating = product.rating || 4;
	const reviews = product.reviews || 10;
	const imageSrc = product.image?.image;
	const originalPrice = parseFloat(product.product_price);
	const discount = parseFloat(product.product_discount);
	const hasDiscount = discount > 0;

	let currentPrice = originalPrice;
	let savings = 0;
	if(hasDiscount){
		currentPrice = originalPrice * (1 - discount / 100);
		savings = originalPrice - currentPrice;
	}
	

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [size, setSize] = useState('');
	return (
		<div className={styles.content}>
			<div className={styles.discription}>
				<h1 className={styles.title}>{title}</h1>

				<div className={styles.reviews}>
					{[...Array(5)].map((_, i) => (
						<FontAwesomeIcon
							key={i}
							icon={i < rating ? fasStar : farStar}
							className={styles.star}
						/>
					))}
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
				{hasDiscount && <p className={styles.discount}>-{discount}%</p>}
				<h2 className={hasDiscount ? styles.discounted_price : styles.normal_price}>
					<FontAwesomeIcon icon={faEuroSign} /> {currentPrice.toFixed(2)}
				</h2>
				{hasDiscount && <div className={styles.price_box}>
					<span className={styles.price_now}>
						<FontAwesomeIcon icon={faEuroSign} />
						{originalPrice.toFixed(2)}
					</span>
					<span className={styles.save}>
						You save <FontAwesomeIcon icon={faEuroSign} />{savings.toFixed(2)}
					</span>
				</div>}

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

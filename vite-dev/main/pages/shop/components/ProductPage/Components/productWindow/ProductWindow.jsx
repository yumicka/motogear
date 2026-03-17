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

// import { faStar  } from '@fortawesome/free-solid-svg-icons';
import Image from 'ui/media/image';
import { useState } from 'react';
import WithUi from 'hoc/store/ui';

const uiProps = (ownProps) => {
	return {
		product: 'product',
		categories: 'categories',
		specifications: 'specifications',
		product_sizes: 'product_sizes',
	};
};

const ProductWindow = ({ product, product_sizes }) => {
	const SIZES = product_sizes;

	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [adding, setAdding] = useState(false);
	const [toast, setToast] = useState(null);
	const [toastType, setToastType] = useState('success');

	const productId = product?.id;
	const hasSizes = Array.isArray(SIZES) && SIZES.length > 0;

	if (!productId) {
		return <div>Product not found</div>;
	}

	const title = product.title;
	const imageSrc = product.image?.image;
	const originalPrice = parseFloat(product.product_price);
	const discount = parseFloat(product.product_discount);
	const calculatedPrice = parseFloat(product.calculated_price);
	const hasDiscount = discount > 0;

	// let currentPrice = originalPrice;
	let savings = 0;
	if (hasDiscount) {
		savings = originalPrice - calculatedPrice;
	}

	const addToCart = () => {
		if (!productId) return;

		if (hasSizes && !size) {
			setSizeError(true);
			return;
		}

		setAdding(true);
		setSizeError(false);

		remoteRequest({
			url: 'cart/actions',
			data: {
				action: 'add',
				product_id: productId,
				quantity: quantity,
				variant_id: hasSizes ? Number(size) : 0,
			},
			onSuccess: (response) => {
				setAdding(false);
				uiStore.set('cart', response.cart);
				setToastType('success');
				setToast(_g.lang('product_success'));
				setTimeout(() => setToast(null), 5000);
			},
			onError: (err) => {
				setAdding(false);
				setToastType('error');
				setToast(_g.lang('product_error'));
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
			<div className={styles.discription}>
				<h1 className={styles.title}>{title}</h1>

				{/* <div className={styles.reviews}>
					{[...Array(5)].map((_, i) => (
						<FontAwesomeIcon
							key={i}
							icon={i < rating ? fasStar : farStar}
							className={styles.star}
						/>
					))}
					<span className={styles.text}>{reviews} Reviews</span>
				</div> */}

				<div className={styles.qualities}>
					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faBoltLightning} />
						</div>
						<div className={styles.text}>{_g.lang('fast_deliveries')}</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faCircleCheck} />
						</div>
						<div className={styles.text}>{_g.lang('lowest_price')}</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faDollarSign} />
						</div>
						<div className={styles.text}>{_g.lang('free_shipping')}</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faRepeat} />
						</div>
						<div className={styles.text}>{_g.lang('return_policy')}</div>
					</div>

					<div className={styles.item}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faBagShopping} />
						</div>
						<div className={styles.text}>{_g.lang('assortment')}</div>
					</div>
				</div>
			</div>

			<div className={styles.image}>
				<Image src={imageSrc} />
			</div>

			<div className={styles.price}>
				{hasDiscount && <p className={styles.discount}>-{discount}%</p>}
				<h2
					className={
						hasDiscount ? styles.discounted_price : styles.normal_price
					}>
					<FontAwesomeIcon icon={faEuroSign} /> {calculatedPrice.toFixed(2)}
				</h2>
				{hasDiscount && (
					<div className={styles.price_box}>
						<span className={styles.price_now}>
							<FontAwesomeIcon icon={faEuroSign} />
							{originalPrice.toFixed(2)}
						</span>
						<span className={styles.save}>
							{_g.lang('save')} <FontAwesomeIcon icon={faEuroSign} />
							{savings.toFixed(2)}
						</span>
					</div>
				)}

				{hasSizes && (
					<div className={styles.size_block}>
						<select
							className={`${styles.size_select} ${sizeError ? styles.error : ''}`}
							value={size}
							onChange={(e) => {
								setSize(e.target.value);
								setSizeError(false);
							}}
							onFocus={() => setSizeError(false)}>
							<option value="" disabled>
								{_g.lang('select_size')}
							</option>

							{SIZES.map((s) => (
								<option key={s.id} value={s.id}>
									{s.product_size}
								</option>
							))}
						</select>
					</div>
				)}

				<button className={styles.btn} onClick={addToCart} disabled={adding}>
					{_g.lang('add_to_cart')}
				</button>

				<div className={styles.shipment}>
					<span className={styles.latvia_icon} />

					<span className={styles.latvia_text}>{_g.lang('delivery')}</span>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(ProductWindow);

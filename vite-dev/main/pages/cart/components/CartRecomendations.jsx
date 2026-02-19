/* eslint-disable react/prop-types */
// @ts-nocheck
import { useRef } from 'react';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CartRecomendations.module.less';
import Link from 'core/navigation/link';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';

const CartRecomendations = ({products, scrollStep = 500,variant = 'now',}) => {
	// eslint-disable-next-line no-console
	console.log('CartRecomendations products:', products);
	const trackRef = useRef(null);

	const scroll = (dir) => {
		trackRef.current?.scrollBy({
			left: dir * scrollStep,
			behavior: 'smooth',
		});
	};

	const CardWrapper = ({ to, children, className }) => {
		if (variant === 'gear') {
			return (
				<Link to={to} className={className}>
					{children}
				</Link>
			);
		}
		return (
			<Link to={to} className={className}>
				{children}
			</Link>
		);
	};

	const formatPrice = (value) => Number(value || 0).toFixed(2);

	const calcDiscountPrice = (price, discount) => {
		const p = Number(price || 0);
		const d = Number(discount || 0);
		return p * (1 - d / 100);
	};

	return (
		<div className={styles.carousel}>
			<button
				type="button"
				className={`${styles.arrow} ${styles.arrowLeft}`}
				onClick={() => scroll(-1)}
				aria-label="Scroll left">
				‹
			</button>

			<div className={styles.viewport}>
				<div className={styles.galleryGrid} ref={trackRef}>
					{products.map((p) => {
						const priceOld = Number(p.product_price || 0);
						const discount = Number(p.product_discount || 0);
						const priceNow = calcDiscountPrice(priceOld, discount);
						const imageSrc = p.image?.image;

						return (
							<CardWrapper
								key={p.id}
								className={styles.content_box}
								to={p.url}
								href={getMainUrl(true) + 'product/' + p.id}>
								<div className={styles.seller_card}>
									<Image src={imageSrc} alt={p.title} />
								</div>

								<div className={styles.price}>
									<div className={discount > 0 ? styles.discounted_price : styles.normal_price}>
										<h3>
											<FontAwesomeIcon icon={faEuroSign} />{' '}
											{formatPrice(priceNow)}
										</h3>

										{discount > 0 && <span>-{discount}%</span>}
									</div>

									{discount > 0 && (
										<div className={styles.original_price}>
											<h4>
												<FontAwesomeIcon icon={faEuroSign} />{' '}
												{formatPrice(priceOld)}
											</h4>
										</div>
									)}
								</div>

								<div className={styles.product_name}>
									<h2>{p.title}</h2>
								</div>
							</CardWrapper>
						);
					})}
				</div>
			</div>

			<button
				type="button"
				className={`${styles.arrow} ${styles.arrowRight}`}
				onClick={() => scroll(1)}
				aria-label="Scroll right">
				›
			</button>
		</div>
	);
};

export default CartRecomendations;

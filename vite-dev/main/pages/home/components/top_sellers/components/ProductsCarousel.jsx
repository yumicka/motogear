/* eslint-disable react/prop-types */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Content.module.less';
import Image from 'ui/media/image';
import Link from 'core/navigation/link';

const ProductsCarousel = ({ products, scrollStep = 500, variant = 'now' }) => {
	const [loading, setLoading] = useState(true);
	const [recomendationds, setRecomendationds] = useState([]);

	useEffect(() => {
		setLoading(true);

		remoteRequest({
			url: 'products/search',
			data: {
				filters: {
					top_seller: 1,
				},
				results_per_page: 10,
			},
			onSuccess: (response) => {
				setLoading(false);
				setRecomendationds(response.rows || []);
			},
			onError: () => {
				setLoading(false);
				setRecomendationds([]);
			},
		});
	}, []);

	const trackRef = useRef(null);

	const scroll = (dir) => {
		trackRef.current?.scrollBy({
			left: dir * scrollStep,
			behavior: 'smooth',
		});
	};

	const CardWrapper = ({ to, href, children, className }) => {
		if (variant === 'gear') {
			return (
				<Link to={to || '#'} className={className}>
					{children}
				</Link>
			);
		}
		return (
			<Link href={href || '#'} className={className}>
				{children}
			</Link>
		);
	};

	const ProductImage = ({ src, alt }) => {
		if (variant === 'gear') return <Image src={src} alt={alt} />;
		return <Image src={src} alt={alt} />;
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
					{products.map((p) => (
						<CardWrapper
							key={p.id}
							className={styles.content_box}
							to={p.to}
							href={p.href}>
							<div className={styles.seller_card}>
								<ProductImage src={p.img} alt={p.name} />
							</div>

							<div className={styles.price}>
								<div className={styles.discounted_price}>
									<h3>
										<FontAwesomeIcon icon={faEuroSign} /> {p.priceNow}
									</h3>
									<span>{p.discount}</span>
								</div>

								<div className={styles.original_price}>
									<h4>
										<FontAwesomeIcon icon={faEuroSign} /> {p.priceOld}
									</h4>
								</div>
							</div>

							<div className={styles.reviews}>
								<span className={styles.review_stars}>{p.rating}</span>
								<span>{p.reviews} reviews</span>
							</div>

							<div className={styles.product_name}>
								<h2>{p.name}</h2>
							</div>
						</CardWrapper>
					))}
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

export default ProductsCarousel;

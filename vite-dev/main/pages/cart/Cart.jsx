import React from 'react';
import styles from './Cart.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Image from 'ui/media/image';
import CartRecomendations from './components/CartRecomendations';
import WithUi from 'hoc/store/ui';

const uiProps = (ownProps) => {
	return {
		products: 'products',
	}; 
};

const Cart = ({ products }) => {
	// const cartAmount = useSelector((state) => state.ui?.cart?.cart_amount ?? 0);
	const cart = useSelector((state) => state.ui?.cart);
	console.log('Cart state from Redux:', cart);

	const isEmpty = !cart || cart.cart_amount === 0;

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				{isEmpty ? (
					<section className={styles.content}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faFaceFrown} />
						</div>
						<div className={styles.text}>
							<h2>Your cart is empty</h2>
							<p>Pick some products to start shopping!</p>
						</div>
					</section>
				) : (
					<section className={styles.box}>
						<div className={styles.products}>
							{cart.product_summary.map((item) => (
								<div key={item.id} className={styles.product_item}>
									<Image src={item.image?.image} alt={item.title} />
									<div className={styles.product_info}>
										<h3>{item.title}</h3>
										<p>
											{item.quantity} X{' '}
											{item.product_discount > 0 ? (
												<>
													<span className={styles.discount_price}>
														€
														{(
															item.product_price *
															(1 - item.product_discount / 100)
														).toFixed(2)}
													</span>{' '}
													<span className={styles.original_price}>
														€{item.product_price}
													</span>
												</>
											) : (
												<>€{item.product_price}</>
											)}
										</p>
										<p className={styles.total_cart_price}>
											Total:{' '}
											<span className={styles.total_price}>€{item.total}</span>
										</p>
									</div>

									<div className={styles.change}>
										<button
											className={styles.edit_btn}
											aria-label={`Edit ${item.title}`}>
											<FontAwesomeIcon icon={faPen} />
										</button>
										<button
											className={styles.delete_btn}
											aria-label={`Remove ${item.title} from cart`}>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</div>
							))}
						</div>
						<div className={styles.total}>
							<div className={styles.total_label}>Total summary:</div>

							<div className={styles.total_info}>
								<h3>Cart price: €{cart.totals?.product_total}</h3>
								<h3>Shipping: €{cart.totals?.shipping_price}</h3>
								<div className={styles.final_total}>
									<h1>Total: €{cart.totals?.total_price}</h1>
									<p>
										Price without VAT(21%): €{cart.totals?.price_without_vat}
									</p>
								</div>
							</div>

							<div className={styles.checkout_button}>
								<button className={styles.checkout_btn}>
									Proceed to Checkout
								</button>
							</div>
						</div>
					</section>
				)}

				<section className={styles.recomendationds}>
					<div className={styles.recomendationds_title}>
						<h2>Looking for something more?</h2>
					</div>
					<div className={styles.recommended_products}>
						<CartRecomendations products={products} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Cart);

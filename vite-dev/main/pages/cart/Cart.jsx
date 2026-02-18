import React from 'react';
import styles from './Cart.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Image from 'ui/media/image';

const Cart = () => {
	// const cartAmount = useSelector((state) => state.ui?.cart?.cart_amount ?? 0);
	const cart = useSelector((state) => state.ui?.cart);
	console.log('Cart state from Redux:', cart);

	const isEmpty = !cart || cart.cart_amount === 0;

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				{isEmpty ? (
					<div className={styles.content}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faFaceFrown} />
						</div>
						<div className={styles.text}>
							<h2>Your cart is empty</h2>
							<p>Pick some products to start shopping!</p>
						</div>
					</div>
				) : (
					<div className={styles.box}>
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
													<span className={styles.original_price}>
														€{item.product_price}
													</span>{' '}
													<span className={styles.discount_price}>
														€
														{(
															item.product_price *
															(1 - item.product_discount / 100)
														).toFixed(2)}
													</span>
												</>
											) : (
												<>€{item.product_price}</>
											)}
										</p>
										<p>
											Total:{' '}
											<span className={styles.total_price}>
												€{cart.totals?.product_total}
											</span>
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
							<h3>Total: €{cart.totals?.total_price}</h3>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from '../../Cart.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronDown,
	faChevronUp,
	faFaceFrown,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'ui/media/image';

const ProductCart = ({ cart, setCart }) => {
	const [toast, setToast] = useState(null);

	// console.log('Cart state from Redux:', cart);
	const isEmpty = !cart || cart.cart_amount === 0;

	async function updateCart(action, productId, variantId, quantityType = null) {
		const data = { action, product_id: productId, variant_id: variantId };
		if (quantityType) data.quantity_type = quantityType;

		remoteRequest({
			url: 'cart/actions',
			data,
			onSuccess: (res) => {
				if (res?.cart) {
					uiStore.set('cart', res.cart);
					setCart(res.cart);
					setToast(_g.lang('updated_success'));
					setTimeout(() => setToast(null), 2000);
				}
			},
			onError: (err) => console.error('Cart action failed', err),
		});
	}

	const handleRemove = (productId, variantId) =>
		updateCart('remove', productId, variantId);

	return (
		<div className={styles.wrapper}>
			{isEmpty ? (
				<section className={styles.content}>
					<div className={styles.icon}>
						<FontAwesomeIcon icon={faFaceFrown} />
					</div>
					<div className={styles.text}>
						<h2>{_g.lang('cart_empty')}</h2>
						<p>{_g.lang('pick')}</p>
					</div>
				</section>
			) : (
				<div className={styles.products}>
					{cart.product_summary.map((item) => {
						const availableCount = Number(
							item.selected_variant?.product_count ?? 0,
						);
						const currentQuantity = Number(item.quantity ?? 0);
						const canIncrease = currentQuantity < availableCount;

						return (
							<div key={item.id} className={styles.product_item}>
								<Image src={item.image?.image} alt={item.title} />
								<div className={styles.product_info}>
									<div className={styles.title_size}>
										<h3>{item.title}</h3>
										{item.selected_variant?.product_size && (
											<h4>
												{_g.lang('size')}:{' '}
												{item.selected_variant?.product_size || 'N/A'}
											</h4>
										)}
									</div>
									<p>
										{item.product_discount > 0 ? (
											<>
												<span className={styles.discount_price}>
													€{item.calculated_price}
												</span>{' '}
												<span className={styles.original_price}>
													€{item.product_price}
												</span>
											</>
										) : (
											<>€{item.calculated_price}</>
										)}
									</p>
									<p className={styles.total_cart_price}>
										{_g.lang('total')}:{' '}
										<span className={styles.total_price}>€{item.total}</span>
									</p>
								</div>

								<div className={styles.change}>
									<div className={styles.edit_block}>
										<button
											onClick={() => {
												if (!canIncrease ? styles.disabledBtn : '') {
													setToast(_g.lang('not_available'));
													setTimeout(() => setToast(null), 2000);
													return;
												}

												updateCart(
													'change_quantity',
													item.id,
													item.selected_variant?.id,
													'increase',
												);
											}}>
											<FontAwesomeIcon icon={faChevronUp} />
										</button>

										{item.quantity}

										<button
											onClick={() => {
												if (item.quantity <= 1) {
													setToast(_g.lang('quantity_less'));
													setTimeout(() => setToast(null), 2000);
													return;
												}

												updateCart(
													'change_quantity',
													item.id,
													item.selected_variant?.id,
													'decrease',
												);
											}}>
											<FontAwesomeIcon icon={faChevronDown} />
										</button>
									</div>

									<button
										className={styles.delete_btn}
										aria-label={`Remove ${item.title} from cart`}
										onClick={() =>
											handleRemove(item.id, item.selected_variant?.id)
										}>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
			{toast && <div className={styles.toast}>{toast}</div>}
		</div>
	);
};

export default ProductCart;

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './Cart.module.less';

import ProductCart from './components/productCart/ProductCart';
import Total from './components/total/Total';
import CartRecomendations from './components/cartRecomendations/CartRecomendations';

const Cart = () => {
	const [cart, setCart] = useState(uiStore.get('cart', {}));
	const isEmpty = !cart || cart.cart_amount === 0;
	return (
		<div className={styles.wrapper}>
			<div className="pageFade">
				<div className={styles.inner_wrapper}>
					<section className={`${styles.box} ${isEmpty ? styles.empty : ''}`}>
						<div>
							<ProductCart cart={cart} setCart={setCart} />
						</div>

						<div>
							<Total total={cart} />
						</div>
					</section>

					<section className={styles.recomendationds}>
						<div className={styles.recomendationds_title}>
							<h2>{_g.lang('cart_looking')}</h2>
						</div>
						<div className={styles.recommended_products}>
							<CartRecomendations />
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Cart;

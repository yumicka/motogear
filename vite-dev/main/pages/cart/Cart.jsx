/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './Cart.module.less';

import ProductCart from './components/productCart/productCart';
import Total from './components/total/Total';
import CartRecomendations from './components/cartRecomendations/CartRecomendations';

const Cart = () => {
	const [cart, setCart] = useState(uiStore.get('cart', {}));

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<section  className={styles.box}>
					<div>
						<ProductCart cart={cart} setCart={setCart} />
					</div>

					<div>
						<Total total={cart} />
					</div>
				</section>

				<section className={styles.recomendationds}>
					<div className={styles.recomendationds_title}>
						<h2>Looking for something more?</h2>
					</div>
					<div className={styles.recommended_products}>
						<CartRecomendations />
					</div>
				</section>
			</div>
		</div>
	);
};

export default Cart;

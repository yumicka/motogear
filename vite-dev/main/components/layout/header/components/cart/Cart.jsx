import React from 'react';
import Cart_svg from './components/Cart_svg.jsx';
import styles from './Cart.module.less';
import Link from 'core/navigation/link/Link.jsx';
import getMainUrl from 'helpers/getMainUrl.js';

const Cart = () => {
	return (
		<Link
			to={getMainUrl(true) + 'cart'}
			className={styles.wrapper}
			aria-label="Open cart">
			<div className={styles.inner_wrapper}>
				<div className={styles.icon}>
					<Cart_svg />
					<div className={styles.item_count}>0</div>
				</div>

				<div className={styles.text}>
					<div className={styles.label}>Cart</div>
					<div className={styles.total}>0.00</div>
				</div>
			</div>
		</Link>
	);
};

export default Cart;

import React from 'react';
import { Link } from 'react-router-dom';
import Cart_svg from './components/Cart_svg.jsx';
import styles from './Cart.module.less';

const Cart = () => {
	return (
		<Link to="/cart" className={styles.wrapper} aria-label="Open cart">
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

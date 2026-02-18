import React, { useEffect, useState } from 'react';
// import uiStore from 'core/containers/ui/uiStore.js';
import { useSelector } from 'react-redux';
import Cart_svg from './components/Cart_svg.jsx';
import styles from './Cart.module.less';
import Link from 'core/navigation/link/Link.jsx';
import getMainUrl from 'helpers/getMainUrl.js';

const Cart = () => {
	const cartAmount = useSelector((state) => state.ui?.cart?.cart_amount ?? 0);
	const productTotal = useSelector((state) => state.ui?.cart?.totals?.total_price ?? 0.00);

	return (
		<Link
			to={getMainUrl(true) + 'cart'}
			className={styles.wrapper}
			aria-label="Open cart">
			<div className={styles.inner_wrapper}>
				<div className={styles.icon}>
					<Cart_svg />
					<div className={cartAmount>0 ? styles.item_count : styles.item_count_empty}>{cartAmount}</div>
				</div>

				<div className={styles.text}>
					<div className={styles.label}>Cart</div>
					<div className={styles.total}>€{productTotal}</div>
				</div>
			</div>
		</Link>
	);
};

export default Cart;

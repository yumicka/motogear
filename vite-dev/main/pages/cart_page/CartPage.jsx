import React from 'react';
import styles from './CartPage.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					<div className={styles.icon}>
						<FontAwesomeIcon icon={faFaceFrown} />
					</div>
					<div className={styles.text}>
						<h2>Your cart is empty</h2>
						<p>Pick some products to start shopping!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;

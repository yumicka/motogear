import styles from '../AboutProduct.module.less';
import { Link } from 'react-router-dom';


const SizeGuide = () => {
	return (
		<div className={styles.ShippingAndReturns}>
			<div className={styles.text_box}>
				<h3>Fast deliveries to Latvia</h3>
				<p>
					Every day, we ship orders throughout Europe. We always do our best to
					ensure that you receive your products as quickly as possible!
				</p>
			</div>

			<div className={styles.text_box}>
				<h3>Lowest Price Guarantee</h3>
				<p>
					We strive to maintain the best prices, if you still would find a
					better price from a competitor, we will match that price. Our price
					guarantee applies within 14 days after your purchase.
				</p>
			</div>

			<div className={styles.text_box}>
				<h3>Free shipping over €150*</h3>
				<p>
					Orders over €150 are qualified for free shipping. *This does not
					include bulky products.
				</p>
			</div>

			<div className={styles.text_box}>
				<h3>60-day return policy*</h3>
				<p>
					You have the right to return your order within 60 days. Return fees
					apply. *The right to return does not apply for products that are
					personalised or manufactured upon order. See our{' '}
					<Link to="">Customer Care Section</Link> for more details and
					conditions.
				</p>
			</div>

			<div className={styles.text_box}>
				<h3>Huge Assortment</h3>
				<p>
					We offer a wide range of products for all riders whether you are a
					beginner or professional. We carry the world’s hottest brands at
					competitive prices as well as our own range of high-quality brands at
					consistently low prices.
				</p>
			</div>
		</div>
	);
};

export default SizeGuide;

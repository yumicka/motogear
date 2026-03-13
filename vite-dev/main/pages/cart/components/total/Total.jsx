/* eslint-disable react/prop-types */
import Link from 'core/navigation/link/Link';
import styles from '../../Cart.module.less';
import getMainUrl from 'helpers/getMainUrl';

const Total = ({ total }) => {
	if (!total?.product_summary?.length) return null;

	const productTotal = total.product_summary.reduce(
		(sum, item) => sum + Number(item.total || 0),
		0,
	);

	const shippingPrice = Number(total.shipping_price || 0);
	const finalTotal = productTotal + shippingPrice;
	const priceWithoutVat = finalTotal / 1.21;

	return (
		<div className={styles.total}>
			<div className={styles.total_label}>{_g.lang('total_summary')}:</div>

			<div className={styles.total_info}>
				<h3>{_g.lang('cart_price')}: €{productTotal.toFixed(2)}</h3>
				<h3>{_g.lang('shipping')}: €{shippingPrice.toFixed(2)}</h3>

				<div className={styles.final_total}>
					<h1>{_g.lang('total')}: €{finalTotal.toFixed(2)}</h1>
					<p>{_g.lang('vat')} (21%): €{priceWithoutVat.toFixed(2)}</p>
				</div>
			</div>

			<div className={styles.checkout_button}>
				<Link to={getMainUrl(true) + 'checkout'} className={styles.checkout_btn}>{_g.lang('proceed')}</Link>
			</div>
		</div>
	);
};

export default Total;

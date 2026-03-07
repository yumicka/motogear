import { useEffect, useState } from 'react';
// import ProductCart from '../cart/components/productCart/productCart';
import ProductCart from '../cart/components/productCart/ProductCart';
import styles from './checkOut.module.less';
import InfoForm from './components/info_form/InfoForm';
import CheckoutSteps from './components/breadcrumbs/CheckoutSteps';
import Payment from './components/payment/Payment';

const Checkout = () => {
	const [cart, setCart] = useState(uiStore.get('cart', {}));
	const [step, setStep] = useState(1);
	const [orderId, setOrderId] = useState(uiStore.get('checkout.orderId', null));

	useEffect(() => {
		if (!cart?.product_summary?.length) {
			uiStore.set('Page.current', 'cart');
		}
	}, [cart]);

	const handleSetOrderId = (id) => {
		setOrderId(id);
		uiStore.set('checkout.orderId', id); // чтобы не потерять при переходах
	};

	return (
		<div className={styles.checkoutWrapper}>
			<div className={styles.checkoutInnerWrapper}>
				<CheckoutSteps step={step} />
				<div className={styles.checkoutContent}>
					<section className={styles.checkoutProducts}>
						<h2>{_g.lang('your_cart')}</h2>
						<div className={styles.checkoutProductsCart}>
							<ProductCart cart={cart} setCart={setCart} />
						</div>
					</section>

					{step === 1 && (
						<section className={styles.checkoutInformation}>
							<h2>{_g.lang('contact_information')}</h2>
							<InfoForm setStep={setStep} cart={cart} setOrderId={handleSetOrderId}/>
						</section>
					)}

					{step === 2 && (
						<section className={styles.checkoutInformation}>
							<h2>Payment</h2>
							<Payment setStep={setStep} orderId={orderId}/>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default Checkout;

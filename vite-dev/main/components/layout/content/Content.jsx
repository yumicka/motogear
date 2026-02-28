import WithUi from 'hoc/store/ui';
import { get } from 'lodash-es';
import PrivacyPolicy from 'main/info_pages/privacy_policy/PrivacyPolicy';
import HomePage from 'main/pages/home/HomePage';
import ProductPage from 'main/pages/shop/components/ProductPage/ProductPage';
import Shop from 'main/pages/shop/Shop';
import Cart from 'main/pages/cart/Cart';
import Checkout from 'main/pages/checkOut/Checkout';
import PropTypes from 'prop-types';
import PaymentSuccess from 'main/pages/checkOut/components/success/PaymentSuccess';
import PaymentFailure from 'main/pages/checkOut/components/failed/PaymentFailure';

const uiProps = (ownProps) => {
	return {
		Page: {
			current: 'current',
		},
	};
};

function Content(props) {
	const { current } = props;

	const pageRenderer = {
		home: <HomePage />,
		shop: <Shop />,
		shop_product: <ProductPage />,
		cart: <Cart />,
		checkout: <Checkout />,
		klixPaymentSuccess: <PaymentSuccess />,
		klixPaymentFailed: <PaymentFailure />,
		//privacy pages
		privacy_policy: <PrivacyPolicy />,
	};

	const page = get(pageRenderer, current, null);

	return (
		<div className="flex-grow flex-shrink w-full">{page ?? 'wrong page'}</div>
	);
}

Content.propTypes = {
	current: PropTypes.any,
};

Content.defaultProps = {
	current: 'home',
};

export default WithUi(uiProps)(Content);

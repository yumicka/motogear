import WithUi from 'hoc/store/ui';
import { get } from 'lodash-es';
import PrivacyPolicy from 'main/info_pages/privacy_policy/PrivacyPolicy';
import HomePage from 'main/pages/home/HomePage';
import ShopHelmet from 'main/pages/shop_pages/helmets/ShopHelmets';
import PropTypes from 'prop-types';

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
		shop: <ShopHelmet />,

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

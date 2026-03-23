import styles from '../AboutProduct.module.less';
import { Link } from 'react-router-dom';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import { defaultProps, propTypes } from 'hoc/sortable/props';

const uiProps = (ownProps) => {
	return {
		content: {
			delivery_and_return: {
				langData: 'langData',
			},
		},
	};
};

let ShippingAndReturns = ({langData}) => {
	return (
		<div className={styles.ShippingAndReturns}>
			<div className={styles.text_box}>
				<Editable
					edit={{
						name: 'delivery_and_return',
					}}>
					<p dangerouslySetInnerHTML={{ __html: langData.content }} />
				</Editable>
			</div>
		</div>
	);
};

ShippingAndReturns.propTypes = propTypes;

ShippingAndReturns.defaultProps = defaultProps;

ShippingAndReturns = WithUi(uiProps)(ShippingAndReturns);

export default ShippingAndReturns;

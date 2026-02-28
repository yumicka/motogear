/* eslint-disable react/prop-types */
import styles from './PaymentFailure.module.less';
import WithUi from 'hoc/store/ui';

const uiProps = () => {
	return {};
};

const PaymentFailure = () => {
	return (
		<div className={styles.container}>
			<p>Failure page........</p>
		</div>
	);
};

export default WithUi(uiProps)(PaymentFailure);

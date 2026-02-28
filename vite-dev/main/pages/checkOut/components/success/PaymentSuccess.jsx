/* eslint-disable react/prop-types */
import styles from './PaymentSuccess.module.less';
import WithUi from 'hoc/store/ui';

const uiProps = () => {
	return {
		invoiceUrl: 'invoice_url',
		orderNumber: 'order_number',
		status: 'status',
	};
};

const PaymentSuccess = (props) => {
	const { invoiceUrl, orderNumber } = props;
	console.log('props', props);

	console.log('invoiceUrl', invoiceUrl);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.icon}>✅</div>

				<h1 className={styles.title}>Maksājums veiksmīgs</h1>
				<p className={styles.subtitle}>
					Paldies! Jūsu pasūtījums ir saņemts un tiek apstrādāts.
				</p>

				{orderNumber && (
					<div className={styles.row}>
						<span className={styles.label}>Pasūtījuma numurs:</span>
						<span className={styles.value}>{orderNumber}</span>
					</div>
				)}

				<div className={styles.hr} />

				<div className={styles.actions}>
					{invoiceUrl ? (
						<a className={styles.primaryBtn} href={invoiceUrl}>
							Lejupielādēt rēķinu (PDF)
						</a>
					) : (
						<div className={styles.info}>
							Rēķins tiek sagatavots… Pamēģini atjaunot lapu pēc brīža.
						</div>
					)}

					<div className={styles.secondaryActions}>
						<a className={styles.secondaryBtn} href="/lv">
							Uz sākumu
						</a>
						<a className={styles.secondaryBtn} href="/lv/veikals">
							Uz veikalu
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(PaymentSuccess);

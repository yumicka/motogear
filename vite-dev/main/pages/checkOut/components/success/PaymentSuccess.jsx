/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PaymentSuccess.module.less';
import WithUi from 'hoc/store/ui';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';

const uiProps = (ownProps) => {
	return {
		invoice_url: 'invoiceUrl',
		order_number: 'orderNumber',
		status: 'status',
	};
};

const PaymentSuccess = ({ invoiceUrl, orderNumber, status }) => {

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.icon}><FontAwesomeIcon icon={faCircleCheck} /></div>

				<h1 className={styles.title}>{_g.lang('payment_successful')}</h1>
				<p className={styles.subtitle}>
					{_g.lang('thank_you')}
				</p>

				{orderNumber && (
					<div className={styles.row}>
						<span className={styles.label}>{_g.lang('order_number')}:</span>
						<span className={styles.value}>{orderNumber}</span>
					</div>
				)}

				<div className={styles.hr} />

				<div className={styles.actions}>
					{invoiceUrl ? (
						<Link
							className={styles.primaryBtn}
							to={invoiceUrl}
							download={orderNumber ? `invoice_${orderNumber}.pdf` : undefined}
							target="_blank"
							rel="noopener noreferrer">
							{_g.lang('download_invoice')} (PDF)
						</Link>
					) : (
						<div className={styles.info}>
							{_g.lang('invoice_preparation')}
						</div>
					)}

					<div className={styles.secondaryActions}>
						<Link className={styles.secondaryBtn} to={getMainUrl(true) + 'home'}>
							{_g.lang('home_page')}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(PaymentSuccess);

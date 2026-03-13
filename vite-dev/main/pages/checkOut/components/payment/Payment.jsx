/* eslint-disable react/prop-types */
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Payment.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithUi from 'hoc/store/ui';
import { useState } from 'react';

const uiProps = () => {
	return {
		payments: 'payments',
	};
};

const Payment = ({ setStep, payments, orderId }) => {
	const [selectedMethod, setSelectedMethod] = useState(null);
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(null);
	const [toastType, setToastType] = useState('success');

	const handleContinue = () => {
		if (!selectedMethod || loading) return;

		setLoading(true);

		remoteRequest({
			url: `order/pay/${orderId}`,
			method: 'POST',
			data: {
				payment_type: selectedMethod,
			},
			onSuccess: (res) => {
				const redirectUrl = res?.redirect_url ?? res?.response?.redirect_url;

				if (redirectUrl) {
					window.location.href = redirectUrl;
				} else {
					setToastType('error');
					setToast('Payment initialization failed. Please try again.');
					setLoading(false);
					setTimeout(() => setToast(null), 5000);
				}
			},
			onError: () => {
				setToastType('error');
				setToast('Server error. Please try again.');
				setLoading(false);

				setTimeout(() => setToast(null), 5000);
			},
		});
	};

	return (
		<div className={styles.paymentContainer}>
			{toast && (
				<div
					className={styles.toast}
					style={{
						background: toastType === 'error' ? '#e74c3c' : '#2bbc68',
					}}>
					{toast}
				</div>
			)}
			<div className={styles.bankSelection}>
				{payments?.available_payment_methods?.map((methodId) => (
					<div
						key={methodId}
						className={styles.bankBox}
						onClick={() => setSelectedMethod(methodId)}
						style={{
							border:
								selectedMethod === methodId
									? '2px solid #2e7d32'
									: '1px solid #ccc',
							cursor: 'pointer',
						}}>
						<div className={styles.overlay}>
							<p>{payments?.names?.[methodId]}</p>
						</div>
					</div>
				))}
			</div>

			<div className={styles.buttonsBox}>
				<div className={`${styles.btn} ${styles.btnBack}`}>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setStep(1);
						}}>
						{_g.lang('go_back_btn')} <FontAwesomeIcon icon={faArrowLeft} />
					</button>
				</div>

				<div className={styles.btn}>
					<button
						type="button"
						disabled={!selectedMethod || loading}
						onClick={(e) => {
							e.preventDefault();
							handleContinue();
						}}>
						{loading ? _g.lang('loading')+'...' : _g.lang('continue')}{' '}
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Payment);

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Payment.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';

const Payment = ({ setStep }) => {
	return (
		<div className={styles.paymentContainer}>
			<div className={styles.bankSelection}>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
				<div className={styles.bankBox}>
					<div className={styles.overlay}>
						<Image src={getMainUrl() + 'img/bank/Citadele_logo.png'} />
					</div>
				</div>
			</div>
			<div className={styles.buttonsBox}>
				<div className={`${styles.btn} ${styles.btnBack}`}>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setStep(1);
						}}>
						Go back <FontAwesomeIcon icon={faArrowLeft} />
					</button>
				</div>

				<div className={styles.btn}>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setStep(3);
						}}>
						Continue <FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Payment;

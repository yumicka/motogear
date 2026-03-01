/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PaymentFailure.module.less';
import WithUi from 'hoc/store/ui';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';

const uiProps = () => ({});

const PaymentFailure = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.icon}>
					<FontAwesomeIcon icon={faCircleXmark} />
				</div>

				<h1 className={styles.title}>Maksājums neizdevās</h1>
				<p className={styles.subtitle}>
					Diemžēl maksājums netika pabeigts. Lūdzu, mēģini vēlreiz vai izvēlies citu
					apmaksas veidu.
				</p>

				<div className={styles.hr} />

				<div className={styles.actions}>
					<Link className={styles.primaryBtn} to={getMainUrl(true) + 'checkout'}>
						Mēģināt vēlreiz
					</Link>

					<div className={styles.secondaryActions}>
						<Link className={styles.secondaryBtn} to={getMainUrl(true) + 'cart'}>
							Uz grozu
						</Link>
						<Link className={styles.secondaryBtn} to={getMainUrl(true) + 'home'}>
							Uz sākumu
						</Link>
						<Link className={styles.secondaryBtn} to={getMainUrl(true) + 'shop'}>
							Uz veikalu
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(PaymentFailure);
import Image from 'ui/media/image';
import styles from './Recomendations.module.less';
import getMainUrl from 'helpers/getMainUrl';

const product =
	getMainUrl() +
	'img/store/helmets/trial_helmets/Airoh_Kombakt_Open_Face_Helmet.jpg';

const Recomendations = () => {
	return (
		<div className={styles.content}>
			<div className={styles.title}>
				<p>Do not forget to buy</p>
			</div>

			<div className={styles.container}>
				<div className={styles.container_box}>
					<div className={styles.images}>
						<Image src={product} />
					</div>

					<div className={styles.discription}>
						<div className={styles.name}>
							<h3>Airoh Kombakt Open Face Helmet</h3>
						</div>

						<div className={styles.btn}>Add to cart</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recomendations;

import Image from 'ui/media/image';
import styles from './Recomendations.module.less';
import getMainUrl from 'helpers/getMainUrl';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const product =
	getMainUrl() +
	'img/store/helmets/trial_helmets/Airoh_Kombakt_Open_Face_Helmet.jpg';

	
const Recomendations = () => {
	const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
	const [size, setSize] = useState('');
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

						<div className={styles.size_block}>
							<select
								className={styles.size_select}
								value={size}
								onChange={(e) => setSize(e.target.value)}>
								<option value="" disabled>
									Select size
								</option>

								{SIZES.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>

						<div className={styles.price}>
							<h4>
								<FontAwesomeIcon icon={faEuroSign} /> 66.67
							</h4>
						</div>

						<button className={styles.btn}>Add to cart</button>
					</div>
				</div>

				<div className={styles.container_box}>
					<div className={styles.images}>
						<Image src={product} />
					</div>

					<div className={styles.discription}>
						<div className={styles.name}>
							<h3>Airoh Kombakt Open Face Helmet</h3>
						</div>

						<div className={styles.size_block}>
							<select
								className={styles.size_select}
								value={size}
								onChange={(e) => setSize(e.target.value)}>
								<option value="" disabled>
									Select size
								</option>

								{SIZES.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>

						<div className={styles.price}>
							<h4>
								<FontAwesomeIcon icon={faEuroSign} /> 66.67
							</h4>
						</div>

						<button className={styles.btn}>Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recomendations;

// @ts-nocheck
import styles from './Banners.module.less';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';
import Link from 'core/navigation/link';

const Banners = () => {
	const bigImage = getMainUrl()+'img/banners/rodrigues-hero.jpg';
	const RightImage = getMainUrl()+'img/banners/Hero_Dakar2024destacada.jpg';
	const tyres = getMainUrl()+'img/banners/tyres.jpg';
	const tent = getMainUrl()+'img/banners/tent.jpg';
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.hero_section}>
					<section className={styles.hero_grid}>
						{/* BIG LEFT */}
						<Link className={`${styles.card} ${styles.hero}`} to="#">
							<Image
								src={bigImage}
								alt="Winter Sale"
								className={styles.image}
							/>
							<div className={styles.overlay} />
							<div className={styles.contentLeft}>
								<h2>Winter Sale!</h2>
								<button className={styles.btn}>Up to 80% Off</button>
							</div>
						</Link>

						{/* RIGHT COLUMN */}
						<div className={styles.side_col}>
							<Link className={`${styles.card} ${styles.sideTop}`} to="#">
								<Image
									src={RightImage}
									alt="New Year, New Gear"
									className={styles.image}
								/>
								<div className={styles.overlay} />
								<div className={styles.contentLeft}>
									<h3>
										New Year,
										<br />
										New Gear
									</h3>
									<button className={styles.btnPrimary}>Buy now</button>
								</div>
							</Link>

							<Link className={`${styles.card} ${styles.sideBottom}`} to="#">
								<div className={styles.outletText}>OUTLET</div>
							</Link>
						</div>

						{/*-- BOTTOM ROW */}
						<div className={styles.bottom_row}>
							<Link className={`${styles.card} ${styles.bottomLeftCard}`} to="#">
								<Image
									src={tyres}
									alt="Parts and tyres"
									className={styles.image}
								/>
								<div className={styles.overlay} />
								<div className={styles.contentLeftButton}>
									<h3>Parts and tyres</h3>
									<button className={styles.btn}>Up to 80% Off</button>
								</div>
							</Link>

							<Link
								className={`${styles.card} ${styles.bottomRightCard}`}
								to="#">
								<Image src={tent} alt="Race tent" className={styles.image} />
								<div className={styles.overlay} />
								<div className={styles.contentRightButton}>
									<h3>Europe&apos;s #1 Race</h3>
									<h3>Tent sale is now on!</h3>
									<button className={styles.btn}>From $67</button>
								</div>
							</Link>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Banners;

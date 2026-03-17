// @ts-nocheck
import styles from './Banners.module.less';
import getMainUrl from 'helpers/getMainUrl';
import Link from 'core/navigation/link';

import MainLeftBox from './components/MainLeftBox';
import RightImageBox from './components/RightImageBox';
import BottomLeftCard from './components/BottomLeftCard';
import BottomRightCard from './components/BottomRightCard';

let Banners = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.hero_section}>
					<section className={styles.hero_grid}>
						{/* BIG LEFT */}
						<MainLeftBox />

						{/* RIGHT COLUMN */}
						<div className={styles.side_col}>
							<RightImageBox />

							<Link
								className={styles.sideBottom}
								to={getMainUrl(true) + 'veikals?categoryId=1'}>
								<div className={styles.outletText}>OUTLET</div>
							</Link>
						</div>

						{/*-- BOTTOM ROW */}
						<div className={styles.bottom_row}>
							<BottomLeftCard />
							<BottomRightCard />
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Banners;

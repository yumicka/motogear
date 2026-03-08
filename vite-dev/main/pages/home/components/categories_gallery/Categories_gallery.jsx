/* eslint-disable react/prop-types */
// @ts-nocheck
import styles from './Categories_gallery.module.less';
import Image from 'ui/media/image';
import getMainUrl from 'helpers/getMainUrl';
import { useRef } from 'react';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
	};
};

const CategoriesGallery = ({ categories }) => {
	const trackRef = useRef(null);

	const scroll = (dir) => {
		const el = trackRef.current;
		const amount = 300;
		el.scrollBy({ left: dir * amount, behavior: 'smooth' });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.titleSection}>
					<h2>{_g.lang('shop_by')}</h2>
				</div>
				<div className={styles.carousel}>
					<button
						className={`${styles.arrow} ${styles.arrowLeft}`}
						onClick={() => scroll(-1)}>
						‹
					</button>

					<div className={styles.viewport}>
						<div className={styles.galleryGrid} ref={trackRef}>
							{categories
								.filter((category) => category.parent_id == null)
								.map((category) => (
									<Link
										key={category.id}
										className={`${styles.card} ${styles.categoryCard}`}
										to={getMainUrl(true) + 'veikals?categoryId=' + category.id}>
										<div className={styles.overlay} />
										<Image
											src={category.image?.image}
											alt={category.title}
											className={styles.image}
										/>
										<div className={styles.content}>
											<h3>{category.title}</h3>
										</div>
									</Link>
								))}
						</div>
					</div>
					<button
						className={`${styles.arrow} ${styles.arrowRight}`}
						onClick={() => scroll(1)}>
						›
					</button>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(CategoriesGallery);

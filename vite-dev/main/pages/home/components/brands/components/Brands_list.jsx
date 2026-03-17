import Link from 'core/navigation/link';
import styles from './BrandList.module.less';
import Image from 'ui/media/image';

const Brands = ({brands}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					{brands.slice(0, 20).map((brand) => (
						<Link key={brand.brand_name} className={styles.box} to="#">
							<Image
								src={brand.image.image}
								alt={brand.brand_name}
								className={styles.image}
							/>
							<h3 className={styles.title}>{brand.brand_name}</h3>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Brands;

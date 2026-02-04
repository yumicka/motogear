/* eslint-disable react/prop-types */
import styles from './ProductPage.module.less';
import ProductWindow from './Components/productWindow/ProductWindow';
import Recomendations from './Components/recomendations/Recomendations';
import AboutProduct from './Components/aboutProduct/AboutProduct';
import Fitting from './Components/fitting/Fitting';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';
import getMainUrl from 'helpers/getMainUrl';

const uiProps = (ownProps) => {
	return {
		product: 'product',
		categories: 'categories',
	};
};

const ProductPage = ({ product, categories }) => {
	if (!product) return null;

	const categoryId = product.category;
	const categoryName =
		categories.find((cat) => cat.id === product.category)?.title || '';
	const subCategoryName =
		categories.find((cat) => cat.id === product.subCategory)?.title || '';
	const name = product.title;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					<Link
						to={getMainUrl(true) + 'veikals?categoryId=' + categoryId}
						className={styles.section}>
						<p>{categoryName} / </p>
					</Link>
					<Link
						to={getMainUrl(true) + 'veikals?categoryId=' + categoryId}
						className={styles.section}>
						<p> {subCategoryName} / </p>
					</Link>

					<div className={styles.section}>
						<p> {name}</p>
					</div>
				</div>

				<section className={styles.productSection}>
					<ProductWindow product={product} />
				</section>

				{/* <section className={styles.recomendations}>
					<Recomendations />
				</section>

				<section className={styles.aboutProduct}>
					<AboutProduct />
				</section> */}

				<section className={styles.helmetFitting}>
					<Fitting />
				</section>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(ProductPage);

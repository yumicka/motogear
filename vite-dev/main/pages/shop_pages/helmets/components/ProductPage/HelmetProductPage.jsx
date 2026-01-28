import styles from './HelmetProductPage.module.less';
import ProductWindow from './Components/ProductWindow';
import Recomendations from './Components/Recomendations';
import AboutProduct from './Components/AboutProduct';
import { Link, useParams } from 'react-router-dom';
import items from '../../helmets_items.json';

const HelmetProductPage = () => {

	const { id } = useParams();
	const product = items.find((item) => item.id === Number(id));

	const categories = product.category;
	const name = product.name;
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					<Link to="/shopHelmet" className={styles.section}>
						<p>Helmets / </p>
					</Link>
					<Link to="/shopHelmet" className={styles.section}>
						<p> {categories} / </p>
					</Link>

					<div className={styles.section}>
						<p> {name}</p>
					</div>
				</div>

				<section className={styles.productSection}>
					<ProductWindow />
				</section>

				<section className={styles.recomendations}>
					<Recomendations />
				</section>

				<section className={styles.aboutProduct}>
					<AboutProduct />
				</section>
			</div>
		</div>
	);
};

export default HelmetProductPage;

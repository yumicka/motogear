/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AboutProduct.module.less';
import { useState } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// import items from '../../../../helmets_items.json';
// import { useParams } from 'react-router-dom';

import ShippingAndReturns from './components/ShippingAndReturns';
import AskQuestion from './components/AskQuestion';
//Discription
import Description from './components/Description';

//Size Guide
import SizeGuide from './components/size_guide/SizeGuide';

//About Brand
import AboutBrand from './components/AboutBrand';

//specification
import Specification from './components/specification/Specification';
import RecomendationsByBrand from './recomendations/RecomendationsByBrand';

// eslint-disable-next-line react/prop-types
const DropdownItem = ({ title, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.item}>
			<button
				className={styles.header}
				onClick={() => setOpen((prev) => !prev)}>
				{title}
				{open ? (
					<FontAwesomeIcon icon={faAngleUp} />
				) : (
					<FontAwesomeIcon icon={faAngleDown} />
				)}
			</button>

			{open && <div className={styles.body}>{children}</div>}
		</div>
	);
};

const AboutProduct = ({ product, specifications }) => {
	const productId = product.id;
	const brandId = Number(product?.brand_id) || 0;

	if (!productId) {
		return <div>Product not found</div>;
	}

	return (
		<div className={styles.content}>
			<div className={styles.inner_content}>
				<div className={styles.dropdowns}>
					<DropdownItem title="Description">
						<Description product={product} />
					</DropdownItem>

					{specifications.length > 0 && (
						<DropdownItem title="Product specifications">
							<Specification specifications={specifications} />
						</DropdownItem>
					)}

					{brandId != 0 && (
						<DropdownItem title="Size guide">
							<SizeGuide brandId={brandId} />
						</DropdownItem>
					)}

					<DropdownItem title="Shipping & returns">
						<ShippingAndReturns />
					</DropdownItem>

					<DropdownItem title="Questions about the product">
						<AskQuestion />
					</DropdownItem>

					{brandId > 0 && (
						<DropdownItem title="About the brand">
							<AboutBrand brandId={brandId} />
						</DropdownItem>
					)}
				</div>

				{brandId > 0 && (
					<div className={styles.popular}>
						<div className={styles.title}>
							<span>Popular by this brand</span>
						</div>
						<RecomendationsByBrand product={product} />
					</div>
				)}
			</div>
		</div>
	);
};

export default AboutProduct;

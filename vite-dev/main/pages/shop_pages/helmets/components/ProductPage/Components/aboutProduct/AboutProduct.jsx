/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AboutProduct.module.less';
import { useState } from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
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

// eslint-disable-next-line react/prop-types
const DropdownItem = ({ title, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.item}>
			<button
				className={styles.header}
				onClick={() => setOpen((prev) => !prev)}>
				{title}
				<FontAwesomeIcon icon={faAngleUp} />
			</button>

			{open && <div className={styles.body}>{children}</div>}
		</div>
	);
};

const AboutProduct = ({ product, specifications }) => {
	const productId = product.id;

	if (!productId) {
		return <div>Product not found</div>;
	}

	const isHelmet = product?.categories?.some(
		(cat) => cat.id === 1 || cat.title?.toLowerCase() === 'helmets',
	);

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

					{isHelmet && product?.brand && (
						<DropdownItem title="Size guide">
							<SizeGuide specifications={specifications} />
						</DropdownItem>
					)}

					<DropdownItem title="Shipping & returns">
						<ShippingAndReturns />
					</DropdownItem>

					<DropdownItem title="Questions about the product">
						<AskQuestion />
					</DropdownItem>

					{product?.brand ? (
						<DropdownItem title="About the brand">
							<AboutBrand specifications={specifications} />
						</DropdownItem>
					) : null}
				</div>

				<div className={styles.popular}>
					<div className={styles.title}>
						<span>Popular by {product.brand}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutProduct;

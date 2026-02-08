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
import SizeGuide from './components/SizeGuide';

//About Brand
import AboutBrand from './components/AboutBrand';

// const brandComponents = {
// 	'O\'Neal': {
// 		Discription: Description, 
// 		SizeGuide: SizeGuide,
// 		AboutBrand: AboutBrand
// 	}
	
// };

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

const AboutProduct = ({product}) => {
	// const { id } = useParams();
	const productId = product.id;
	// const product = items.find((item) => item.id === Number(id));

	if (!productId) {
		return <div>Product not found</div>;
	}

	return (
		<div className={styles.content}>
			<div className={styles.inner_content}>
				<div className={styles.dropdowns}>
					<DropdownItem title="Description">
						<Description product={product}/>
					</DropdownItem>

					<DropdownItem title="Product specifications">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="Size guide">
						<SizeGuide />
					</DropdownItem>

					<DropdownItem title="Shipping & returns">
						<ShippingAndReturns />
					</DropdownItem>

					<DropdownItem title="Questions about the product">
						<AskQuestion />
					</DropdownItem>

					<DropdownItem title="About the brand">
						<AboutBrand />
					</DropdownItem>
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

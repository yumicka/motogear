import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AboutProduct.module.less';
import { useState } from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import items from '../../../../helmets_items.json';
import { useParams } from 'react-router-dom';

import ShippingAndReturns from './components/ShippingAndReturns';
import AskQuestion from './components/AskQuestion';
//Discription
import OnealDiscription from './components/Oneal/Oneal_Description';

//Size Guide
import Oneal_SizeGuide from './components/Oneal/Oneal_SizeGuide';

//About Brand
import Oneal_AboutBrand from './components/Oneal/Oneal_AboutBrand';

const brandComponents = {
	'O\'Neal': {
		Discription: OnealDiscription, 
		SizeGuide: Oneal_SizeGuide,
		AboutBrand: Oneal_AboutBrand
	}
	// "Raven": RavenDiscription,
	// "HJC": HJCDiscription,
};

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

const AboutProduct = () => {
	const { id } = useParams();
	const product = items.find((item) => item.id === Number(id));
	const componentsForBrand = brandComponents[product.brand] || {};

	return (
		<div className={styles.content}>
			<div className={styles.inner_content}>
				<div className={styles.dropdowns}>
					<DropdownItem title="Description">
						{componentsForBrand.Discription ? <componentsForBrand.Discription /> : <p>No description</p>}
					</DropdownItem>

					<DropdownItem title="Product specifications">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="Size guide">
						{componentsForBrand.SizeGuide ? <componentsForBrand.SizeGuide /> : <p>No size guide</p>}
					</DropdownItem>

					<DropdownItem title="Shipping & returns">
						<ShippingAndReturns />
					</DropdownItem>

					<DropdownItem title="Questions about the product">
						<AskQuestion />
					</DropdownItem>

					<DropdownItem title="About the brand">
						{componentsForBrand.AboutBrand ? <componentsForBrand.AboutBrand /> : <p>No description</p>}
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

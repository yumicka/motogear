import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AboutProduct.module.less';
import { useState } from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

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
	return (
		<div className={styles.content}>
			<div className={styles.inner_content}>
				<div className={styles.dropdowns}>
					<DropdownItem title="Description">
						<div>
							<p>
								On the bike, you always need to be able to rely on your
								equipment and with the O’NEAL 2SRS MX helmet, you can! This
								motocross helmet is comfortable, safe, and stylish, making it
								your perfect companion for any amount of action. The soft
								interior is removable and washable, which helps keep the helmet
								fresh longer. Simply a great value-for-money helmet!
							</p>
						</div>

						<div>
							<p>
								Features:
								<ul>
									<li>Durable helmet shell made of ABS plastic</li>
									<li>Soft, padded, moisture-repelling and washable lining</li>
									<li>Double D-ring bracket with easy strap adjustment</li>
									<li>Adjustable helmet peak</li>
									<li>
										Goggles rest securely in place on ridge at back of shell
									</li>
									<li>Meets ECE 22.06 safety standards</li>
									<li>Weight: 1450g +/- 50g</li>
								</ul>
							</p>
						</div>
					</DropdownItem>

					<DropdownItem title="Product specifications">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="Size guide">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="Shipping & returns">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="Questions about the product">
						<p>text</p>
					</DropdownItem>

					<DropdownItem title="About the brand">
						<p>text</p>
					</DropdownItem>
				</div>

				<div className={styles.popular}>
					<div className={styles.title}>
						<span>Popular by ONeal</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutProduct;

// @ts-nocheck
import { useMemo, useState } from 'react';
import styles from './Garantees.module.less';
import Modal from './Modal/Modal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBagShopping,
	faBoltLightning,
	faCircleCheck,
	faDollarSign,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons';

const Garantees = () => {
	const items = useMemo(
		() => [
			{
				id: 'fast-delivery',
				icon: faBoltLightning,
				title: 'Fast deliveries to Latvia',
				short: 'Every day, we ship orders throughout Europe...',
				full: 'Every day, we ship orders throughout Europe. We always do our best to ensure that you receive your products as quickly as possible!',
			},
			{
				id: 'lowest-price',
				icon: faCircleCheck,
				title: 'Lowest Price Guarantee',
				short: 'We strive to maintain the best prices...',
				full: 'We strive to maintain the best prices, if you still would find a better price from a competitor, we will match that price. Our price guarantee applies within 14 days after your purchase.',
			},
			{
				id: 'free-shipping',
				icon: faDollarSign,
				title: 'Free shipping over €150*',
				short: 'Orders over €150 are qualified for free shipping...',
				full: 'Orders over €150 are qualified for free shipping. *This does not include bulky products.',
			},
			{
				id: 'returns',
				icon: faRepeat,
				title: '60-day return policy*',
				short: 'You have the right to return your order within 60 days...',
				full: 'You have the right to return your order within 60 days. Return fees apply. *The right to return does not apply for products that are personalised or manufactured upon order. See our Customer Care Section for more details and conditions.',
			},
			{
				id: 'assortment',
				icon: faBagShopping,
				title: 'Huge Assortment',
				short: 'We offer a wide range of products for all riders...',
				full: 'We offer a wide range of products for all riders whether you are a beginner or professional. We carry the world’s hottest brands at competitive prices as well as our own range of high-quality brands at consistently low prices.',
			},
		],
		[],
	);

	const [activeId, setActiveId] = useState(null);
	const active = items.find((x) => x.id === activeId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.card_box}>
					{items.map((item) => (
						<button
							key={item.id}
							type="button"
							className={styles.card}
							onClick={() => setActiveId(item.id)}>
							<div className={styles.content}>
								<div className={styles.icon}>
									<FontAwesomeIcon icon={item.icon} />
								</div>

								<div className={styles.heading}>{item.title}</div>
								<div className={styles.text}>{item.short}</div>
							</div>
						</button>
					))}
				</div>
			</div>

			<Modal
				open={!!active}
				onClose={() => setActiveId(null)}
				title={active?.title}
				icon={active ? <FontAwesomeIcon icon={active.icon} /> : null}>
				{active?.full}
			</Modal>
		</div>
	);
};

export default Garantees;

import { NavLink } from 'react-router-dom';
import styles from './FilterElement.module.less';

const CATEGORIES = [
	{ to: '/shopHelmet', label: 'All Helmets', end: true },
	{ to: '/shopHelmet/motocross', label: 'Motocross Helmets' },
	{ to: '/shopHelmet/adventure', label: 'Adventure Helmets' },
	{ to: '/shopHelmet/trial', label: 'Trial Helmets' },
	{ to: '/shopHelmet/accessories', label: 'Helmets Parts & Accessories' },
];

const FilterElement = () => {
	const linkClass = ({ isActive }) =>
		`${styles.link} ${isActive ? styles.active : ''}`;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					{CATEGORIES.map((c) => (
						<NavLink key={c.to} to={c.to} end={c.end} className={linkClass}>
							{c.label}
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilterElement;

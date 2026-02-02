// import { useState } from 'react';
import styles from './FilterElement.module.less';

const CATEGORIES = [
	{ to: 'motocross', label: 'Motocross Helmets', id: 1 },
	{ to: 'adventure', label: 'Adventure Helmets', id: 2 },
	{ to: 'trial', label: 'Trial Helmets', id: 3 },
	{ to: 'accessories', label: 'Helmets Parts & Accessories', id: 4 },
];

const FilterElement = ({activeId, setActiveId}) => {
	// const [activeId, setActiveId] = useState(null);

	const linkClass = (id) =>
		`${styles.link} ${activeId === id ? styles.active : ''}`;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					<div className={linkClass(null)} onClick={() => setActiveId(null)}>
						All
					</div>

					{CATEGORIES.map((c) => (
						<div
							key={c.id}
							className={linkClass(c.id)}
							onClick={() => setActiveId(c.id)}>
							{c.label}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilterElement;

/* eslint-disable react/prop-types */
// import { useState } from 'react';
import styles from './FilterElement.module.less';
import {useState} from 'react';

const visibleCount = 7;

const FilterElement = ({ categoryId, activeId, setActiveId, categories }) => {
	const [expanded, setExpanded] = useState(false);

	const linkClass = (id) =>
		`${styles.link} ${activeId === id ? styles.active : ''}`;

	const filteredCategories = categories.filter(
		(category) => category.parent_id === categoryId
	);

	const visibleCategories = expanded
		? filteredCategories
		: filteredCategories.slice(0, visibleCount);

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					<div className={linkClass(null)} onClick={() => setActiveId(null)}>
						All
					</div>

					{visibleCategories.map((c) => (
						<div
							key={c.id}
							className={linkClass(c.id)}
							onClick={() => setActiveId(c.id)}
						>
							{c.title}
						</div>
					))}

					{filteredCategories.length > visibleCount && (
						<button
							type="button"
							className={styles.showMore}
							onClick={() => setExpanded(v => !v)}
						>
							{expanded ? 'Show Less' : 'Show More'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterElement;

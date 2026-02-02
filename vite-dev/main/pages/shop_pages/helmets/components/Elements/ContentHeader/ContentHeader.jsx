import styles from './ContentHeader.module.less';

const ContentHeader = ({ activeId, categories }) => {
	const activeCategory = categories.find(
		(category) => category.id === activeId,
	);

	const title = activeCategory?.label || 'Shop';

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div>
					<p>{title} /</p>
				</div>

				<div>
					<h3>{title}</h3>
				</div>
			</div>
		</div>
	);
};

export default ContentHeader;

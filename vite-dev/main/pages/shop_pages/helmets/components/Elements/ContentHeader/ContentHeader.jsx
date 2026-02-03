import styles from './ContentHeader.module.less';

const ContentHeader = ({ categoryId, activeId, categories }) => {
	const activeCategory = categories.find(
		(category) => category.id === activeId,
	);

	const mainCategory = categories.find(
		(category) => category.id === categoryId,
	);

	// console.log(activeId);
	const title = mainCategory.title;
	
	const subTitle = activeCategory?.title || 'All '+title;

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div>
					<p>{title} /</p>
				</div>

				<div>
					<h3>{subTitle}</h3>
				</div>
			</div>
		</div>
	);
};

export default ContentHeader;

import ContentHeader from '../Elements/ContentHeader/ContentHeader';
import FilterElement from './Filter/FilterElement';
import styles from './Elements.module.less';

const Elements = ({ categoryId, activeId, setActiveId, categories}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.content}>
					<div>
						<ContentHeader categoryId={categoryId} activeId={activeId} setActiveId={setActiveId} categories={categories}/>
					</div>

					<div>
						<FilterElement categoryId={categoryId} activeId={activeId} setActiveId={setActiveId} categories={categories}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Elements;

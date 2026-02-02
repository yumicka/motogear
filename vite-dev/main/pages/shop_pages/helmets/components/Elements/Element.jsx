import ContentHeader from '../Elements/ContentHeader/ContentHeader';
import FilterElement from './Filter/FilterElement';
import styles from './Elements.module.less';

const Elements = ({ activeId, setActiveId, categories}) => {
	console.log(activeId);
	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.content}>
					<div>
						<ContentHeader activeId={activeId} setActiveId={setActiveId} categories={categories}/>
					</div>

					<div>
						<FilterElement activeId={activeId} setActiveId={setActiveId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Elements;

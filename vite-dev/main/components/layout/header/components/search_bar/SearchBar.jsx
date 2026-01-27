import React from 'react';
import SearchBarLogo from './components/search_bar_logo/SearchBarLogo';
import styles from './Search.module.less';

const SearchBar = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<form>
					<div className={styles.search_input}>
						<SearchBarLogo />
						<input
							type="text"
							id="search"
							placeholder={'Search for product, category, brand or bike...'}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SearchBar;

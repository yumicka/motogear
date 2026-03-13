import React, { useEffect, useState } from 'react';
import SearchBarLogo from './components/search_bar_logo/SearchBarLogo';
import styles from './Search.module.less';
import Link from 'core/navigation/link';
import Image from 'ui/media/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const SearchBar = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (query.length < 1) {
			setResults([]);
			return;
		}

		const timeout = setTimeout(() => {
			remoteRequest({
				url: 'products/search',
				data: {
					filters: {
						search: query,
					},
					results_per_page: 5,
				},
				onSuccess: (res) => {
					setResults(res.rows || []);
					setOpen(true);
				},
				onError: () => {
					setResults([]);
				},
			});
		}, 300);

		return () => clearTimeout(timeout);
	}, [query]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.search_input}>
					<SearchBarLogo />

					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={_g.lang('search')}
						onFocus={() => results.length && setOpen(true)}
					/>

					{query && (
						<button
							type="button"
							className={styles.clearBtn}
							onClick={() => {
								setQuery('');
								setResults([]);
								setOpen(false);
							}}>
							<FontAwesomeIcon icon={faCircleXmark} />
						</button>
					)}

					{open && results.length > 0 && (
						<div className={styles.dropdown}>
							{results.map((item) => (
								<Link key={item.id} to={item.url} className={styles.resultItem}>
									<Image src={item.image?.image} alt={item.title} />
									<span>{item.title}</span>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default SearchBar;

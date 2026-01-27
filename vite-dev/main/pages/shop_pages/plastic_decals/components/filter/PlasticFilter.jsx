import styles from './PlasticFilter.module.less';
import Categories from './PlasticCategories';
import { useParams } from 'react-router-dom';

const CATEGORY_TITLES = {
	'plastic-kits': 'Plastic Kits',
	'chain-guide-chain-slide': 'Chain Guide & Chain Slide',
	'hand-guards': 'Hand Guards',
	'disc-guards': 'Disc Guards',
	'skid-plates': 'Skid Plates',
	'frame-protection': 'Frame Protection',
	'single-plastic-part': 'Single Plastic Part',
	'seats-seat-covers': 'Seats & Seat Covers',
	'bolts-washers': 'Bolts & Washers',
	'fuel-tanks-caps': 'Fuel Tanks & Fuel Caps',
	'radiator-guards': 'Radiator Guards',
	'axle-blocks': 'Axle Blocks',
	'decal-kits': 'Decal Kits'
};

const PlasticFilter = () => {
	const { category } = useParams();

	const title = category
		? CATEGORY_TITLES[category]
		: 'Plastic Kits & Protection';

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div>
					<p>Plastic & Decals /</p>
				</div>

				<div>
					<h3>{title}</h3>
				</div>

				<div>
					<Categories />
				</div>
			</div>
		</div>
	);
};

export default PlasticFilter;

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './PlasticCategories.module.less';

const CATEGORIES = [
	{ to: '/plasticsDecals', label: 'All Plastic Kits & Protection', end: true },
	{ to: '/plasticsDecals/plastic-kits', label: 'Plastic Kits' },
	{to: '/plasticsDecals/chain-guide-chain-slide', label: 'Chain Guide & Chain Slide' },
	{ to: '/plasticsDecals/hand-guards', label: 'Hand Guards' },
	{ to: '/plasticsDecals/disc-guards', label: 'Disc Guards' },
	{ to: '/plasticsDecals/skid-plates', label: 'Skid Plates' },
	{ to: '/plasticsDecals/frame-protection', label: 'Frame Protection' },
	{ to: '/plasticsDecals/single-plastic-part', label: 'Single Plastic Part' },
	{ to: '/plasticsDecals/seats-seat-covers', label: 'Seats & Seat Covers' },
	{ to: '/plasticsDecals/bolts-washers', label: 'Bolts & Washers' },
	{ to: '/plasticsDecals/fuel-tanks-caps', label: 'Fuel Tanks & Fuel Caps' },
	{ to: '/plasticsDecals/radiator-guards', label: 'Radiator Guards' },
	{ to: '/plasticsDecals/axle-blocks', label: 'Axle Blocks' },
	{ to: '/plasticsDecals/decal-kits', label: 'Decal Kits' },


];

const VISIBLE_COUNT = 7;

const PlasticCategories = () => {
	const [expanded, setExpanded] = useState(false);

	const linkClass = ({ isActive }) =>
		`${styles.link} ${isActive ? styles.active : ''}`;

	const visibleCategories = expanded
		? CATEGORIES
		: CATEGORIES.slice(0, VISIBLE_COUNT);

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<div className={styles.categories}>
					{visibleCategories.map((c) => (
						<NavLink key={c.to} to={c.to} end={c.end} className={linkClass}>
							{c.label}
						</NavLink>
					))}

					{CATEGORIES.length > VISIBLE_COUNT && (
						<button
							type="button"
							className={styles.showMore}
							onClick={() => setExpanded((v) => !v)}>
							{expanded ? 'Show Less' : '...'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlasticCategories;

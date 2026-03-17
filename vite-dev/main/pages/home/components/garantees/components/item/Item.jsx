import React from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBagShopping,
	faBoltLightning,
	faCircleCheck,
	faDollarSign,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons';

import styles from '../../Garantees.module.less';

const iconMap = {
	bolt: faBoltLightning,
	check: faCircleCheck,
	dollar: faDollarSign,
	repeat: faRepeat,
	bag: faBagShopping,
};

const uiProps = (ownProps) => ({
	collectionItems: {
		[ownProps.id]: {
			langData: 'langData',
			data: 'data',
		},
	},
});

let Item = ({ id, langData, data, onClick }) => {
	const icon = iconMap[data?.icon];

	const handleClick = () => {
		onClick({
			title: langData?.title,
			full: langData?.full,
			icon: icon ? <FontAwesomeIcon icon={icon} /> : null,
		});
	};

	return (
		<Editable
			edit={{
				name: 'garantees',
				action: 'edit',
				id: id,
			}}>
			<button type="button" className={styles.card} onClick={handleClick}>
				<div className={styles.content}>
					<div className={styles.icon}>
						{icon && <FontAwesomeIcon icon={icon} />}
					</div>

					<div className={styles.heading}>{langData?.title}</div>

					<div className={styles.text}>{langData?.short}</div>
				</div>
			</button>
		</Editable>
	);
};

Item.propTypes = {
	id: PropTypes.number,
	langData: PropTypes.object,
	data: PropTypes.object,
	onClick: PropTypes.func,
};

export default WithUi(uiProps)(Item);

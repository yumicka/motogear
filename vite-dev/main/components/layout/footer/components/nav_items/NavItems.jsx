import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './NavItems.module.less';
import navItems from 'main/components/layout/header/navItems';
import Link from 'core/navigation/link';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class NavItems extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.nav_items_wrapper}>
				<div className={styles.link_wrapper}>
					{navItems.map((item, index) => {
						return (
							<Link to={item.link} key={index} className={styles.nav_item}>
								{item.title}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

NavItems.propTypes = propTypes;

NavItems.defaultProps = defaultProps;

export default WithUi(uiProps)(NavItems);

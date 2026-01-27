import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Bottom.module.less';
import Mark from './components/Mark';

const propTypes = {};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {};
};

class Bottom extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.disclaimer}>{_g.lang('disclaimer')}</div>
				<div className={styles.liaa}>
					<Mark />
					<span className={styles.liaa_text}>{_g.lang('liaa')}</span>
				</div>
			</div>
		);
	}
}

Bottom.propTypes = propTypes;

Bottom.defaultProps = defaultProps;

export default WithUi(uiProps)(Bottom);

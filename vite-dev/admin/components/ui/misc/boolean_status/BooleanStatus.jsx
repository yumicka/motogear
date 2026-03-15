import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BooleanStatus.module.less';

const propTypes = {
	title: PropTypes.string.isRequired,
	isTrue: PropTypes.bool,
	status: PropTypes.string,
	variant: PropTypes.oneOf(['default', 'active', 'pinned']),
};

const defaultProps = {
	isTrue: false,
	status: null,
	variant: 'default',
};

const STATUS_CLASSES = {
	pending: styles.pending,

	payment_pending: styles.payment_pending,
	paid: styles.paid,
	failed: styles.failed,
	cancelled: styles.cancelled,

	declined: styles.declined,
	processing: styles.processing,
	confirmed: styles.confirmed,

	shipped: styles.shipped,
	delivered: styles.delivered,

	completed: styles.completed,
	refunded: styles.refunded,
};

class BooleanStatus extends Component {
	render() {
		const { title, status, isTrue, variant } = this.props;

		const className = _g.classNames(
			styles.wrapper,
			status ? STATUS_CLASSES[status] : null,
			!status && variant === 'active' && isTrue ? styles.activeTrue : null,
			!status && variant === 'active' && !isTrue ? styles.activeFalse : null,
			!status && variant === 'pinned' && isTrue ? styles.pinnedTrue : null,
			!status && variant === 'pinned' && !isTrue ? styles.pinnedFalse : null,
			!status && variant === 'default' && isTrue ? styles.defaultTrue : null,
			!status && variant === 'default' && !isTrue ? styles.defaultFalse : null,
		);

		return <div className={className}>{title}</div>;
	}
}

BooleanStatus.propTypes = propTypes;
BooleanStatus.defaultProps = defaultProps;

export default BooleanStatus;
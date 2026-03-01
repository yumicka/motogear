import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BooleanStatus.module.less';

const propTypes = {
	title: PropTypes.string.isRequired,
	isTrue: PropTypes.bool,
};

const defaultProps = {
	isTrue: false,
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
	constructor(props) {
		super(props);
	}

	render() {
		const { title, status } = this.props;

		const className = _g.classNames(
			styles.wrapper,
			STATUS_CLASSES[status]
		);

		return <div className={className}>{title}</div>;
	}
}

BooleanStatus.propTypes = propTypes;

BooleanStatus.defaultProps = defaultProps;

export default BooleanStatus;

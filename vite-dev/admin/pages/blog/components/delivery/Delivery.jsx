import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Piegādes pārvadātāji',
	popupName: 'delivery',
	tableName: 'delivery_companies',
	action: 'administration/blog/delivery/actions',
	search: 'administration/blog/delivery/search',
};

class Delivery extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Piegādes pārvadātāji</Title>
				<Table {...config} />
			</Card>
		);
	}
}

Delivery.propTypes = propTypes;

Delivery.defaultProps = defaultProps;

export default Delivery;

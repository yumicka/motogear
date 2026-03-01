import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pasutījumi',
	popupName: 'orders',
	tableName: 'dt_orders',
	action: 'administration/blog/orders/actions',
	search: 'administration/blog/orders/search',
};

class Orders extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Veikala pasutījumi</Title>
				{/* <AddButton {...config} /> */}
				<Table {...config} />
			</Card>
		);
	}
}

Orders.propTypes = propTypes;

Orders.defaultProps = defaultProps;

export default Orders;

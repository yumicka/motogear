import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';
import AddButton from './components/add_button';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pievienot brand',
	popupName: 'brands',
	tableName: 'dt_brands',
	action: 'administration/blog/brands/actions',
	search: 'administration/blog/brands/search',
};

class Brands extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Pieejami brands</Title>
				<AddButton {...config} />
				<Table {...config} />
			</Card>
		);
	}
}

Brands.propTypes = propTypes;

Brands.defaultProps = defaultProps;

export default Brands;

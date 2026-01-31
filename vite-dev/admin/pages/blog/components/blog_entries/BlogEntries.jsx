import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import AddButton from './components/add_button';
import Table from './components/table';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pievienojiet jaunu produktu',
	popupName: 'products_entry',
	tableName: 'products',
	action: 'administration/blog/actions',
	search: 'administration/blog/search',
};

class BlogEntries extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Title>Veikala ieraksti</Title>
				<AddButton {...config} />
				<Table {...config} />
			</Card>
		);
	}
}

BlogEntries.propTypes = propTypes;

BlogEntries.defaultProps = defaultProps;

export default BlogEntries;

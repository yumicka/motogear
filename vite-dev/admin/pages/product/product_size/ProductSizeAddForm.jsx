/* eslint-disable react/prop-types */
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';
import AddButton from './components/add_button';

import styles from './ProductSizeAddForm.module.less';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pievienot izmēru produktam',
	popupName: 'product_size',
	tableName: 'dt_product_sizes',
	action: 'administration/blog/product_sizes/actions',
	search: 'administration/blog/product_sizes/search',
};

class SpecificationsAddForm extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		const { p_id } = this.props;
		return (
			<Card>
				<Title>Izmēru pievienošana produktam</Title>
				<div className={styles.wrapper}>
					<div>
						<AddButton product_id={p_id} {...config} />
					</div>
				</div>
				<Table {...config} product_id={p_id} />
			</Card>
		);
	}
}

SpecificationsAddForm.propTypes = propTypes;

SpecificationsAddForm.defaultProps = defaultProps;

export default SpecificationsAddForm;

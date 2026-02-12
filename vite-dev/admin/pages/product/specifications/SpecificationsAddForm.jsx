/* eslint-disable react/prop-types */
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Title from 'ui/common/title';
import Card from 'ui/common/card';
import Table from './components/table';
import AddButton from './components/add_button';

import styles from './SpecificationsAddForm.module.less';

const propTypes = {};

const defaultProps = {};

const config = {
	title: 'Pievienot jaunu detalizētu specifikāciju',
	popupName: 'specifications',
	tableName: 'dt_specifications',
	action: 'administration/blog/specifications/actions',
	search: 'administration/blog/specifications/search',
};

class SpecificationsAddForm extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		const { p_id } = this.props;
		return (
			<Card>
				<Title>Detalizētas Specifikācijas</Title>
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

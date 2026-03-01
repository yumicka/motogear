import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
};

const syncWithUrl = true;
const resultsPerPage = 10;
const order = { id: 'desc' };

class Table extends Component {
	getColumns = () => {
		const columns = [];

		columns.push({ name: 'id', title: 'ID', isHidable: false });

		columns.push({ name: 'brand_name', title: 'Brand name' });

		columns.push({ name: 'product_id', title: 'Product ID' });

		columns.push({ name: 'image_id', title: 'Image ID' });

		columns.push({ name: 'size_guide_image_id', title: 'Size guide image ID' });

		columns.push({ name: 'created_at', title: 'Created' });

		columns.push({
			name: 'action',
			title: 'Darbība',
			isHidable: false,
			sortable: false,
			style: { width: '50px' },
		});

		return columns;
	};

	getFilters = () => {
		const filters = [];

		filters.push({
			label: 'ID',
			name: 'id',
			component: Input,
			componentProps: { placeholder: 'ID', clearable: true },
		});

		filters.push({
			label: 'Brand name',
			name: 'brand_name',
			component: Input,
			componentProps: { placeholder: 'Brand name', clearable: true },
		});

		filters.push({
			label: 'Product ID',
			name: 'product_id',
			component: Input,
			componentProps: { placeholder: 'Product ID', clearable: true },
		});

		return filters;
	};

	getColumnRenderers = () => {
		const { popupName } = this.props;
		const columnRenderers = {};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Skatīt',
							icon: { provider: 'icomoon', name: 'eye' },
							onClick: () => {
								openPopup({ name: popupName, data: { id, tab: 'view' } });
							},
						},
						{
							title: 'Rediģēt',
							icon: { provider: 'icomoon', name: 'pencil' },
							onClick: () => {
								openPopup({ name: popupName, data: { id, tab: 'edit' } });
							},
						},
						{
							title: 'Dzēst',
							icon: { provider: 'icomoon', name: 'trash' },
							onClick: () => {
								openPopup({ name: popupName, data: { id, tab: 'delete' } });
							},
						},
					]}
				/>
			);
		};

		return columnRenderers;
	};

	render() {
		const { tableName, search } = this.props;

		return (
			<DataTable
				id={tableName}
				url={search}
				syncWithUrl={syncWithUrl}
				resultsPerPage={resultsPerPage}
				order={order}
				columns={this.getColumns()}
				filters={this.getFilters()}
				columnRenderers={this.getColumnRenderers()}
			/>
		);
	}
}

Table.propTypes = propTypes;

export default Table;

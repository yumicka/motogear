import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DataTable from 'ui/tables/data_table';
import Input from 'ui/inputs/input';
import BooleanStatus from 'admin/components/ui/misc/boolean_status';
import ActionsMenu from 'ui/tables/data_table/extra/actions_menu';

const propTypes = {
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
};

const syncWithUrl = true;
const resultsPerPage = 10;
const order = { id: 'desc' };

class OrdersTable extends Component {
	getColumns = () => {
		const columns = [];

		columns.push({ name: 'id', title: 'ID', isHidable: false });

		columns.push({ name: 'created_at', title: 'Izvedots' });

		columns.push({ name: 'updated_at', title: 'Atjaunots' });

		columns.push({ name: 'name', title: 'Nosaukums' });

		columns.push({ name: 'lv_price', title: 'Cena Latvijā' });

		columns.push({ name: 'lt_price', title: 'Cena Lietuvā' });

		columns.push({ name: 'ee_price', title: 'Cena Igaunijā' });

		columns.push({ name: 'active', title: 'Aktīvs' });


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
			componentProps: {
				placeholder: 'ID',
				clearable: true,
			},
		});
		return filters;
	};

	getColumnRenderers = () => {
		const { popupName } = this.props;
		const columnRenderers = {};

		columnRenderers.total = ({ cell }) => {
			return <span>{Number(cell).toFixed(2)} €</span>;
		};

		columnRenderers.order_status = ({ cell }) => {
			return <BooleanStatus title={cell} status={cell} />;
		};

		columnRenderers.action = ({ id }) => {
			return (
				<ActionsMenu
					options={[
						{
							title: 'Rediģēt',
							icon: { provider: 'icomoon', name: 'pencil' },
							onClick: () => {
								openPopup({
									name: popupName,
									data: { id, tab: 'edit' },
								});
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

OrdersTable.propTypes = propTypes;

export default OrdersTable;

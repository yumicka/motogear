import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import RangeInput from 'ui/inputs/range_input';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	//from ui
	langs: PropTypes.array,
	item: PropTypes.object,
	translations: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
			},
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.multiSet([
				{
					path: `${containerName}.data.item`,
					value: response.item,
				},
			]);
		}
		//</editor-fold>
	};

	renderFields = () => {
		const { item } = this.props;
		const { name } = item;
		const { lv_price } = item;
		const { lt_price } = item;
		const { ee_price } = item;

		return (
			<Fragment>
				<Field
					label="Nosaukums"
					name="name"
					component={Input}
					value={name}
				/>

				<Field
					label="Cena Latvijā"
					name="lv_price"
					component={Input}
					value={lv_price}
					number={{ allowNegative: false, allowDecimal: true }}
				/>

				<Field
					label="Cena Lietuvā"
					name="lt_price"
					component={Input}
					value={lt_price}
					number={{ allowNegative: false, allowDecimal: true }}
				/>

				<Field
					label="Cena Igaunijā"
					name="ee_price"
					component={Input}
					value={ee_price}
					number={{ allowNegative: false, allowDecimal: true }}
				/>
			</Fragment>
		);
	};

	render() {
		const { action, id } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id: id,
				}}
				// onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{
					title: 'Saglabāt',
				}}>
				{this.renderFields()}
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;

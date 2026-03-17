import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import EditCollectionItem from 'cms/collection/edit';
import Delete from 'cms/collection/delete';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';
import { get, head } from "lodash";
import TextArea from 'ui/inputs/textarea';

const propTypes = {
	id: PropTypes.number.isRequired,
	//from ui
	loading: PropTypes.bool,
	name: PropTypes.string,
	collectionId: PropTypes.number,
	langData: PropTypes.object,
	langs: PropTypes.array,
};

const defaultProps = {
	//from ui
	loading: true,
};

const uiProps = ownProps => {
	return {
		CMSPopup: {
			loading: 'loading',
			langs: 'langs',
			collection: {
				name: 'name',
				collectionId: 'collectionId',
				langData: 'langData',
			},
		},
	};
};

class Garantees extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		const { id } = this.props;
		uiStore.update('CMSPopup', {
			title: 'Rediģet garantijas #' + id,
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs } = this.props;

		if (loading) {
			return null;
		}

		
		return (
			<Fragment>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = get(langData, lang, {});

		const title = get(_langData, 'title', '');
		const short = get(_langData, 'short', '');
		const full = get(_langData, 'full', '');

		return (
			<Fragment>
				<Field
					label="Virsraksts"
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>
				<Field
					label="Īss apraksts"
					name={`${lang}_short`}
					component={Input}
					value={short}
				/>
				<Field
					label="Pilns apraksts"
					name={`${lang}_full`}
					component={TextArea}
					value={full}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	renderDelete = () => {
		//<editor-fold defaultstate="collapsed" desc="renderDelete">
		const { loading, id, name, collectionId } = this.props;

		if (loading) {
			return null;
		}

		return (
			<Delete
				id={id}
				name={name}
				collectionId={collectionId}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { id } = this.props;
		return (
			<Fragment>
				<EditCollectionItem id={id}>{this.renderForm()}</EditCollectionItem>
				{this.renderDelete()}
			</Fragment>
		);
	}
}

Garantees.propTypes = propTypes;

Garantees.defaultProps = defaultProps;

Garantees = WithUi(uiProps)(Garantees);

export default Garantees;
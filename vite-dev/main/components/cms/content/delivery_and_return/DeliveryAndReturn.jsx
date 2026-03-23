import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
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
			content: {
				langData: 'langData',
			},
		},
	};
};

class DeliveryAndReturn extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'edit',
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs  } = this.props;

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

		const content = get(_langData, 'content', '');

		return (
			<Fragment>
				<Field
					label="Content"
					name={`${lang}_content`}
					component={CKEditor}
					isRequired={true}
					value={content}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="delivery_and_return">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

DeliveryAndReturn.propTypes = propTypes;

DeliveryAndReturn.defaultProps = defaultProps;

DeliveryAndReturn = WithUi(uiProps)(DeliveryAndReturn);

export default DeliveryAndReturn;

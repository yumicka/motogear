import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
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
				data: 'data',
				langData: 'langData',
			},
		},
	};
};

class ContactForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//<editor-fold defaultstate="collapsed" desc="componentDidMount">
		uiStore.update('CMSPopup', {
			title: 'Rediģēt',
		});
		//</editor-fold>
	}

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs , data } = this.props;

		if (loading) {
			return null;
		}

		const link_to_media1 = get(data, 'link_to_media1', '');
		const link_to_media2 = get(data, 'link_to_media2', '');
		const link_to_media3 = get(data, 'link_to_media3', '');
		const link_to_media4 = get(data, 'link_to_media4', '');
		
		return (
			<Fragment>
				<Field 
					label="Saite uz pirmo sociālo tīklu" 
					name="link_to_media1" 
					component={Input}
					value={link_to_media1}
				/>
				<Field 
					label="Saite uz otro sociālo tīklu" 
					name="link_to_media2" 
					component={Input}
					value={link_to_media2}
				/>
				<Field 
					label="Saite uz trešo sociālo tīklu" 
					name="link_to_media3" 
					component={Input}
					value={link_to_media3}
				/>
				<Field 
					label="Saite uz ceturto sociālo tīklu" 
					name="link_to_media4" 
					component={Input}
					value={link_to_media4}
				/>
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = lang => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { langData } = this.props;
		const _langData = get(langData, lang, {});

		const social_media1 = get(_langData, 'social_media1', '');
		const social_media2 = get(_langData, 'social_media2', '');
		const social_media3 = get(_langData, 'social_media3', '');
		const social_media4 = get(_langData, 'social_media4', '');

		return (
			<Fragment>
				<Field
					label="Pirmā sociālā tīkla nosaukums"
					name={`${lang}_social_media1`}
					component={Input}
					value={social_media1}
				/>
				<Field
					label="Otrā sociālā tīkla nosaukums"
					name={`${lang}_social_media2`}
					component={Input}
					value={social_media2}
				/>
				<Field
					label="Trešā sociālā tīkla nosaukums"
					name={`${lang}_social_media3`}
					component={Input}
					value={social_media3}
				/>
				<Field
					label="Ceturtā sociālā tīkla nosaukums"
					name={`${lang}_social_media4`}
					component={Input}
					value={social_media4}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="contact_form">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

ContactForm.propTypes = propTypes;

ContactForm.defaultProps = defaultProps;

ContactForm = WithUi(uiProps)(ContactForm);

export default ContactForm;

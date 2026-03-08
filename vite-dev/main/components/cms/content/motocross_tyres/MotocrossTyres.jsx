import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
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

class MotocrossTyres extends Component {
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

		const link = get(data, 'link', '');
		
		return (
			<Fragment>
				<Field 
					label="Links" 
					name="link" 
					component={Input}
					value={link}
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

		const title = get(_langData, 'title', '');
		const content = get(_langData, 'content', '');
		const button_title = get(_langData, 'button_title', '');

		return (
			<Fragment>
				<Field
					label="Virsraksts"
					name={`${lang}_title`}
					component={Input}
					value={title}
				/>
				<Field
					label="Apraksts"
					name={`${lang}_content`}
					component={TextArea}
					value={content}
				/>
				<Field
					label="Pogas nosaukums"
					name={`${lang}_button_title`}
					component={Input}
					value={button_title}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				<EditContentForm name="motocross_tyres">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

MotocrossTyres.propTypes = propTypes;

MotocrossTyres.defaultProps = defaultProps;

MotocrossTyres = WithUi(uiProps)(MotocrossTyres);

export default MotocrossTyres;

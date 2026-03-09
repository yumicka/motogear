import React, { PureComponent as Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { get, head } from 'lodash-es';

import EditContentForm from 'cms/content';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import TextArea from 'ui/inputs/textarea';
import ImageAdministration from 'ui/media/administration/image/cms';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	//from ui
	loading: PropTypes.bool,
	data: PropTypes.object,
	langData: PropTypes.object,
	langs: PropTypes.array,
	images: PropTypes.array,
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
				media: {
					images: 'images',
				},
			},
		},
	};
};

class CustomizeYourLookLeft extends Component {
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

	renderImageAdministration = () => {
		//<editor-fold defaultstate="collapsed" desc="renderImageAdministration">
		const { images, loading } = this.props;

		if (loading) {
			return null;
		}

		return <ImageAdministration id={head(images)} />;
		//</editor-fold>
	};

	renderForm = () => {
		//<editor-fold defaultstate="collapsed" desc="renderForm">
		const { loading, langs , data } = this.props;

		if (loading) {
			return null;
		}

		const link_left = get(data, 'link_left', '');
		
		return (
			<Fragment>
				<Field 
					label="Links" 
					name="link_left" 
					component={Input}
					value={link_left}
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

		const title_left = get(_langData, 'title_left', '');
		const content_left = get(_langData, 'content_left', '');
		const button_title_left = get(_langData, 'button_title_left', '');

		return (
			<Fragment>
				<Field
					label="Virsraksts"
					name={`${lang}_title_left`}
					component={Input}
					value={title_left}
				/>
				<Field
					label="Apraksts"
					name={`${lang}_content_left`}
					component={TextArea}
					value={content_left}
				/>
				<Field
					label="Pogas nosaukums"
					name={`${lang}_button_title_left`}
					component={Input}
					value={button_title_left}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="customize_your_look_left">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

CustomizeYourLookLeft.propTypes = propTypes;

CustomizeYourLookLeft.defaultProps = defaultProps;

CustomizeYourLookLeft = WithUi(uiProps)(CustomizeYourLookLeft);

export default CustomizeYourLookLeft;

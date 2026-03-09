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

class CustomizeYourLookRight extends Component {
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

		const link_right = get(data, 'link_right', '');
		
		return (
			<Fragment>
				<Field 
					label="Links" 
					name="link_right" 
					component={Input}
					value={link_right}
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

		const title_right = get(_langData, 'title_right', '');
		const content_right = get(_langData, 'content_right', '');
		const button_title_right = get(_langData, 'button_title_right', '');

		return (
			<Fragment>
				<Field
					label="Virsraksts"
					name={`${lang}_title_right`}
					component={Input}
					value={title_right}
				/>
				<Field
					label="Apraksts"
					name={`${lang}_content_right`}
					component={TextArea}
					value={content_right}
				/>
				<Field
					label="Pogas nosaukums"
					name={`${lang}_button_title_right`}
					component={Input}
					value={button_title_right}
				/>
			</Fragment>
		);
		//</editor-fold>
	};

	render() {
		return (
			<Fragment>
				{this.renderImageAdministration()}
				<EditContentForm name="customize_your_look_right">
					{this.renderForm()}
				</EditContentForm>
			</Fragment>
		);
	}
}

CustomizeYourLookRight.propTypes = propTypes;

CustomizeYourLookRight.defaultProps = defaultProps;

CustomizeYourLookRight = WithUi(uiProps)(CustomizeYourLookRight);

export default CustomizeYourLookRight;

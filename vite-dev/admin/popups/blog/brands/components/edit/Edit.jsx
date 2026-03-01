import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';
import { forEach, get, replace } from 'lodash-es';

import styles from './Edit.module.less';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// from ui
	langs: PropTypes.array,
	item: PropTypes.object,
	translations: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		langs: 'langs',
		[ownProps.containerName]: {
			data: {
				item: 'item',
				translations: 'translations',
			},
		},
	};
};

class Edit extends Component {
	onBeforeSubmit = ({ data }) => {
		// base64 encode only `${lang}_description`
		const { langs } = this.props;

		forEach(data, (r, key) => {
			const check = key.substr(0, 3);

			if (check[2] === '_' && _g.inArray(key.substr(0, 2), langs)) {
				const lang = key.substr(0, 2);
				const checkKey = replace(key, `${lang}_`, '');

				if (_g.inArray(checkKey, ['description'])) {
					data[key] = Base64.encode(data[key] || '');
				}
			}
		});
	};

	onSuccess = ({ response }) => {
		const { tableName, containerName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.multiSet([
				{ path: `${containerName}.data.item`, value: response.item },
				{
					path: `${containerName}.data.translations`,
					value: response.translations,
				},
			]);
		}
	};

	renderFields = () => {
		const { item } = this.props;

		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Pamata informācija</h3>
					<p className={styles.sectionDescription}>Zīmola nosaukums</p>

					<div className={styles.detailsRow}>
						<Field
							label="Brand name"
							name="brand_name"
							component={Input}
							value={get(item, 'brand_name', '')}
						/>
					</div>
				</div>
			</Fragment>
		);
	};

	renderLangTab = (lang) => {
		const { translations } = this.props;

		// контроллер использует data.description
		const description = get(translations, `${lang}.data.description`, '');

		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Apraksts</h3>
					<p className={styles.sectionDescription}>Zīmola apraksts</p>

					<div className={styles.detailsRow}>
						<Field
							label="Description"
							name={`${lang}_description`}
							component={CKEditor}
							value={description}
						/>
					</div>
				</div>
			</Fragment>
		);
	};

	render() {
		const { action, id, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id: id,
				}}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{ title: 'Saglabāt' }}>
				{this.renderFields()}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;

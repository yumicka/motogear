import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import { Base64 } from 'js-base64';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';

import styles from './AddForm.module.less';

import { forEach, replace } from 'lodash-es';

const propTypes = {
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,

	// from ui
	langs: PropTypes.array,
};

const defaultProps = {};

const uiProps = () => {
	return {
		langs: 'langs',
	};
};

class AddForm extends Component {
	onBeforeSubmit = ({ data }) => {
		const { langs } = this.props;

		// Encode description per language (как ты делал для content)
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

	onSuccess = () => {
		const { tableName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });
	};

	renderFields = () => {
		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Brand</h3>
					<p className={styles.sectionDescription}>Pamata informācija</p>

					<div className={styles.detailsRow}>
						<Field
							label="Brand name"
							name="brand_name"
							component={Input}
							componentProps={{ placeholder: 'Brand name' }}
						/>
					</div>
				</div>
			</Fragment>
		);
	};

	renderLangTab = (lang) => {
		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Brand description</h3>
					<p className={styles.sectionDescription}>Apraksts ({lang})</p>

					<div className={styles.detailsRow}>
						<Field
							label="Apraksts"
							name={`${lang}_description`}
							component={CKEditor}
						/>
					</div>
				</div>
			</Fragment>
		);
	};

	render() {
		const { action, langs } = this.props;

		return (
			<Form
				action={action}
				extraData={{ action: 'create' }}
				refresh={true}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{ title: 'Pievienot' }}>
				{this.renderFields()}

				<LangsTab langs={langs} renderItem={this.renderLangTab} />
			</Form>
		);
	}
}

AddForm.propTypes = propTypes;
AddForm.defaultProps = defaultProps;

export default WithUi(uiProps)(AddForm);

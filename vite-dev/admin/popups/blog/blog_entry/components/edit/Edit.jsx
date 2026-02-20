import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import { Base64 } from 'js-base64';

import styles from './Edit.module.less';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import CKEditor from 'ui/editors/ckeditor';
import LangsTab from 'ui/common/langs_tab';
import TextArea from 'ui/inputs/textarea';
import { forEach, get, replace } from 'lodash-es';
import SpecificationsAddForm from 'admin/pages/product/specifications/SpecificationsAddForm';
import ProductSizePopup from 'admin/popups/product/product_size/ProductSizePopup';
import Select from 'ui/inputs/select';

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
	constructor(props) {
		super(props);

		this.state = {
			is_discounted: false,
		};
	}

	componentDidMount() {
		const { item } = this.props;
		this.setState({
			is_discounted: Number(item?.product_discount) > 0,
			initialized: true,
		});
	}

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		const { langs } = this.props;

		forEach(data, (r, key) => {
			const check = key.substr(0, 3);

			if (check[2] === '_' && _g.inArray(key.substr(0, 2), langs)) {
				const lang = key.substr(0, 2);
				const checkKey = replace(key, `${lang}_`, '');

				if (_g.inArray(checkKey, ['content'])) {
					data[key] = Base64.encode(data[key]);
				}
			}
		});

		if (!this.state.is_discounted) {
			data.product_discount = 0;
		}
		//</editor-fold>
	};

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
				{
					path: `${containerName}.data.translations`,
					value: response.translations,
				},
			]);
		}
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { item } = this.props;
		const {
			categories,
			active,
			top_seller,
			pinned,
			product_price,
			product_discount,
		} = item;

		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Pamata informācija</h3>
					<p className={styles.sectionDescription}>
						Produkta kategorijas un statuss
					</p>
					<div className={styles.detailsRow}>
						<Field
							label={'Produkta kategorija'}
							name={'categories'}
							component={Select}
							value={categories}
							componentProps={{
								multi: true,
								optionsUrl: 'administration/blog/categories/actions',
								valueKey: 'id',
								searchable: true,
								labelKey: 'title',
								extraData: { action: 'get_options' },
							}}
						/>
						<Field
							label="Aktīvs"
							name="active"
							component={Checkbox}
							value={active}
						/>

						<Field
							label="Populāra prece"
							name="top_seller"
							component={Checkbox}
							value={top_seller}
						/>
						<Field
							label="Pin"
							name="pinned"
							component={Checkbox}
							value={pinned}
						/>
					</div>
				</div>

				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Produkta cena</h3>
					<p className={styles.sectionDescription}>Produkta cena un atlaide</p>
					<div className={styles.detailsRow}>
						<Field
							label="Standarta produkta cena"
							name="product_price"
							component={Input}
							value={product_price}
							componentProps={{
								type: 'number',
								min: 0,
								step: '0.01',
							}}
						/>

						<Field
							label="Vai ir atlaide? Noradīt % (1-100)"
							name="product_discount"
							component={Input}
							value={product_discount}
							componentProps={{
								number: {
									allowNegative: false,
									allowDecimal: false,
								},
								max: 100,
								helpText: 'Atlaides procents',
							}}
						/>
					</div>
				</div>
			</Fragment>
		);
		//</editor-fold>
	};

	renderLangTab = (lang) => {
		//<editor-fold defaultstate="collapsed" desc="renderLangTab">
		const { translations } = this.props;

		const title = get(translations, `${lang}.title`, '');
		const content = get(translations, `${lang}.data.content`, '');

		return (
			<Fragment>
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Produkta saturs</h3>
					<p className={styles.sectionDescription}>
						Produkta nosaukums un apraksts
					</p>
					<div className={styles.detailsRow}>
						<Field
							label={'Produkta nosaukums'}
							name={`${lang}_title`}
							component={Input}
							value={title}
						/>

						<Field
							label={'Apraksts'}
							name={`${lang}_content`}
							component={CKEditor}
							value={content}
						/>
					</div>
				</div>

				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>Produkta meta</h3>
					<p className={styles.sectionDescription}>
						Meta title un meta apraksts
					</p>
					<div className={styles.detailsRow}>
						<Field
							label={'Meta tituls'}
							name={`${lang}_meta_title`}
							component={Input}
							value={get(translations, `${lang}.data.meta_title`, '')}
						/>
						<Field
							label={'Meta apraksts'}
							name={`${lang}_meta_description`}
							component={TextArea}
							value={get(translations, `${lang}.data.meta_description`, '')}
						/>
					</div>
				</div>
			</Fragment>
		);
		//</editor-fold>
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
				submit={{
					title: 'Saglabāt',
				}}>
				{this.renderFields()}
				<LangsTab langs={langs} renderItem={this.renderLangTab} />
				<SpecificationsAddForm p_id={id} />
				<ProductSizePopup productId={id} />
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;

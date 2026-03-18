import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import styles from './Edit.module.less';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import Select from 'ui/inputs/select';

import { get } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object,
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

const ORDER_STATUS_OPTIONS = [
	{ id: 'pending', title: 'Tiek apstrādāts' },

	{ id: 'payment_pending', title: 'Maksājums tiek apstrādāts' },
	{ id: 'paid', title: 'Apmaksāts' },
	{ id: 'failed', title: 'Pasūtījums neizdevās' },
	{ id: 'cancelled', title: 'Pasūtījums atcelts' },

	{ id: 'declined', title: 'Pasūtījums atteikts' },
	{ id: 'processing', title: 'Pasūtījuma apstrāde' },
	{ id: 'confirmed', title: 'Pasūtījums apstiprināts' },

	{ id: 'shipped', title: 'Pasūtījums nosūtīts' },
	{ id: 'delivered', title: 'Pasūtījums piegādāts' },

	{ id: 'completed', title: 'Pasūtījums izpildīts' },
	{ id: 'refunded', title: 'Pasūtījums atgriezts' },
];

class Edit extends Component {
	onBeforeSubmit = ({ data }) => {
		data.action = 'update';
		data.id = this.props.id;

		const allowed = [
			'action',
			'id',
			'order_status',
			'tracking_number',
			'courier_company',
			'sent_email_status',
			'sent_sms_status',
		];

		Object.keys(data).forEach((k) => {
			if (!allowed.includes(k)) delete data[k];
		});
	};

	onSuccess = ({ response }) => {
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
	};

	renderReadonlyInfo = () => {
		const { item } = this.props;

		const id = get(item, 'id', '');
		const numeration = get(item, 'numeration', '');
		const created_at = get(item, 'created_at', '');

		const total = get(item, 'total', '');
		const shipping_price = get(item, 'shipping_price', '');

		const payment_type = get(item, 'payment_type', '');
		const shipping_type = get(item, 'shipping_type', '');
		const payment_reference_number = get(item, 'payment_reference_number', '');

		const first_name = get(item, 'first_name', '');
		const surname = get(item, 'surname', '');
		const email = get(item, 'email', '');
		const phone = get(item, 'phone', '');

		const company_name = get(item, 'company_name', '');
		const reg_nr = get(item, 'reg_nr', '');
		const vat_nr = get(item, 'vat_nr', '');

		const country = get(item, 'country', '');
		const postal_code = get(item, 'postal_code', '');
		const address = get(item, 'address', '');

		const other_address = Boolean(get(item, 'other_address', false));
		const delivery_country = get(item, 'delivery_country', '');
		const delivery_postal_code = get(item, 'delivery_postal_code', '');
		const delivery_address = get(item, 'delivery_address', '');

		return (
			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Pasūtījuma informācija</h3>
				<p className={styles.sectionDescription}>Pasūtījuma Nr. {id} rediģēšana</p>

				<div className={styles.detailsRow}>
					{/* <Field
						label="ID"
						name="_ro_id"
						component={Input}
						value={id}
						componentProps={{ disabled: true }}
					/> */}
					<Field
						label="Numurācija"
						name="_ro_numeration"
						component={Input}
						value={numeration}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Izveidots"
						name="_ro_created_at"
						component={Input}
						value={created_at}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Kopā"
						name="_ro_total"
						component={Input}
						value={total}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Piegādes maksa"
						name="_ro_shipping_price"
						component={Input}
						value={shipping_price}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Payment type"
						name="_ro_payment_type"
						component={Input}
						value={payment_type}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Maksājuma veids"
						name="_ro_shipping_type"
						component={Input}
						value={shipping_type}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Maksājuma atsauce"
						name="_ro_payment_reference_number"
						component={Input}
						value={payment_reference_number}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Vārds"
						name="_ro_first_name"
						component={Input}
						value={first_name}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Uzvārds"
						name="_ro_surname"
						component={Input}
						value={surname}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="E-pasts"
						name="_ro_email"
						component={Input}
						value={email}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Tālrunis"
						name="_ro_phone"
						component={Input}
						value={phone}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Uzņēmuma nosaukums"
						name="_ro_company_name"
						component={Input}
						value={company_name}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Reģ. Nr"
						name="_ro_reg_nr"
						component={Input}
						value={reg_nr}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="PVN Nr"
						name="_ro_vat_nr"
						component={Input}
						value={vat_nr}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Valsts"
						name="_ro_country"
						component={Input}
						value={country}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Pasta indekss"
						name="_ro_postal_code"
						component={Input}
						value={postal_code}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Adrese"
						name="_ro_address"
						component={Input}
						value={address}
						componentProps={{ disabled: true }}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Cita piegādes adrese"
						name="_ro_other_address"
						component={Checkbox}
						value={other_address}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Piegādes valsts"
						name="_ro_delivery_country"
						component={Input}
						value={delivery_country}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Piegādes pasta indekss"
						name="_ro_delivery_postal_code"
						component={Input}
						value={delivery_postal_code}
						componentProps={{ disabled: true }}
					/>
					<Field
						label="Piegādes adrese"
						name="_ro_delivery_address"
						component={Input}
						value={delivery_address}
						componentProps={{ disabled: true }}
					/>
				</div>
			</div>
		);
	};

	renderEditableFields = () => {
		const { item } = this.props;

		const order_status = get(item, 'order_status', '');
		const tracking_number = get(item, 'tracking_number', '');
		const courier_company = get(item, 'courier_company', '');

		const sent_email_status = Boolean(get(item, 'sent_email_status', false));
		const sent_sms_status = Boolean(get(item, 'sent_sms_status', false));

		return (
			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Administrēšana</h3>
				<p className={styles.sectionDescription}>Statuss un piegādes dati</p>

				<div className={styles.detailsRow}>
					<Field
						label="Pasūtījuma statuss"
						name="order_status"
						component={Select}
						value={order_status}
						componentProps={{
							options: ORDER_STATUS_OPTIONS,
							valueKey: 'id',
							labelKey: 'title',
							searchable: true,
						}}
					/>

					<Field
						label="Kurjeru kompānija"
						name="courier_company"
						component={Input}
						value={courier_company}
					/>

					<Field
						label="Sūtījuma numurs"
						name="tracking_number"
						component={Input}
						value={tracking_number}
					/>
				</div>

				<div className={styles.detailsRow}>
					<Field
						label="Nosūtīts e-pasts"
						name="sent_email_status"
						component={Checkbox}
						value={sent_email_status}
					/>
					<Field
						label="Nosūtīts SMS"
						name="sent_sms_status"
						component={Checkbox}
						value={sent_sms_status}
					/>
				</div>
			</div>
		);
	};

	renderProducts = () => {
		const { item } = this.props;

		let products = get(item, 'order_data', []);

		if (typeof products === 'string') {
			try {
				products = JSON.parse(products);
			} catch (e) {
				products = [];
			}
		}

		return (
			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Produkti</h3>

				{!products.length && <div>Nav produktu</div>}

				{products.map((p, i) => {
					const title = get(p, 'title', '');
					const image = get(p, 'image.thumbnail', '');
					const price = get(p, 'calculated_price', '');
					const quantity = get(p, 'quantity', '');
					const total = get(p, 'total', '');
					const size = get(p, 'selected_variant.product_size', '');

					return (
						<div key={i} className={styles.productRow}>
							{image && (
								<img src={image} alt={title} className={styles.productImage} />
							)}

							<div className={styles.productInfo}>
								<div className={styles.productTitle}>{title}</div>

								<div className={styles.productMeta}>
									<span>Izmērs: {size}</span>
								</div>
								<div className={styles.productMeta}>
									<span>Daudzums: {quantity}</span>
								</div>

								<div className={styles.productPrices}>
									<span>Cena: {price} €</span>
								</div>
								<div className={styles.productPrices}>
									<span>Kopā: {total} €</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	render() {
		const { action, id } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id,
				}}
				onBeforeSubmit={this.onBeforeSubmit}
				onSuccess={this.onSuccess}
				submit={{ title: 'Saglabāt' }}>
				{this.renderReadonlyInfo()}
				{this.renderEditableFields()}
				{this.renderProducts()}
			</Form>
		);
	}
}

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;

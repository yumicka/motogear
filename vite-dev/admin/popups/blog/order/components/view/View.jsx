/* eslint-disable react/prop-types */
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './View.module.less';
import WithUi from 'hoc/store/ui';
import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';
import Link from 'core/navigation/link';

const propTypes = {
	containerName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object, // часто приходит как item
	order: PropTypes.object, // иногда приходит как order
	products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // на всякий случай
};

const uiProps = (ownProps) => ({
	[ownProps.containerName]: {
		data: {
			item: 'item',
			order: 'order',
			products: 'products',
		},
	},
});

class View extends Component {
	normalizeProducts = (order, products) => {
		// 1) products из props
		if (Array.isArray(products)) return products;

		// 2) products может прийти объектом (редко)
		if (products && typeof products === 'object')
			return Object.values(products);

		// 3) fallback: order_data внутри заказа
		let od = order?.order_data;
		if (!od) return [];

		if (Array.isArray(od)) return od;

		if (typeof od === 'string') {
			try {
				const parsed = JSON.parse(od);
				return Array.isArray(parsed) ? parsed : [];
			} catch (e) {
				return [];
			}
		}

		return [];
	};

	formatProduct = (p) => {
		const categories = (p.categories || []).map((c) => c.title).join(' / ');

		return {
			Nosaukums: (
				<Link to={p.url} className={styles.productLink}>
					{p.title}
				</Link>
			),
			Kategorija: categories || '-',
			Izmērs: p?.selected_variant?.product_size || '-',
			Daudzums: p.quantity,
			Cena: `${p.calculated_price} €`,
			Kopā: `${p.total} €`,
		};
	};

	render() {
		const { item, order: orderProp, products: productsProp } = this.props;

		// поддержка разных форматов
		const order = orderProp || item;
		if (!order) return null;

		const products = this.normalizeProducts(order, productsProp);

		const orderInfo = {
			ID: order.id,
			Numurēšana: order.numeration,
			Statuss: order.order_status,
			'Maksājuma veids': order.payment_type,
			'Piegādes veids': order.shipping_type,
			Kopā: order.total,
			'Piegādes cena': order.shipping_price,
			Izveidots: order.created_at,
			Atjaunināts: order.updated_at,
			Izsekošana: order.tracking_number,
			'Kurjeru kompānija': order.courier_company,
		};

		const customerInfo = {
			Vārds: order.first_name,
			Uzvārds: order.surname,
			'E-pasts': order.email,
			Tālrunis: order.phone,
			'Uzņēmuma nosaukums': order.company_name,
			'Reģ. Nr.': order.reg_nr,
			'PVN Nr.': order.vat_nr,
			Valsts: order.country,
			'Pasta indekss': order.postal_code,
			Adrese: order.address,
			'Piegādes valsts': order.delivery_country,
			'Piegādes adrese': order.delivery_address,
			'Piegādes pasta indekss': order.delivery_postal_code,
		};

		const items = [
			{
				name: 'order',
				title: 'Informācija par pasūtījumu',
				content: <InfoTable rows={orderInfo} />,
			},
			{
				name: 'customer',
				title: 'Informācija par klientu',
				content: <InfoTable rows={customerInfo} />,
			},
			{
				name: 'products',
				title: 'Preces',
				content: (
					<div>
						{products.length > 0
							? products.map((p, i) => (
								<div key={i} className={styles.productBlock}>
									<div className={styles.productHeader}>Produkts #{i + 1}</div>
									<InfoTable rows={this.formatProduct(p)} />
								</div>
							))
							: 'Nav produktu'}
					</div>
				),
			},
		];

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;

export default WithUi(uiProps)(View);

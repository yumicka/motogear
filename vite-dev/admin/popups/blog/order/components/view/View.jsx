/* eslint-disable react/prop-types */
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';

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

	render() {
		const { item, order: orderProp, products: productsProp } = this.props;

		// поддержка разных форматов
		const order = orderProp || item;
		if (!order) return null;

		const products = this.normalizeProducts(order, productsProp);

		const orderInfo = {
			ID: order.id,
			Numeration: order.numeration,
			Status: order.order_status,
			Payment: order.payment_type,
			Shipping: order.shipping_type,
			Total: order.total,
			ShippingPrice: order.shipping_price,
			Created: order.created_at,
			Updated: order.updated_at,
			Tracking: order.tracking_number,
			Courier: order.courier_company,
		};

		const customerInfo = {
			FirstName: order.first_name,
			Surname: order.surname,
			Email: order.email,
			Phone: order.phone,
			Company: order.company_name,
			RegNr: order.reg_nr,
			VAT: order.vat_nr,
			Country: order.country,
			PostalCode: order.postal_code,
			Address: order.address,
			DeliveryCountry: order.delivery_country,
			DeliveryAddress: order.delivery_address,
			DeliveryPostalCode: order.delivery_postal_code,
		};

		const items = [
			{
				name: 'order',
				title: 'Order Info',
				content: <InfoTable rows={orderInfo} />,
			},
			{
				name: 'customer',
				title: 'Customer',
				content: <InfoTable rows={customerInfo} />,
			},
			{
				name: 'products',
				title: 'Products',
				content: (
					<div>
						{products.length > 0
							? products.map((p, i) => <InfoTable key={i} rows={p} />)
							: 'No products'}
					</div>
				),
			},
		];

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;

export default WithUi(uiProps)(View);

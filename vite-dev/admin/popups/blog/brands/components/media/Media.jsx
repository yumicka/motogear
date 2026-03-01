import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import Title from 'ui/common/title';
import ImageAdministration from 'ui/media/administration/image/main';

const propTypes = {
	id: PropTypes.number.isRequired, // brand id (from popup extraData)
	action: PropTypes.string.isRequired, // actions url
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object,
	image: PropTypes.object,
	size_guide_image: PropTypes.object,
};

const defaultProps = {};

const uiProps = (ownProps) => {
	return {
		[ownProps.containerName]: {
			data: {
				item: 'item',
				image: 'image',
				size_guide_image: 'size_guide_image',
			},
		},
	};
};

class Media extends Component {
	updateBrandImageId = ({ field, imageId }) => {
		const { id, action, tableName, containerName } = this.props;

		// если у тебя другой клиент для API — замени на свой
		// (в проекте часто бывает request/post/api/...).
		return post(action, {
			action: 'update',
			id: id,
			[field]: imageId,
		}).then((res) => {
			// refresh dt
			ee.trigger(events.datatable.refresh, { id: tableName });

			// обновим item в uiStore (чтобы id сразу был актуален)
			if (uiStore.get(`${containerName}.mounted`, false)) {
				uiStore.set(`${containerName}.data.item.${field}`, imageId);

				// иногда полезно сохранить весь item из ответа, если он есть
				if (res?.data?.item) {
					uiStore.set(`${containerName}.data.item`, res.data.item);
				}
			}

			return res;
		});
	};

	onUpdateMainImage = ({ image }) => {
		const { containerName } = this.props;

		// обновляем image объект в uiStore (preview в хедере попапа и т.п.)
		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.image`, image);
		}

		// фиксируем image_id в brands
		return this.updateBrandImageId({
			field: 'image_id',
			imageId: image?.id || 0,
		});
	};

	onUpdateSizeGuideImage = ({ image }) => {
		const { containerName } = this.props;

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.size_guide_image`, image);
		}

		return this.updateBrandImageId({
			field: 'size_guide_image_id',
			imageId: image?.id || 0,
		});
	};

	render() {
		const { item } = this.props;

		return (
			<Fragment>
				<Title>Galvenais attēls</Title>
				<ImageAdministration
					id={item?.image_id}
					onUpdate={this.onUpdateMainImage}
					showDelete={false}
				/>

				<Title>Size guide attēls</Title>
				<ImageAdministration
					id={item?.size_guide_image_id}
					onUpdate={this.onUpdateSizeGuideImage}
					showDelete={false}
				/>
			</Fragment>
		);
	}
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

Media = WithUi(uiProps)(Media);

export default Media;

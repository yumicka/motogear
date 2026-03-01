/* eslint-disable react/prop-types */
import React, { Fragment, PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import InfoTable from 'ui/tables/info_table';
import Tabs from 'ui/controls/tabs';

import { Base64 } from 'js-base64';
import { get } from 'lodash-es';

const propTypes = {
	containerName: PropTypes.string.isRequired,

	// from ui
	item: PropTypes.object,
	image: PropTypes.object,
	size_guide_image: PropTypes.object,
	translations: PropTypes.object,
	langs: PropTypes.array,
};

const uiProps = (ownProps) => ({
	langs: 'langs',
	[ownProps.containerName]: {
		data: {
			item: 'item',
			image: 'image',
			size_guide_image: 'size_guide_image',
			translations: 'translations',
		},
	},
});

class View extends Component {
	tryDecodeBase64 = (value) => {
		if (!value || typeof value !== 'string') return value || '';

		// безопасный decode: если не base64 — просто вернём как есть
		try {
			const decoded = Base64.decode(value);
			// если декодирование дало читаемый текст — ок.
			// если это был обычный текст, decode может превратить в мусор — поэтому проверим мягко:
			// оставляем decoded если он содержит хотя бы один пробел/букву/знак и не выглядит как "����"
			if (decoded && !/�{2,}/.test(decoded)) return decoded;
			return value;
		} catch (e) {
			return value;
		}
	};

	renderTranslationsTab = () => {
		const { translations, langs } = this.props;

		if (!translations) return <div>No translations</div>;

		const list = (
			langs && langs.length ? langs : Object.keys(translations || {})
		).map((lang) => {
			const raw = get(translations, `${lang}.data.description`, '');
			const description = this.tryDecodeBase64(raw);

			return (
				<div key={lang} style={{ marginBottom: 16 }}>
					<h4 style={{ marginBottom: 8 }}>{lang.toUpperCase()}</h4>
					<InfoTable
						rows={{
							Description: description,
						}}
					/>
				</div>
			);
		});

		return <div>{list.length ? list : 'No translations'}</div>;
	};

	render() {
		const { item, image, size_guide_image } = this.props;

		if (!item) return null;

		const brandInfo = {
			ID: item.id,
			BrandName: item.brand_name,
			ImageId: item.image_id,
			SizeGuideImageId: item.size_guide_image_id,
			Created: item.created_at,
			Updated: item.updated_at,
		};

		const imageInfo = image
			? {
				ImageContainerId: image.id,
				Thumbnail: image.thumbnail,
				Image: image.image,
				Updated: image.updated_at,
			}
			: { Image: '—' };

		const sizeGuideInfo = size_guide_image
			? {
				ImageContainerId: size_guide_image.id,
				Thumbnail: size_guide_image.thumbnail,
				Image: size_guide_image.image,
				Updated: size_guide_image.updated_at,
			}
			: { SizeGuideImage: '—' };

		const items = [
			{
				name: 'brand',
				title: 'Brand',
				content: <InfoTable rows={brandInfo} />,
			},
			{
				name: 'translations',
				title: 'Translations',
				content: this.renderTranslationsTab(),
			},
			{
				name: 'media',
				title: 'Media',
				content: (
					<Fragment>
						<h4 style={{ marginBottom: 8 }}>Main image</h4>
						<InfoTable rows={imageInfo} />

						<div style={{ height: 16 }} />

						<h4 style={{ marginBottom: 8 }}>Size guide image</h4>
						<InfoTable rows={sizeGuideInfo} />
					</Fragment>
				),
			},
		];

		return <Tabs items={items} lazyLoad={true} />;
	}
}

View.propTypes = propTypes;

export default WithUi(uiProps)(View);

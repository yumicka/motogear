/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Image from 'ui/media/image';
import styles from '../AboutProduct.module.less';

const AboutBrand = ({ brandId }) => {
	const [brand, setBrand] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!brandId) return;

		setLoading(true);

		remoteRequest({
			url: 'brands/get-by-id',
			data: { id: brandId },
			onSuccess: (response) => {
				setLoading(false);
				setBrand(response || null);
			},
			onError: () => {
				setLoading(false);
				setBrand(null);
			},
		});
	}, [brandId]);

	if (!brandId) return null;
	if (loading) return <div>Loading...</div>;
	if (!brand) return <div>Brand not found</div>;

	const description =
		brand.translations?.lv?.data?.description ||
		brand.translations?.en?.data?.description ||
		'';

	return (
		<div className={styles.AboutBrand}>
			<h3>{brand.item?.brand_name}</h3>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			{brand.image?.image && <Image src={brand.image.image} />}
		</div>
	);
};

export default AboutBrand;

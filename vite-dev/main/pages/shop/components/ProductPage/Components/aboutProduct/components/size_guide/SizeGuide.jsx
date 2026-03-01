import { useEffect, useState } from 'react';
import Image from 'ui/media/image';
import styles from '../../AboutProduct.module.less';

const SizeGuide = ({ brandId }) => {
	const [brand, setBrand] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!brandId) {
			setBrand(null);
			return;
		}

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

	const sizeGuideImage = brand?.size_guide_image?.image;

	if (!sizeGuideImage) {
		return <div>No size guide available</div>;
	}

	return (
		<div className={styles.sizeGuide}>
			<Image src={sizeGuideImage} alt="Size guide" />
		</div>
	);
};

export default SizeGuide;

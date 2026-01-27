import { Routes, Route } from 'react-router-dom';

import HomePage from 'main/pages/home/HomePage';
import PrivacyPolicy from 'main/info_pages/privacy_policy/PrivacyPolicy';
import CartPage from 'main/pages/cart_page/CartPage';
import PlasticKitsSample from 'main/pages/shop_pages/plastic_decals/plastic_kits_protection/PlasticKitsSample';
import PlasticAllCategories from 'main/pages/shop_pages/plastic_decals/plastic_kits_protection/components/all_categories/PlasticAllCategories';
import ShopHelmet from 'main/pages/shop_pages/helmets/ShopHelmets';
import HelmetsPage from 'main/pages/shop_pages/helmets/components/ShopHelmetsPages/HelmetsPage';

import HelmetProductPage from 'main/pages/shop_pages/helmets/components/ProductPage/HelmetProductPage';
import PlasticAndDecalsProduct from 'main/pages/shop_pages/plastic_decals/plastic_kits_protection/components/ProductPage/PlasticAndDecalsProduct';

export default function Content() {
	return (
		<div className="flex-grow flex-shrink w-full">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/cart" element={<CartPage />} />

				{/* ------------------- HELMETS ------------------- */}
				{/* Routes for filtering the Helmet category */}
				<Route path="/shopHelmet" element={<ShopHelmet />}>
					<Route index element={<HelmetsPage />} />
					<Route path=":category" element={<HelmetsPage />} />
				</Route>

				{/* Route for product from Helmet category */}
				<Route path="/shopHelmet/product/:id" element={<HelmetProductPage />} />

				{/* ------------------- PLASTIC & DECALS ------------------- */}
				{/* Routes for filtering the Plastic & Decals category */}
				<Route path="/plasticsDecals" element={<PlasticKitsSample />}>
					<Route index element={<PlasticAllCategories />} />
					<Route path=":category" element={<PlasticAllCategories />} />
				</Route>

				{/* Route for product from Plastic & Decals category */}
				<Route path="/plasticsDecals/product/:id" element={<PlasticAndDecalsProduct />} />

				<Route path="*" element={'wrong page'} />
			</Routes>
		</div>
	);
}

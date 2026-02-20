// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import WithUi from 'hoc/store/ui';
import CategoriesGallery from './components/categories_gallery/Categories_gallery';
import Banners from './components/banners/Banners';
import ShopNow from './components/shop_now/Shop_Now';
import MotocrossTyres from './components/motocross_tyres/MotocrossTyres';
import Garantees from './components/garantees/Garantees';
import TopSellers from './components/top_sellers/Top_sellers';
import ProductsCarousel from './components/top_sellers/components/ProductsCarousel';
import WelcomeBanner from './components/welcome_banner/WelcomeBanner';
import { productsNow } from './components/top_sellers/data/productsNow';
import { productsGear } from './components/top_sellers/data/productsGear';

import Brands from './components/brands/Brands';
import CartRecomendations from '../cart/components/CartRecomendations';
const propTypes = {};
const defaultProps = {};

const uiProps = (ownProps) => {};

const HomePage = () => {
	return (
		<>
			<section>
				<Banners />
			</section>

			<section>
				<CategoriesGallery />
			</section>

			<section>
				<ShopNow />
			</section>

			<section>
				<TopSellers
					title={
						<h2>
							Top Sellers <span>right now</span>!
						</h2>
					}>
					<CartRecomendations />
				</TopSellers>
			</section>

			<section>
				<Garantees />
			</section>

			<section>
				<MotocrossTyres />
			</section>

			<section>
				<TopSellers title="Top Sellers Gear">
					<ProductsCarousel
						products={productsGear}
						scrollStep={500}
						variant="gear"
					/>
				</TopSellers>
			</section>

			<section>
				<Brands />
			</section>

			<section>
				<WelcomeBanner />
			</section>
		</>
	);
};

HomePage.propTypes = propTypes;

HomePage.defaultProps = defaultProps;

export default WithUi(uiProps)(HomePage);

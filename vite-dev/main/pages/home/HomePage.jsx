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

import Brands from './components/brands/Brands';
import CartRecomendations from '../cart/components/cartRecomendations/CartRecomendations';
const propTypes = {};
const defaultProps = {};

const uiProps = (ownProps) => {
	return{
		brands: 'brands',
	};
};

const HomePage = ({brands}) => {
	return (
		<div className="pageFade">
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
							{_g.lang('top_sellers')}
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
				<TopSellers title={_g.lang('top_sellers_gear')}>
					<ProductsCarousel
						scrollStep={500}
						variant="gear"
					/>
				</TopSellers>
			</section>

			<section>
				<Brands brands={brands}/>
			</section>

			<section>
				<WelcomeBanner />
			</section>
		</div>
	);
};

HomePage.propTypes = propTypes;

HomePage.defaultProps = defaultProps;

export default WithUi(uiProps)(HomePage);

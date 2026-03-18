const popups = {};

/*
 * BlogCategoryPopup
 */
import BlogCategoryPopup, {
	settings as BlogCategoryPopupSettings,
} from 'admin/popups/blog/category';
popups[BlogCategoryPopupSettings.name] = {
	popup: BlogCategoryPopup,
	settings: BlogCategoryPopupSettings,
};

/*
 * BlogEntryPopup
 */
import BlogEntryPopup, {
	settings as BlogEntryPopupSettings,
} from 'admin/popups/blog/blog_entry';
popups[BlogEntryPopupSettings.name] = {
	popup: BlogEntryPopup,
	settings: BlogEntryPopupSettings,
};

/*
 * BrandsPopup
 */
import BrandsPopup, {
	settings as BrandsPopupSettings,
} from 'admin/popups/blog/brands';
popups[BrandsPopupSettings.name] = {
	popup: BrandsPopup,
	settings: BrandsPopupSettings,
};

/*
 * OrderPopup
 */
import OrderPopup, {
	settings as OrderPopupSettings,
} from 'admin/popups/blog/order';
popups[OrderPopupSettings.name] = {
	popup: OrderPopup,
	settings: OrderPopupSettings,
};

/*
 * DeliveryPopup
 */
import DeliveryPopup, {
	settings as DeliveryPopupSettings,
} from 'admin/popups/blog/delivery';
popups[DeliveryPopupSettings.name] = {
	popup: DeliveryPopup,
	settings: DeliveryPopupSettings,
};

/*
 * UserPopup
 */
import UserPopup, { settings as UserPopupSettings } from 'admin/popups/user';
popups[UserPopupSettings.name] = {
	popup: UserPopup,
	settings: UserPopupSettings,
};

/*
 * TranslationPopup
 */
import TranslationPopup, {
	settings as TranslationPopupSettings,
} from 'admin/popups/translation';
popups[TranslationPopupSettings.name] = {
	popup: TranslationPopup,
	settings: TranslationPopupSettings,
};

/*
 * MetaDataPopup
 */
import MetaDataPopup, {
	settings as MetaDataPopupSettings,
} from 'admin/popups/meta_data';
popups[MetaDataPopupSettings.name] = {
	popup: MetaDataPopup,
	settings: MetaDataPopupSettings,
};

//<editor-fold defaultstate="collapsed" desc="CMS popups">
/*
 * ChangePasswordPopup
 */
import ChangePasswordPopup, {
	settings as ChangePasswordPopupSettings,
} from 'admin/popups/extra/change_password';
popups[ChangePasswordPopupSettings.name] = {
	popup: ChangePasswordPopup,
	settings: ChangePasswordPopupSettings,
};

/*
 * SpecificationsPopup
 */
import SpecificationsPopup, {
	settings as SpecificationsPopupSettings,
} from 'admin/popups/product/specifications';
popups[SpecificationsPopupSettings.name] = {
	popup: SpecificationsPopup,
	settings: SpecificationsPopupSettings,
};

/*
 * ProductSizePopup
 */
import ProductSizePopup, {
	settings as ProductSizePopupSettings,
} from 'admin/popups/product/product_size';
popups[ProductSizePopupSettings.name] = {
	popup: ProductSizePopup,
	settings: ProductSizePopupSettings,
};

// /*
//  * CMSPopup
//  */
// import CMSPopup, { settings as CMSPopupSettings } from 'admin/popups/cms';
// popups[CMSPopupSettings.name] = {
// 	popup: CMSPopup,
// 	settings: CMSPopupSettings,
// };
// //</editor-fold>

export default popups;

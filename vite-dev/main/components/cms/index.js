const items = {};

/* ========================================================================*
 *
 *                     Content
 *
 * ========================================================================*/
import ContentExample1 from './content/content_example_1';
items['content_example_1'] = ContentExample1;

/* Main Banners */
import HomepageFirstBox from './content/homepage_first_box';
items['homepage_first_box'] = HomepageFirstBox;

import RightImageBox from './content/right_image_box';
items['right_image_box'] = RightImageBox;

import BottomLeftCard from './content/bottom_left_card';
items['bottom_left_card'] = BottomLeftCard;

import BottomRightCard from './content/bottom_right_card';
items['bottom_right_card'] = BottomRightCard;

/* Shop Banners */
import CustomizeYourLookLeft from './content/customize_your_look_left';
items['customize_your_look_left'] = CustomizeYourLookLeft;

import CustomizeYourLookRight from './content/customize_your_look_right';
items['customize_your_look_right'] = CustomizeYourLookRight;

/* Banner with video */
import MotocrossTyres from './content/motocross_tyres';
items['motocross_tyres'] = MotocrossTyres;

/* Welcome Banner */
import WelcomeBanner from './content/welcome_banner';
items['welcome_banner'] = WelcomeBanner;

/* Contact Form */
import ContactForm from './content/contact_form';
items['contact_form'] = ContactForm;




/* ========================================================================*
 *
 *                     Collections
 *
 * ========================================================================*/
import PrivacyPolicy from './collections/privacy_policy';
items['privacy_policy'] = PrivacyPolicy;

import Garantees from './collections/garantees';
items['garantees'] = Garantees;

export default items;

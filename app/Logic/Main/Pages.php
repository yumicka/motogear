<?php
namespace App\Logic\Main;

use App\Helpers\Core\MetaHelper;

use App\Logic\CMS\Data;
use App\Logic\Core\MetaData;
use App\Logic\Core\Store;

class Pages
{
    
    /**
     * Get common state for every page
     *
     * @access public
     * @param  string $lang - current lang            
     * @return void
     */
    public static function getCommonState($lang) {
    //<editor-fold defaultstate="collapsed" desc="getCommonState">
        return [
            'marketing_cookies' => session()->get('marketing_cookies','notVisted')
        ];
    //</editor-fold>  
    }

     /**
     * Get common content
     *
     * @access public           
     * @return array
    */
    public static function getCommonContent() {
    //<editor-fold defaultstate="collapsed" desc="getCommonContent"> 
        return [
            'check_info',
            'calculator_block_content',
            'home_selection',
        ];
    //</editor-fold>
    }    
    
    /**
     * Get common content
     *
     * @access public           
     * @return array
    */
    public static function getCommonCollections() {
    //<editor-fold defaultstate="collapsed" desc="getCommonCCollections"> 
        return [
           
        ];
    //</editor-fold>
    }    
    
    /**
     * Home page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function home($lang) {
    //<editor-fold defaultstate="collapsed" desc="home"> 

        $content = array_merge(self::getCommonContent(), [
           
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [

        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'home'];

        $state['Page'] = [];
     
        $state['Page']['current'] = 'home';
        
        $meta_data = MetaData::get($lang, 'home');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * About us page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function about_us($lang) {
    //<editor-fold defaultstate="collapsed" desc="about_us"> 

        $content = array_merge(self::getCommonContent(), [
           'about_us_hero',
           'about_us_divider',
           'about_us_content',
           'about_us_divider_2',
           'about_us_our_info',
           'certificates_content',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'certificates_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'about_us'];

        $state['Page'] = [];
        $state['Page']['current'] = 'about_us';
        
        $meta_data = MetaData::get($lang, 'about_us');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
      /**
     * Renovation page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function renovation($lang) {
    //<editor-fold defaultstate="collapsed" desc="renovation"> 

        $content = array_merge(self::getCommonContent(), [
           'renovation_hero',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'renovation_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'renovation'];

        $state['Page'] = [];
        $state['projects'] = Blog\BlogEntries::getSpecified($lang, 1);
        $state['Page']['current'] = 'renovation';
        
        $meta_data = MetaData::get($lang, 'renovation');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * Building page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function building($lang) {
    //<editor-fold defaultstate="collapsed" desc="building"> 

        $content = array_merge(self::getCommonContent(), [
           'building_hero',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'building_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'building'];

        $state['Page'] = [];
        $state['projects'] = Blog\BlogEntries::getSpecified($lang, 2);
        $state['Page']['current'] = 'building';
        
        $meta_data = MetaData::get($lang, 'building');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
     /**
     * Blog page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function blog($lang) {
    //<editor-fold defaultstate="collapsed" desc="blog"> 

        $content = array_merge(self::getCommonContent(), [
            'blog_hero',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
           
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
        
        $state['categories'] = Blog\BlogCategories::get($lang);
          
        $state['Menu'] = ['current' => 'blog'];
       
        $state['Page']['current'] = 'blog';
        
        $meta_data = MetaData::get($lang, 'blog');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * Price calculator page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function priceCalculator($lang) {
    //<editor-fold defaultstate="collapsed" desc="priceCalculator"> 

        $content = array_merge(self::getCommonContent(), [
           'price_calculator_hero',
           'price_calculator_content',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'price_calculator'];

        $state['Page'] = [];
        $state['Page']['current'] = 'price_calculator';
        
        $meta_data = MetaData::get($lang, 'price_calculator');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
     /**
     * Shop page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function shop($lang) {
    //<editor-fold defaultstate="collapsed" desc="shop"> 
        $content = array_merge(self::getCommonContent(), [
           
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'shop'];

        $state['Page'] = [];
        $state['Page']['current'] = 'shop';
        
        $state['categories'] = Blog\BlogCategories::get($lang);
        $state['products'] = Blog\BlogEntries::get($lang);
        
        $meta_data = MetaData::get($lang, 'shop');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    
    //Product page opens
    
     /**
     * Product page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function shopProduct($lang, $product_id) {
       //<editor-fold defaultstate="collapsed" desc="shopProduct"> 
        $id = intval(head(explode('-', $product_id)));

        $product = Blog\BlogEntries::getQuery($lang)->where('b.id', $id)->first();

        if (empty($product)) {
            return null;
        }
        
        $product = Blog\BlogEntries::formatResponseData($product, $lang);

        $state = self::getCommonState($lang);

        $data = Data::get($lang, [
            'content' => self::getCommonContent(),
            'collections' => self::getCommonCollections()
        ]);

        $state = array_merge($state, $data);

        $state['categories'] = Blog\BlogCategories::get($lang);
        $state['products'] = Blog\BlogEntries::get($lang);
        $state['product'] = $product;
        $state['specifications'] = Blog\Specifications::getById($lang, $product_id);


        $state['Menu'] = ['current' => 'shop'];
        $state['Page'] = [];
        $state['Page']['current'] = 'shop_product';

        return Store::setState($lang, $state);
        //</editor-fold>
    }

    
    /**
     * privacy_policy
     *
     * @access public           
     * @param  
     * @return array
    */
    public static function privacyPolicy($lang) {
    //<editor-fold defaultstate="collapsed" desc="privacy_policy"> 

        $content = array_merge(self::getCommonContent(), [
           
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'privacy_policy' => [
                'results_per_page' => 'all'
            ]
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'privacy_policy'];

        $state['Page'] = [];        
        $state['Page']['current'] = 'privacy_policy';
        
        $meta_data = MetaData::get($lang, 'privacy_policy');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    //Entry opens
    
     /**
     * Blog entry page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function blogEntry($lang, $blog_id) {
    //<editor-fold defaultstate="collapsed" desc="blogEntry"> 
        $id = head(explode('-', $blog_id));
        $id = intval($id);
        
        $blog = Blog\BlogEntries::getQuery($lang)->where('b.id', $id)->first();
        
        if (empty($blog)) {
            return null;
        }
        
        $blog = Blog\BlogEntries::formatResponseData($blog, $lang);
        
        $content = array_merge(self::getCommonContent(), [
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
        ]);
        
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
        
        $state['blog'] = $blog;
        $state['other_blog'] = Blog\BlogEntries::getOther($lang, $id);
          
        $state['Menu'] = ['current' => 'blog_entry'];
       
        $state['Page']['current'] = 'blog_entry';
        
//        MetaHelper::setTitle(Arr::get($service, 'lang_data.meta_title')); //
//        MetaHelper::setDescription(Arr::get($service, 'lang_data.meta_description'));
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
}
<?php
namespace App\Logic\Main\Product;

use App\Logic\Core\ContentTranslations;
use App\Logic\Main\Product\ProductCategories;
use App\Logic\Media\Images;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

use DB;
use Str;

class ProductEntries
{
    
     /**
     * Get query
     *
     * @access public           
     * @param  string $lang - language
     * @return object
    */
    public static function getQuery($lang) {
    //<editor-fold defaultstate="collapsed" desc="getQuery"> 
        $query = DB::connection('main')->table('products as b');
        
        $columns = self::getColumns($lang);
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        ContentTranslations::leftJoin($query, [$lang], 'b.id', ContentTranslationsTypes::blog_entry->value, 'blog_entry_');
        
        $query->where('b.active', 1);
        
        return $query;
    //</editor-fold>
    }
    
    /**
     * Get columns
     *
     * @access public           
     * @param  string $lang - language
     * @return array
    */
    public static function getColumns($lang) {
    //<editor-fold defaultstate="collapsed" desc="getColumns"> 
        $columns = [
            'b.id' => 'id',
            'b.image_id' => 'image',
            'b.pinned' => 'pinned',
            'b.active' => 'active',
            'b.top_seller' => 'top_seller',
            'b.image_id' => 'image_id',
            'b.product_price' => 'product_price',
            'b.product_discount' => 'product_discount',
            'b.categories' => 'categories',
            "blog_entry_$lang.data" => 'lang_data',
            "blog_entry_$lang.title" => 'title',
            
        ];
        
        return $columns;
    //</editor-fold>
    }
    
    /**
     * Format response data
     *
     * @access public           
     * @param  object $item - item
     * @param  string $lang - language
     * @return array
     */
    public static function formatResponseData($item, $lang)
    {
        $categoryIds = extractTags($item->categories);
        $categoryIds = array_map('intval', $categoryIds);

        $allCategories = ProductCategories::get($lang);

        $categories = [];
        $category = null; 
        $subCategory = null;

        foreach ($allCategories as $cat) {
            if (!in_array($cat['id'], $categoryIds)) {
                continue;
            }

            $categories[] = $cat;

            if ($cat['parent_id'] === null) {
                $category = $cat['id'];
            } else {
                $subCategory = $cat['id'];
            }
        }

        $url = url($lang . '/veikals/' . Str::slug($item->id . '-' . $item->title));

        $lang_data = [];
        if (!empty($item->lang_data)) {
            $lang_data = json_decode($item->lang_data, true);
        }

        $image = Images::getImageById($item->image_id);

        return [
            'id' => $item->id,
            'category' => $category,
            'subCategory' => $subCategory,
            'categories' => array_values($categories),
            'product_price' => $item->product_price,
            'product_discount' => $item->product_discount,
            'pinned' => $item->pinned,
            'active' => $item->active,
            'top_seller' => $item->top_seller,
            'url' => $url,
            'title' => $item->title,
            'lang_data' => $lang_data,
            'image' => $image,
        ];
    }

    //</editor-fold>
    
    
     /**
     * Get all data
     *
     * @access public           
     * @param  string $lang - lang
     * @return array
     */
    public static function get($lang) {
    //<editor-fold defaultstate="collapsed" desc="getAll">
        $query = self::getQuery($lang);

        $items = $query->get();

        return $items->map(function($item) use ($lang) {
            return self::formatResponseData($item, $lang);
        })->all();   
    //</editor-fold>
    }
   
    
         /**
     * Get all data
     *
     * @access public           
     * @param  string $lang - lang
     * @return array
     */
    public static function getSpecified($lang, $id) {
    //<editor-fold defaultstate="collapsed" desc="getAll">
        $query = self::getQuery($lang);
        
        $items = $query->where('b.categories', 'LIKE', '%' . $id . '%')->take(3)->get();

        return $items->map(function($item) use ($lang) {
            return self::formatResponseData($item, $lang);
        })->all();   
    //</editor-fold>
    }
    
     /**
     * Get pinned
     *
     * @access public           
     * @param  string $lang - lang
     * @return array
     */
    public static function getPinned($lang) {
    //<editor-fold defaultstate="collapsed" desc="getPinned">
        $query = self::getQuery($lang)->where('pinned', 1);

        $items = $query->get();
        
        return $items->map(function($item) use ($lang) {
            return self::formatResponseData($item, $lang);
        })->all();   
    //</editor-fold>
    }
    
     /**
     * Get other blog
     *
     * @access public           
     * @param  string $lang - lang
     * @return array
     */
    public static function getOther($lang, $blog_id) {
    //<editor-fold defaultstate="collapsed" desc="getOther">
        $query = self::getQuery($lang)->where('b.id', '!=', $blog_id)->limit(2);

        $items = $query->get();
        
        return $items->map(function($item) use ($lang) {
            return self::formatResponseData($item, $lang);
        })->all();   
    //</editor-fold>
    }
    
    public static function getById($lang, $product_id) {
    //<editor-fold defaultstate="collapsed" desc="getById">
        $query = self::getQuery($lang);
        $item = $query->where('b.id', $product_id)->first();

        if (!$item) {
            return null;
        }

        return self::formatResponseData($item, $lang);
    //</editor-fold>
    } 
}
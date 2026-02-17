<?php
namespace App\Logic\Main\Product;

use DB;
use App\Logic\Core\ContentTranslations;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class Specifications
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
        $query = DB::connection('main')->table('specifications as s');
        
        $columns = [
            's.id' => 'id',
            "$lang.title" => 'title',
            "$lang.content" => 'content',
        ];
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        ContentTranslations::leftJoin($query, [$lang], 's.id', ContentTranslationsTypes::specifications->value);
        
        return $query;
    //</editor-fold>
    }
    
    /**
     * Format response data
     *
     * @access public           
     * @param  object $item - item
     * @return array
     */
    public static function formatResponseData($item) {
    //<editor-fold defaultstate="collapsed" desc="formatResponseData">
        return [
            'id' => $item->id,
            'title' => $item->title,
            'content' => $item->content,
        ];
    //</editor-fold>
    }
    
     /**
     * Get data
     *
     * @access public           
     * @param  object $item - item
     * @param  string $lang - lang
     * @return array
     */
    public static function get($lang) {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery($lang);
        
        $items = $query->get();
                
        return $items->map(function($item) {
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
    }
    
             /**
     * Get data
     *
     * @access public           
     * @param  object $item - item
     * @param  string $lang - lang
     * @return array
     */
    public static function getById($lang, $product_id) {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery($lang);
        $query->where('product_id', $product_id);
        
        $items = $query->get();
                
        return $items->map(function($item) {
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
    }
}
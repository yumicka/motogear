<?php
namespace App\Logic\Main\Product;

use DB;

class ProductSizes
{
    
     /**
     * Get query
     *
     * @access public           
     * @return object
     */
    public static function getQuery() {
    //<editor-fold defaultstate="collapsed" desc="getQuery"> 
        $query = DB::connection('main')->table('product_sizes as s');
        
        $columns = [
            's.id' => 'id',
            's.product_id',
        ];
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

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
            'product_size' => $item->product_size,
        ];
    //</editor-fold>
    }
    
     /**
     * Get data
     *
     * @access public           
     * @param  object $item - item
     * @return array
     */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery();
        
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
     * @return array
     */
    public static function getById($product_id) {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery();
        $query->where('s.product_id', $product_id);
        
        $items = $query->get();
                
        return $items->map(function($item) {
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
    }
}
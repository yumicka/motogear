<?php
namespace App\Logic\Main\Product;
use DB;

class Deliveries
{
    
     /**
     * Get query
     *
     * @access public           
     * @return object
    */
    public static function getQuery() {
    //<editor-fold defaultstate="collapsed" desc="getQuery"> 
        $query = DB::connection('main')->table('delivery_companies as d');
        
        $columns = self::getColumns();
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        $query->where('d.active', 1);
        
        return $query;
    //</editor-fold>
    }
    
    /**
     * Get columns
     *
     * @access public           
     * @return array
    */
    public static function getColumns() {
    //<editor-fold defaultstate="collapsed" desc="getColumns"> 
        $columns = [
            'd.id' => 'id',
            'd.name' => 'name',
            'd.lv_price' => 'lv_price',
            'd.lt_price' => 'lt_price',
            'd.ee_price' => 'ee_price',
            'd.active' => 'active',
            'd.position' => 'position',
            'd.created_at' => 'created_at',
            'd.updated_at' => 'updated_at',
        ];
        return $columns;
    //</editor-fold>
    }
    
    /**
     * Format response data
     *
     * @access public           
     * @param  object $item - item
     * @return array
     */
    public static function formatResponseData($item)
    { 
        return [
            'id' => $item->id,
            'name' => $item->name,
            'lv_price' => $item->lv_price,
            'lt_price' => $item->lt_price,
            'ee_price' => $item->ee_price, 
            'active' => $item->active,
            'position' => $item->position,
            'created_at' => $item->created_at,
            'updated_at' => $item->updated_at,
        ];
    }

    //</editor-fold>
     /**
     * Get all data
     *
     * @access public           
     * @return array
     */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="getAll">
        $query = self::getQuery();

        $items = $query->get();

        return $items->map(function($item){
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
    }
}
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
            's.product_id' => 'product_id',
            's.product_size' => 'product_size',
            's.product_count' => 'product_count',
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
            'product_count' => $item->product_count,
            'is_required' => true,
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
     * Get data by ID
     *
     * @access public           
     * @param  object $item - item
     * @return array
     */
    public static function getById($product_id) {
    //<editor-fold defaultstate="collapsed" desc="get">
        $query = self::getQuery();
        $query->where('product_id', $product_id);
        
        $items = $query->get();
                
        return $items->map(function($item) {
            return self::formatResponseData($item);
        })->all();   
    //</editor-fold>
    }
    
    public static function getBySizeId($size_id) {
        $size_id = (int)$size_id;

        if ($size_id === 0) {
            return [
                'id' => 0,
                'is_required' => false,
            ];
        }

        $query = self::getQuery();
        $query->where('s.id', $size_id);

        $item = $query->first();

        if (!$item) {
            return null;
        }

        $data = self::formatResponseData($item);
        $data['is_required'] = true;

        return $data;
    }
    
    public static function decreaseCount($product_id, $size_id, $boughtProductCount)
    {
        $product_id = (int) $product_id;
        $size_id = (int) $size_id;
        $boughtProductCount = (int) $boughtProductCount;

        if ($size_id === 0) {
            return [
                'id' => 0,
                'is_required' => false,
            ];
        } 

        if ($product_id <= 0 || $boughtProductCount <= 0) {
            return null;
        }

        return DB::connection('main')->transaction(function () use ($product_id, $size_id, $boughtProductCount) {
            $item = DB::connection('main')
                ->table('product_sizes as s')
                ->select(
                    's.id as id',
                    's.product_id as product_id',
                    's.product_size as product_size',
                    's.product_count as product_count'
                )
                ->where('s.id', $size_id)
                ->where('s.product_id', $product_id)
                ->lockForUpdate()
                ->first();

            if (!$item) {
                return null;
            }

            $currentCount = (int) $item->product_count;

            if ($currentCount < $boughtProductCount) {
                return null;
            }

            $newCount = $currentCount - $boughtProductCount;

            DB::connection('main')
                ->table('product_sizes')
                ->where('id', $size_id)
                ->where('product_id', $product_id)
                ->update([
                    'product_count' => $newCount,
                    'updated_at' => now(),
                ]);

            $item->product_count = $newCount;

            return self::formatResponseData($item);
        });
    }
}
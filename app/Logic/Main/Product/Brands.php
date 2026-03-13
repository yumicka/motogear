<?php

namespace App\Logic\Main\Product;

use App\Logic\Media\Images;
use App\Models\Main\Brand;
use DB;

class Brands
{
    /**
     * Get query
     *
     * @access public
     * @return object
     */
    public static function getQuery()
    {
        $query = DB::connection('main')->table('brands as br');

        return $query;
    }

    /**
     * Get columns
     *
     * @access public
     * @return array
     */
    public static function getColumns()
    {
        return [
            'br.id' => 'id',
            'br.brand_name' => 'brand_name',
            'br.image_id' => 'image_id',
            'br.size_guide_image_id' => 'size_guide_image_id',
            'br.created_at' => 'created_at',
            'br.updated_at' => 'updated_at',
        ];
    }

    /**
     * Format response data
     *
     * @access public
     * @param object $item
     * @return array
     */
    public static function formatResponseData($item)
    {
        return [
            'id' => $item->id,
            'brand_name' => $item->brand_name,
            'image_id' => $item->image_id,
            'size_guide_image_id' => $item->size_guide_image_id,
            'image' => $item->image_id ? Images::getImageById($item->image_id) : null,
            'size_guide_image' => $item->size_guide_image_id
                ? Images::getImageById($item->size_guide_image_id)
                : null,
        ];
    }

    /**
     * Get all brands
     *
     * @access public
     * @return array
     */
    public static function get()
    {
        $query = self::getQuery();
        $columns = self::getColumns();

        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

        $items = $query
            ->orderBy('br.brand_name', 'asc')
            ->get();

        return $items->map(function ($item) {
            return self::formatResponseData($item);
        })->all();
    }

    /**
     * Get only brands that have active products
     *
     * @access public
     * @return array
     */
    public static function getUsed()
    {
        $query = self::getQuery();
        $columns = self::getColumns();

        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

        $query->whereExists(function ($subQuery) {
            $subQuery->select(DB::raw(1))
                ->from('products as p')
                ->whereColumn('p.brand_id', 'br.id')
                ->where('p.active', 1);
        });

        $items = $query
            ->orderBy('br.brand_name', 'asc')
            ->get();

        return $items->map(function ($item) {
            return self::formatResponseData($item);
        })->all();
    }

    /**
     * Get one brand by id
     *
     * @access public
     * @param int $id
     * @return array|null
     */
    public static function getById($id)
    {
        $query = self::getQuery();
        $columns = self::getColumns();

        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }

        $item = $query->where('br.id', $id)->first();

        if (!$item) {
            return null;
        }

        return self::formatResponseData($item);
    }
}
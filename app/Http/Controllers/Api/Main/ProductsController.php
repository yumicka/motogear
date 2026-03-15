<?php

namespace App\Http\Controllers\Api\Main;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\Langs;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Main\Product\ProductEntries;

class ProductsController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Search
    *
    * @access public
    * @return json
    */
   /**
    * Search
    *
    * @access public
    * @return json
    */
    
    # ========================================================================#
    #
    #                           Filters
    #
    # ========================================================================#
        
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">        
        $lang = app()->getLocale();
        $query = ProductEntries::getQuery($lang);

        $columns = ProductEntries::getColumns($lang);
        
        foreach ($columns as $column => $alias) {
            $query->addSelect(DB::raw("{$column} as {$alias}"));
        }
        
        

        # ========================================================================#
        #
        #                           Formatters
        #
        # ========================================================================#

        $formatters = [];

        # ========================================================================#
        #
        #                           Filters
        #
        # ========================================================================#

        $filters = [
            'search' => function($query, $value) {
                if (!empty($value)) {
                    $lang = app()->getLocale();
                    $query->where("blog_entry_$lang.title", 'LIKE', '%' . $value . '%');
                }
            },
            'top_seller' => function($query, $value) {
                if ((int)$value === 1) {
                    $query->where('b.top_seller', 1);
                }
            },
        ];
            
        
        $requestFilters = $request->get('filters', []);
        $brandIds = $requestFilters['brands'] ?? [];
        $priceRange = $requestFilters['price_range'] ?? [];
            
        // Filter by category
        $query = $query->when($request->has('category_id') && 
        $request->category_id !== null, function ($q) use ($request) {
            $categoryId = (int) $request->category_id;
            return $q->where('category_id', $categoryId);
        });
        
        // Filter by brands
        $query = $query->when(
            !empty($brandIds) && is_array($brandIds),
            function ($q) use ($brandIds) {
                return $q->whereIn('b.brand_id', $brandIds);
            }
        );
        
       // Filter by price
        $query = $query->when(
            !empty($priceRange) && is_array($priceRange),
            function ($q) use ($priceRange) {
                return $q->whereBetween('b.calculated_price', [
                $priceRange[0], $priceRange[1]
                ]);
            }
        );

        $orderBy = $request->get('order_by', 'b.position');
        $orderDir = $request->get('order_dir', 'asc');

        $allowedOrder = [
            'id' => 'b.id',
            'position' => 'b.position',
            'created_at' => 'b.created_at',
        ];

        $orderColumn = $allowedOrder[$orderBy] ?? 'b.position';

        $options = [
            'results_per_page' => 30,
            'order' => [
                $orderColumn => $orderDir === 'desc' ? 'desc' : 'asc',
            ]
        ];  
       
    
        $params = DataSource::parseRequest($request);
        $page = DataSource::getPage($params);
        $limit = DataSource::getLimit($page, 30);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        $formattedRows = [];

        foreach($response['rows'] as $row) {
           $formatted = ProductEntries::formatResponseData((object)$row, $lang);
           $formattedRows[] = $formatted;
        }

        $response['rows'] = $formattedRows;
       
        
        return Response::success($response);
    //</editor-fold>
    }
    
    public function searchByBrand(Request $request)
    {
        $lang = app()->getLocale();

        $brandId = (int)$request->get('brand_id', 0);
        $excludeId = (int)$request->get('exclude_id', 0);

        if ($brandId <= 0) {
            return Response::success(['rows' => []]);
        }

        $query = ProductEntries::getQuery($lang);

        $query->where('b.brand_id', $brandId);

        if ($excludeId > 0) {
            $query->where('b.id', '!=', $excludeId);
        }

        $query->orderBy('b.id', 'desc');

        $rows = $query->limit(4)->get();

        $formattedRows = [];
        foreach ($rows as $row) {
            $formattedRows[] = ProductEntries::formatResponseData((object)$row, $lang);
        }

        return Response::success(['rows' => $formattedRows]);
    }
    
    
/**
 * Get all subcategory IDs including the selected category itself
 * This only looks for children, not parents
 *
 * @param int $categoryId
 * @return array
 */
    private function getAllSubcategoryIds($categoryId)
    {
        $categoryIds = [$categoryId];

        // Get direct children only
        $children = DB::table('blog_categories')
            ->where('parent_id', $categoryId)
            ->pluck('id')
            ->toArray();

        foreach ($children as $childId) {
            // Recursively get grandchildren (only going downwards)
            $grandChildren = $this->getAllSubcategoryIds($childId);
            $categoryIds = array_merge($categoryIds, $grandChildren);
        }

        return $categoryIds;
    }
    
    /**
    * Actions
    *
    * @access public
    * @return json
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions">

        $actions = [
            'get_categories' => [
                'rules' => [
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="get_categories">
                    return Response::success([
                        'options' => Categories::get('lv'),
                    ]);
                //</editor-fold>
                },
            ], 

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }
}

?>

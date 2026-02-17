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

        //columns
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

        $filters = [];
      
        // Filter by category
        $query = $query->when($request->has('category_id') && 
        $request->category_id !== null, function ($q) use ($request) {
            $categoryId = (int) $request->category_id;
            return $q->where('b.categories', 'LIKE', '%[' . $categoryId . ']%');
        });

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
        $brand = trim($request->get('brand', ''));

        if ($brand === '') {
            return Response::success(['rows' => []]);
        }

        // 1) найти product_id по спецификациям
        $productIds = DB::connection('main')
            ->table('specifications as s')
            ->join('content_translations as t', function($join) {
                $join->on('t.container_id', '=', 's.id')
                     ->where('t.container_name', '=', 'specifications');
            })
            ->whereRaw('LOWER(t.title) IN ("brand", "brends", "бренд")')
            ->whereRaw('LOWER(t.content) = ?', [mb_strtolower($brand)])
            ->pluck('s.product_id')
            ->unique()
            ->toArray();

        if (empty($productIds)) {
            return Response::success(['rows' => []]);
        }

        
        $query = ProductEntries::getQuery($lang);

        $query->whereIn('b.id', $productIds);

        
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
    
//    private function getAllProducts($categoryI, $lang)
//    {
//        $categoryIds = $categoryId;
//        $filtredProducts = [];
//
//        // Get direct children only
//        $products = BlogEntries::get($lang);
//
//        foreach ($products as $p) {
//            if($p.category === $categoryIds){
//                $filtredProducts = array_push($p, $filtredProducts);
//            }
//        }
//
//        return $filtredProducts;
//    }
    
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

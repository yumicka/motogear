<?php

namespace App\Http\Controllers\Api\Main;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\Langs;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Main\Blog\BlogEntries;

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
        $query = BlogEntries::getQuery($lang);

        //columns
        $columns = BlogEntries::getColumns($lang);
        
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
        $query = $query->when($request->has('category_id') && $request->category_id !== null, function ($q) use ($request) {
    $categoryId = (int) $request->category_id;
    return $q->where('b.categories', 'LIKE', '%[' . $categoryId . ']%');
});





        // Apply search filter if $request->parent_id is present
//        ->when($request->parent_id, function ($q) use ($request, $lang) {
//           $columnTitle = "products_{$lang}.title";
//           return $q->where($columnTitle, 'LIKE', '%' . $request->search_data . '%');
//        });
        

        $options = [
            'results_per_page' => 30,
            'order' => [
                'b.position' => 'asc',
            ]
        ];   
       
    
        $params = DataSource::parseRequest($request);
        $page = DataSource::getPage($params);
        $limit = DataSource::getLimit($page, 30);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        $formattedRows = [];

        foreach($response['rows'] as $row) {
           $formatted = BlogEntries::formatResponseData((object)$row, $lang);
           $formattedRows[] = $formatted;
        }

        $response['rows'] = $formattedRows;
       
        
        return Response::success($response);
    //</editor-fold>
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

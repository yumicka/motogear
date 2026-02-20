<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\ProductSize;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;

use App\Logic\Main\Product\ProductSizes;


use DB;

class SpecificationsController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {}

    /**
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">
        $query = DB::connection('main')->table('product_sizes as s');

        //columns
        $columns = [
            's.id' => 'id',
            's.created_at' => 'created_at',
            's.updated_at' => 'updated_at',
            's.product_id' => 'product_id',
            's.product_size' => 'product_size',
        ];


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
        
        if ($request->filled('product_id')) {
            $query->where('s.product_id', $request->product_id);
        }

        $options = [
            'results_per_page' => 10,
            'order' => [
                's.id' => 'desc',
            ]
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);
    //</editor-fold>
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

            'get' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get">
                    $item = ProductSize::find($request->id);

                    if (empty($item)) {
                        return Response::error("Product Sizes with id {$request->id} doesn't exist!");
                    }

                    return Response::success([
                        'item' => $item,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                  //Add rules  
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new ProductSize;

                    $item->product_id = $request->product_id;
                    $item->product_size = $request->product_size;
               
                    $item->save();
                    
                    return Response::success([
                        'msg' => 'Jauns ieraksts ir pievienots!',
                        'item' => $item,
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $item = ProductSize::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $item->product_size = $request->product_size;
                    $item->save();
                    
                    return Response::success([
                        'msg' => 'Izmaiņas ir saglabātas!',
                        'item' => $item,
                    ]);
                //</editor-fold>
                },
            ],

            'delete' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete">
                    $item = ProductSize::find($request->id);

                    if (empty($item)) {
                        return Response::error("Product Size with id {$request->id} doesn't exist!");
                    }
                    
                    
                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
                        'product_sizes' => ProductSize::where('product_id', $item->product_id)->get(),
                    ]);
                //</editor-fold>
                },
            ],

            'get_options' => [
                'rules' => [
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="get_options">
                    return Response::success([
                        'options' => ProductSizes::get(),
                    ]);
                //</editor-fold>
                },
            ], 

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }

}
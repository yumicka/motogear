<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\Specification;
use App\Models\Main\Product;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Media\Images;

use App\Logic\Main\Blog\Specifications;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

use DB;

class SpecificationsController extends Controller
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
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">
        $query = DB::connection('main')->table('specifications as c');

        //columns
        $columns = [
            'c.id' => 'id',
            'c.created_at' => 'created_at',
            'c.updated_at' => 'updated_at',
            'c.product_id' => 'product_id',
        ];

        $langs = Langs::getAll();

        foreach($langs as $lang) {
            $columns[$lang.'.title'] = $lang.'_title';
            $columns[$lang.'.content'] = $lang.'_content';
        }

        ContentTranslations::leftJoin($query, $langs, 'c.id', ContentTranslationsTypes::specifications->value);

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
            $query->where('c.product_id', $request->product_id);
        }

        $options = [
            'results_per_page' => 10,
            'order' => [
                'c.id' => 'desc',
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
                    $item = Specification::find($request->id);

                    if (empty($item)) {
                        return Response::error("Specification with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::specifications, $item->id);

                    return Response::success([
                        'item' => $item,
                        'translations' => $translations,
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
                    $item = new Specification;

                    $item->product_id = $request->product_id;  
                    $item->save();

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::specifications, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];
                        $content_translation->content = $request[$lang.'_content'];
                        $content_translation->save();
                    }
                    
                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::specifications, $item->id);

                    return Response::success([
                        'msg' => 'Jauns ieraksts ir pievienots!',
                        'item' => $item,
                        'translations' => $translations,
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
                    $item = Specification::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();

                    foreach($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(ContentTranslationsTypes::specifications, $item->id, $lang);
                        $content_translation->title = $request[$lang.'_title'];     
                        $content_translation->content = $request[$lang.'_content'];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get($langs, ContentTranslationsTypes::specifications, $item->id);

                    return Response::success([
                        'msg' => 'Izmaiņas ir saglabātas!',
                        'item' => $item,
                        'translations' => $translations,
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
                    $item = Specification::find($request->id);

                    if (empty($item)) {
                        return Response::error("Specification with id {$request->id} doesn't exist!");
                    }
                    ContentTranslations::delete(ContentTranslationsTypes::specifications, $item->id);
                    
                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
                        'specifications' => Specifications::get('lv'),
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
                        'options' => Specifications::get('lv'),
                    ]);
                //</editor-fold>
                },
            ], 

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }

}
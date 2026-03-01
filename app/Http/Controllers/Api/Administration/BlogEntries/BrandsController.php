<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use DB;

use App\Models\Main\Brand;

use App\Logic\Media\Images;
use App\Types\Main\Images as ImagesTypes;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class BrandsController extends Controller
{
    /**
     * SEARCH
     */
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('brands as b');

        $columns = [
            'b.id' => 'id',
            'b.created_at' => 'created_at',
            'b.updated_at' => 'updated_at',
            'b.brand_name' => 'brand_name',
            'b.image_id' => 'image_id',
            'b.size_guide_image_id' => 'size_guide_image_id',
        ];
        
        ContentTranslations::leftJoin($query, ['lv'], 'b.id', ContentTranslationsTypes::brand->value, 'brand_');

        $filters = [
            'id' => fn($q, $v) => $q->where('b.id', (int)$v),
            'brand_name' => fn($q, $v) => $q->where('b.brand_name', 'LIKE', "%{$v}%"),
        ];

        $options = [
            'results_per_page' => 10,
            'order' => ['b.id' => 'desc'],
        ];

        $params = DataSource::parseRequest($request);

        return Response::success(
            DataSource::get($params, $query, $columns, $filters, [], $options)
        );
    }

    /**
     * ACTIONS
     */
    public function actions(Request $request)
    {
        $actions = [

            /*
            |--------------------------------------------------------------------------
            | GET
            |--------------------------------------------------------------------------
            */
            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {

                    $item = Brand::find($request->id);

                    if (!$item) {
                        return Response::error("Brand with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::brand,
                        $item->id
                    );

                    return Response::success([
                        'item' => $item,
                        'image' => Images::getImageById($item->image_id),
                        'size_guide_image' => Images::getImageById($item->size_guide_image_id),
                        'translations' => $translations,
                    ]);
                },
            ],
                        
            'get_options' => [
                'rules' => [],
                'action' => function ($request) {

                    $items = DB::connection('main')
                        ->table('brands')
                        ->select(['id', 'brand_name'])
                        ->orderBy('brand_name', 'asc')
                        ->get();

                    return Response::success([
                        'options' => $items
                    ]);
                },
            ],

            /*
            |--------------------------------------------------------------------------
            | CREATE
            |--------------------------------------------------------------------------
            */
            'create' => [
                'rules' => [
                    'brand_name' => 'required|string|max:255',
                ],
                'action' => function ($request) {

                    $item = new Brand();
                    $item->brand_name = $request->brand_name;
                    $item->image_id = 0;
                    $item->size_guide_image_id = 0;
                    $item->save();

                    /**
                     * Создаём два image контейнера
                     */
                    $image = Images::createEmpty(
                        ImagesTypes::single_image_optimized->value,
                        $item->id
                    );

                    $sizeGuide = Images::createEmpty(
                        ImagesTypes::single_image_optimized->value,
                        $item->id
                    );

                    $item->image_id = $image->id;
                    $item->size_guide_image_id = $sizeGuide->id;
                    $item->save();

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $container = ContentTranslations::getContainer(
                            ContentTranslationsTypes::brand,
                            $item->id,
                            $lang
                        );

                        $container->data = [
                            'description' => base64_decode(
                                $request[$lang . '_description'] ?? ''
                            ),
                        ];

                        $container->save();
                    }

                    return Response::success([
                        'msg' => 'Brand created successfully!',
                        'item' => $item,
                        'translations' => ContentTranslations::get(
                            $langs,
                            ContentTranslationsTypes::brand,
                            $item->id
                        ),
                    ]);
                },
            ],

            /*
            |--------------------------------------------------------------------------
            | UPDATE
            |--------------------------------------------------------------------------
            */
            'update' => [
                'rules' => [
                    'id' => 'required|integer',
                    'brand_name' => 'sometimes|string|max:255',
                    'image_id' => 'sometimes|integer',
                    'size_guide_image_id' => 'sometimes|integer',
                ],
                'action' => function ($request) {

                    $item = Brand::find($request->id);

                    if (!$item) {
                        return Response::error("Brand with id {$request->id} doesn't exist!");
                    }

                    if ($request->has('brand_name')) {
                        $item->brand_name = $request->brand_name;
                    }

                    if ($request->has('image_id')) {
                        $item->image_id = (int)$request->image_id;
                    }

                    if ($request->has('size_guide_image_id')) {
                        $item->size_guide_image_id = (int)$request->size_guide_image_id;
                    }

                    $item->save();

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $container = ContentTranslations::getContainer(
                            ContentTranslationsTypes::brand,
                            $item->id,
                            $lang
                        );

                        $container->data = [
                            'description' => base64_decode(
                                $request[$lang . '_description'] ?? ''
                            ),
                        ];

                        $container->save();
                    }

                    return Response::success([
                        'msg' => 'Changes saved successfully!',
                        'item' => $item,
                        'translations' => ContentTranslations::get(
                            $langs,
                            ContentTranslationsTypes::brand,
                            $item->id
                        ),
                    ]);
                },
            ],

            /*
            |--------------------------------------------------------------------------
            | DELETE
            |--------------------------------------------------------------------------
            */
            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {

                    $item = Brand::find($request->id);

                    if (!$item) {
                        return Response::error("Brand with id {$request->id} doesn't exist!");
                    }

                    ContentTranslations::delete(
                        ContentTranslationsTypes::brand,
                        $item->id
                    );

                    if ($item->image_id) {
                        Images::deleteImageById($item->image_id);
                    }

                    if ($item->size_guide_image_id) {
                        Images::deleteImageById($item->size_guide_image_id);
                    }

                    $item->delete();

                    return Response::success([
                        'msg' => 'Brand deleted successfully!',
                    ]);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}
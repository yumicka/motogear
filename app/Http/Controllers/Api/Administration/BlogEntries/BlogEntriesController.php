<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use DB;
use App\Models\Main\Product;
use App\Models\Main\BlogCategory;
use App\Logic\Media\Images;
use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
use App\Types\Main\Images as ImagesTypes;

class BlogEntriesController extends Controller
{
    public function __construct()
    {
    }

    /**
     * Calculate final price
     */
    private function getCalculatedPrice($price, $discount)
    {
        $price = (float) $price;
        $discount = (float) $discount;

        if ($discount < 0) {
            $discount = 0;
        }

        if ($discount > 100) {
            $discount = 100;
        }

        return round($price * (1 - ($discount / 100)), 2);
    }

    /**
     * Search
     */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">
        $query = DB::connection('main')->table('products as p');

        $query->where('p.active', 1);

        $columns = [
            'p.id' => 'id',
            'p.created_at' => 'created_at',
            'p.updated_at' => 'updated_at',
            'blog_entry_lv.title' => 'blog_entry_name',
            'p.product_price' => 'product_price',
            'p.product_discount' => 'product_discount',
            'p.calculated_price' => 'calculated_price',
            'p.brand_id' => 'brand_id',
            'p.category_id' => 'category_id',
            'p.sub_category_id' => 'sub_category_id',
            'p.active' => 'active',
            'p.top_seller' => 'top_seller',
            'p.pinned' => 'pinned',
            'p.image_id' => 'image',
            'p.categories' => 'categories',
        ];

        ContentTranslations::leftJoin($query, ['lv'], 'p.id', ContentTranslationsTypes::blog_entry->value, 'blog_entry_');

        $formatters = [];

        $filters = [
            'top_seller' => function($query, $value) {
                if ((int)$value === 1) {
                    $query->where('p.top_seller', 1);
                }
            },
        ];

        $options = [
            'results_per_page' => 10,
            'order' => [
                'p.id' => 'desc',
            ]
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);
    //</editor-fold>
    }

    /**
     * Actions
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
                    $item = Product::find($request->id);

                    if (empty($item)) {
                        return Response::error("Product with id {$request->id} doesn't exist!");
                    }

                    $image = Images::getImageById($item->image_id);

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_entry,
                        $item->id
                    );

                    return Response::success([
                        'item' => $item,
                        'image' => $image,
                        'translations' => $translations,
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $item = new Product;

                    $tmp = Product::orderBy('position', 'desc')->first();
                    if (empty($tmp)) {
                        $position = 0;
                    } else {
                        $position = $tmp->position + 1;
                    }

                    $categories_ids = explode(',', (string) $request->categories);
                    $categories_ids = array_filter(array_map('intval', $categories_ids));
                    $categories = BlogCategory::whereIn('id', $categories_ids)->get();
                    $categories_ids = $categories->pluck('id')->all();

                    $mainCategoryId = null;
                    $subCategoryId = null;

                    foreach ($categories as $category) {
                        if (empty($category->parent_id)) {
                            $mainCategoryId = (int) $category->id;
                        } else {
                            $subCategoryId = (int) $category->id;
                        }
                    }

                    $productPrice = (float) $request->product_price;
                    $productDiscount = (float) $request->product_discount;
                    $calculatedPrice = $this->getCalculatedPrice($productPrice, $productDiscount);

                    $item->categories = $categories_ids;
                    $item->category_id = $mainCategoryId;
                    $item->sub_category_id = $subCategoryId;

                    $item->position = $position;
                    $item->active = (int) $request->active;
                    $item->pinned = (int) $request->pinned;
                    $item->product_price = $productPrice;
                    $item->product_discount = $productDiscount;
                    $item->calculated_price = $calculatedPrice;
                    $item->top_seller = (int) $request->top_seller;
                    $item->brand_id = (int) ($request->brand_id ?? 0);

                    $item->save();

                    $image = Images::createEmpty(ImagesTypes::single_image_optimized->value, $item->id);
                    $item->image_id = $image->id;
                    $image->save();
                    $item->save();

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(
                            ContentTranslationsTypes::blog_entry,
                            $item->id,
                            $lang
                        );

                        $content_translation->title = $request[$lang . '_title'];
                        $content_translation->data = [
                            'content' => base64_decode($request[$lang . '_content']),
                            'meta_title' => $request[$lang . '_meta_title'],
                            'meta_description' => $request[$lang . '_meta_description'],
                        ];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_entry,
                        $item->id
                    );

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
                    $item = Product::find($request->id);

                    if (empty($item)) {
                        return Response::error("Product with id {$request->id} doesn't exist!");
                    }

                    $categories_ids = explode(',', (string) $request->categories);
                    $categories_ids = array_filter(array_map('intval', $categories_ids));
                    $categories = BlogCategory::whereIn('id', $categories_ids)->get();
                    $categories_ids = $categories->pluck('id')->all();

                    $mainCategoryId = null;
                    $subCategoryId = null;

                    foreach ($categories as $category) {
                        if (empty($category->parent_id)) {
                            $mainCategoryId = (int) $category->id;
                        } else {
                            $subCategoryId = (int) $category->id;
                        }
                    }
                    
                    $productPrice = (float) $request->product_price;
                    $productDiscount = (float) $request->product_discount;
                    $calculatedPrice = $this->getCalculatedPrice($productPrice, $productDiscount);

                    $item->categories = $categories_ids;
                    $item->category_id = $mainCategoryId;
                    $item->sub_category_id = $subCategoryId;

                    $item->product_price = $productPrice;
                    $item->product_discount = $productDiscount;
                    $item->calculated_price = $calculatedPrice;

                    $item->active = (int) $request->active;
                    $item->top_seller = (int) $request->top_seller;
                    $item->pinned = (int) $request->pinned;
                    $item->brand_id = (int) ($request->brand_id ?? 0);

                    $item->save();

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(
                            ContentTranslationsTypes::blog_entry,
                            $item->id,
                            $lang
                        );
                        $content_translation->title = $request[$lang . '_title'];
                        $content_translation->data = [
                            'content' => base64_decode($request[$lang . '_content']),
                            'meta_title' => $request[$lang . '_meta_title'],
                            'meta_description' => $request[$lang . '_meta_description'],
                        ];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_entry,
                        $item->id
                    );

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
                    $item = Product::find($request->id);

                    if (empty($item)) {
                        return Response::error("Product with id {$request->id} doesn't exist!");
                    }

                    ContentTranslations::delete(ContentTranslationsTypes::blog_entry, $item->id);

                    Images::deleteImageById($item->image_id);
                    Images::deleteImages(ImagesTypes::blog_entry_gallery_, $item->id);

                    Product::where('position', '>', $item->position)->decrement('position');

                    $item->delete();

                    return Response::success([
                        'msg' => 'Produkts ir izdzēsts veiksmīgi!',
                    ]);
                //</editor-fold>
                },
            ],
        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }
}
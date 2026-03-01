<?php 

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\Brand;
use App\Logic\Media\Images;
use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
use App\Logic\Core\Response;

class BrandsController extends Controller
{
    public function getByName(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string'
        ]);

        $brand = Brand::where('brand_name', $request->brand_name)->first();

        if (!$brand) {
            return Response::error('Brand not found');
        }

        $langs = Langs::getAll();

        return Response::success([
            'item' => $brand,
            'image' => Images::getImageById($brand->image_id),
            'size_guide_image' => Images::getImageById($brand->size_guide_image_id),
            'translations' => ContentTranslations::get(
                $langs,
                ContentTranslationsTypes::brand,
                $brand->id
            ),
        ]);
    }
    
    public function getById(Request $request)
    {
        $request->validate([
            'id' => 'required|integer'
        ]);

        $item = Brand::find($request->id);

        if (!$item) {
            return Response::error("Brand not found");
        }

        $langs = Langs::getAll();

        return Response::success([
            'item' => $item,
            'image' => Images::getImageById($item->image_id),
            'size_guide_image' => Images::getImageById($item->size_guide_image_id),
            'translations' => ContentTranslations::get(
                $langs,
                ContentTranslationsTypes::brand,
                $item->id
            ),
        ]);
    }
}
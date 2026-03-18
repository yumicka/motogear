<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Models\Main\DeliveryCompany;
use DB;

class DeliveryCompaniesController extends Controller
{
   /**
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request)
    {
        //<editor-fold defaultstate="collapsed" desc="search">
        $query = DB::connection('main')->table('delivery_companies as d');

        $columns = [
            'd.id' => 'id',
            'd.name' => 'name',
            'd.lv_price' => 'lv_price',
            'd.lt_price' => 'lt_price',
            'd.ee_price' => 'ee_price',
            'd.active' => 'active',
            'd.position' => 'position',
            'd.created_at' => 'created_at',
            'd.updated_at' => 'updated_at',
        ];

        $filters = [  
        ];

        $options = [
            'results_per_page' => 10,
        ];

        $params = DataSource::parseRequest($request);

        $response = DataSource::get(
            $params,
            $query,
            $columns,
            $filters,
            [],
            $options
        );

        return Response::success($response);
        //</editor-fold>
    }

    /**
    * Actions
    *
    * @access public
    * @return json
    */
    public function actions(Request $request)
{
    $actions = [

        'get' => [
            'rules' => [
                'id' => 'required|integer',
            ],
            'action' => function ($request) {

                $company = DeliveryCompany::find($request->id);

                if (!$company) {
                    return Response::error("Delivery company with id {$request->id} not found");
                }

                return Response::success([
                    'item' => $company,
                ]);
            },
        ],

        'create' => [
            'rules' => [
                'name' => 'required|string|max:255',
                'lv_price' => 'required|numeric',
                'lt_price' => 'required|numeric',
                'ee_price' => 'required|numeric',
                'active' => 'nullable|boolean',
                'position' => 'nullable|integer',
            ],
            'action' => function ($request) {

                $company = new DeliveryCompany();

                $company->name = $request->name;
                $company->lv_price = $request->lv_price;
                $company->lt_price = $request->lt_price;
                $company->ee_price = $request->ee_price;
                $company->active = $request->active ?? 1;
                $company->position = $request->position ?? 0;

                $company->save();

                return Response::success([
                    'msg' => 'Delivery company created successfully',
                    'item' => $company,
                ]);
            },
        ],

        'update' => [
            'rules' => [
                'id' => 'required|integer',
                'name' => 'nullable|string|max:255',
                'lv_price' => 'nullable|numeric',
                'lt_price' => 'nullable|numeric',
                'ee_price' => 'nullable|numeric',
                'active' => 'nullable|boolean',
                'position' => 'nullable|integer',
            ],
            'action' => function ($request) {

                $company = DeliveryCompany::find($request->id);

                if (!$company) {
                    return Response::error("Delivery company with id {$request->id} not found");
                }

                $company->name = $request->name ?? $company->name;
                $company->lv_price = $request->lv_price ?? $company->lv_price;
                $company->lt_price = $request->lt_price ?? $company->lt_price;
                $company->ee_price = $request->ee_price ?? $company->ee_price;
                $company->active = $request->active ?? $company->active;
                $company->position = $request->position ?? $company->position;

                $company->save();

                return Response::success([
                    'msg' => 'Delivery company updated successfully',
                    'item' => $company,
                ]);
            },
        ],

        'delete' => [
            'rules' => [
                'id' => 'required|integer',
            ],
            'action' => function ($request) {

                $company = DeliveryCompany::find($request->id);

                if (!$company) {
                    return Response::error("Delivery company with id {$request->id} not found");
                }

                $company->delete();

                return Response::success([
                    'msg' => 'Delivery company deleted successfully',
                ]);
            },
        ],
    ];

    return Response::parse($request, $actions);
}
}
<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Models\Main\Order;
use DB;

class OrderAdmController extends Controller
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
        $query = DB::connection('main')->table('orders as o');

        $columns = [
            'o.id' => 'id',
            'o.numeration' => 'numeration',
            'o.order_status' => 'order_status',
            'o.payment_type' => 'payment_type',
            'o.shipping_type' => 'shipping_type',
            'o.total' => 'total',
            'o.first_name' => 'first_name',
            'o.surname' => 'surname',
            'o.email' => 'email',
            'o.phone' => 'phone',
            'o.created_at' => 'created_at',
        ];

        $filters = [
            'id' => function ($query, $value) {
                $query->where('o.id', $value);
            },
            'email' => function ($query, $value) {
                $query->where('o.email', 'LIKE', "%{$value}%");
            },
            'order_status' => function ($query, $value) {
                $query->where('o.order_status', $value);
            },
        ];

        $options = [
            'results_per_page' => 10,
            'order' => [
                'o.id' => 'desc',
            ],
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
        //<editor-fold defaultstate="collapsed" desc="actions">
        $actions = [
            'get' => [
                //<editor-fold defaultstate="collapsed" desc="get">
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {
                    $order = Order::find($request->id);

                    if (!$order) {
                        return Response::error("Order with id {$request->id} not found");
                    }

                    $orderArray = $order->toArray();

                    $products = [];
                    $products = $order->order_data ?? [];

                    return Response::success([
                        'item' => $order,
                        'order' => $orderArray,
                        'products' => $products,
                    ]);
                },
                //</editor-fold>
            ],

            
            'update' => [
                //<editor-fold defaultstate="collapsed" desc="update">
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {

                    $order = Order::find($request->id);

                    if (!$order) {
                        return Response::error("Order with id {$request->id} not found");
                    }

                    $order->order_status = $request->order_status;
                    $order->tracking_number = $request->tracking_number;
                    $order->courier_company = $request->courier_company;

                    $order->sent_email_status = $request->sent_email_status ?? $order->sent_email_status;
                    $order->sent_sms_status = $request->sent_sms_status ?? $order->sent_sms_status;

                    $order->save();

                    return Response::success([
                        'msg' => 'Order updated successfully',
                        'item' => $order,
                    ]);
                },
                //</editor-fold>
            ],

            
            'delete' => [
                //<editor-fold defaultstate="collapsed" desc="delete">
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {

                    $order = Order::find($request->id);

                    if (!$order) {
                        return Response::error("Order with id {$request->id} not found");
                    }

                    $order->delete();

                    return Response::success([
                        'msg' => 'Order deleted successfully',
                    ]);
                },
                //</editor-fold>
            ],
        ];

        return Response::parse($request, $actions);
        //</editor-fold>
    }
}
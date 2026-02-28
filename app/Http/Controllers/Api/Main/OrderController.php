<?php
namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Main\KlixPayments;
use App\Logic\Main\Cart\Cart;
use App\Logic\Core\Response;
use App\Models\Main\Order;
use App\Types\Main\OrderStatuses;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        $actions = [
            //create
            'create' => [
                'rules' => [
                    'name' => 'required|string|max:255',
                    'surname' => 'required|string|max:255',
                    'phoneNumber' => 'required|string|max:255',
                    'emain' => 'required|email|max:255',
                    'adress' => 'required|string|max:255',
                    'postcode' => 'required|string|max:255',
                    'country' => 'required|string|max:255',
                    'selectedCountry' => 'nullable|string|max:255',
                    'omnivaPackage' => 'nullable',
                    'comments' => 'nullable|string',
                    'privacyPolicy' => 'nullable',
                    'distanceContract' => 'nullable',
                    'deliveryType' => 'nullable|string|max:255',
                    'delivery_country' => 'nullable|string|max:255',
                    'delivery_address' => 'nullable|string|max:255',
                    'delivery_postal_code' => 'nullable|string|max:255',
                ],
                'action' => function ($request) {

                    $order = new Order();

                    $order->created_at = now();
                    $order->updated_at = now();

                    $order->user_id = null; // guest order

                    $order->numeration = (string) Str::uuid();

                    $order->order_status = OrderStatuses::pending;

                    $order->payment_type = '';

                    $order->shipping_type = $request->input('deliveryType');
                    $order->payment_reference_number = null;

                    $summary = Cart::getSummary();
                    
                    $order->total = $summary['totals']['total_price'];
                    $order->shipping_price = $summary['totals']['shipping_price'];

                    $order->first_name = $request->input('name');
                    $order->surname = $request->input('surname');
                    $order->email = $request->input('emain');
                    $order->phone = $request->input('phoneNumber');

                    $order->company_name = $request->input('company_name');
                    $order->reg_nr = $request->input('reg_nr');
                    $order->vat_nr = $request->input('vat_nr');

                    $order->country = $request->input('country');          // LV/LT/EE
                    $order->postal_code = $request->input('postcode');
                    $order->address = $request->input('adress');
                    
                    $isEqual = $request->input('isEqual'); // может быть '0'/'1'/true/false
                    $order->other_address = empty($isEqual) ? 1 : 0;

                    $order->delivery_country = $request->input('delivery_country');
                    $order->delivery_address = $request->input('delivery_address');
                    $order->delivery_postal_code = $request->input('delivery_postal_code');

                    $items = $request->input('items', []);

                    if (is_string($items)) {
                        $decoded = json_decode($items, true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $items = $decoded;
                        }
                    }

                    $order->order_data = $items;

                    $order->sent_sms_status = 0;
                    $order->sent_email_status = 0;
                    $order->recived_email_status = 0;
                    $order->recived_sms_status = 0;

                    $order->courier_company = 'omniva';
                    $order->tracking_number = null;

                    $order->save();

                    return Response::success([
                        'msg' => 'Jauns pasutijums ir pievienots!',
                        'order' => $order
                    ]);
                },
            ],
        ];
        return Response::parse($request, $actions);
    }   
    
    
    public function pay(Order $order, Request $request)
    {
        try {
            $order->payment_type = $request->payment_type;
            $order->order_status = OrderStatuses::payment_pending;
            $order->save();

            $purchase = KlixPayments::createOrderPurchase($order);

            return Response::success([
                'redirect_url' => $purchase['checkout_url'] ?? null
            ]);
        } catch (\Throwable $e) {
            \Log::error('Order pay failed', ['order_id' => $order->id, 'err' => $e->getMessage()]);
            return response()->json([
                'redirect_url' => null,
                'error' => 'PAY_FAILED',
            ], 500);
        }
    }
}
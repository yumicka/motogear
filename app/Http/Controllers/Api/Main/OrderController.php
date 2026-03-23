<?php
namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Main\KlixPayments;
use App\Logic\Main\Cart\Cart;
use App\Logic\Core\Response;
use App\Models\Main\Order;
use App\Logic\Main\Orders;
use App\Types\Main\OrderStatuses;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        $actions = [
            //create
            'create' => [
                'rules' => [
                    'person_type' => ['required', 'string', Rule::in(['private', 'company'])],

                    // private person
                    'name' => 'nullable|string|max:255|required_if:person_type,private',
                    'surname' => 'nullable|string|max:255|required_if:person_type,private',

                    // company
                    'company_name' => 'nullable|string|max:255|required_if:person_type,company',
                    'reg_nr' => 'nullable|string|max:255|required_if:person_type,company',
                    'vat_nr' => 'nullable|string|max:255',
                    
                    'phoneNumber' => 'required|string|max:255',
                    'email' => 'required|email|max:255',
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
                    
                    $personType = $request->input('person_type', 'private');

                    $order->user_id = null; // guest order

                    $order->numeration = (string) Str::uuid();

                    $order->order_status = OrderStatuses::pending;

                    $order->payment_type = '';

                    $order->shipping_type = $request->input('deliveryType');
                    $order->payment_reference_number = null;

                    $summary = Cart::getSummary();
                    
                    $order->shipping_price = $request->input('shipping_price');
                    $order->total = (float) $summary['totals']['total_price'] + $order->shipping_price;
                    
                    // Private / company data
                    if ($personType === 'company') {
                        $order->first_name = null;
                        $order->surname = null;

                        $order->company_name = $request->input('company_name');
                        $order->reg_nr = $request->input('reg_nr');
                        $order->vat_nr = $request->input('vat_nr');
                    } else {
                        $order->first_name = $request->input('name');
                        $order->surname = $request->input('surname');

                        $order->company_name = null;
                        $order->reg_nr = null;
                        $order->vat_nr = null;
                    }
                    
                    $order->email = $request->input('email');
                    $order->phone = $request->input('phoneNumber');

                    $order->country = $request->input('country');          // LV/LT/EE
                    $order->postal_code = $request->input('postcode');
                    $order->address = $request->input('adress');
                    
                    
                    $deliveryAddressManual = $request->input('delivery_address_manual');

                    $order->other_address = !empty($deliveryAddressManual) ? 1 : 0;

                    $order->delivery_country = $request->input('delivery_country');
                    $order->delivery_address = !empty($deliveryAddressManual)
                        ? $deliveryAddressManual
                        : $request->input('delivery_address');

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
                    
                    $order->order_number = 'ORD-' .date('Y') . '-' .str_pad($order->id, 6, '0', STR_PAD_LEFT);

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
            $order->order_status = OrderStatuses::failed;
            $order->save();
            \Log::error('Order pay failed', ['order_id' => $order->id, 'err' => $e->getMessage()]);
            return response()->json([
                'redirect_url' => null,
                'error' => 'PAY_FAILED',
            ], 500)
            ;
        }
    }
}
<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\Product;

use App\Logic\Core\Translations;
use App\Logic\Core\Response;
use App\Logic\Main\Cart\Cart;

class CartController extends Controller
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
    * Actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        
        $actions = [

            //add
            'add' => [
                'rules' => [
                    'product_id' => 'required|integer',
                    'variant_id' => 'required|integer|min:0',
                    'quantity' => 'required|integer',
                ],
                'action' => function($request) {
                    $product = Product::where('id', $request->product_id)->firstOrFail();
                    $cart = session('cart', []);
                    $quantity = (int)$request->quantity;
                    $cartKey = $request->product_id . '_' . $request->variant_id;

                    if (isset($cart[$cartKey])) {
                        $cart[$cartKey]['quantity'] += $quantity;
                    } else {
                        // новый товар в корзине
                        $cart[$cartKey] = [
                            'product_id' => $request->product_id,
                            'variant_id' => $request->variant_id,
                            'quantity' => $quantity,
                        ];
                    }

                    session(['cart' => $cart]);

                    return Response::success([
                        'cart' => Cart::getSummary()
                    ]);
                },
            ], 
                        
            'change_quantity' => [        
                'rules' => [
                    'product_id' => 'required|integer',
                    'variant_id' => 'required|integer|min:0',
                    'quantity_type' => 'required|string|in:increase,decrease',
                ],
                'action' => function($request)  {
                    $cart = session('cart', []);
                    $cartKey = $request->product_id . '_' . $request->variant_id;

                    $currentQuantity = isset($cart[$cartKey]) ? (int)$cart[$cartKey]['quantity'] : 0;

                    if ($request->quantity_type === 'increase') {
                        $newQuantity = min($currentQuantity + 1, 50);
                    } else {
                        $newQuantity = max($currentQuantity - 1, 1);
                    }

                    $cart[$cartKey] = array_merge(
                        $cart[$cartKey] ?? [],
                        [
                            'product_id' => $request->product_id,
                            'variant_id' => $request->variant_id,
                            'quantity' => $newQuantity
                        ]
                    );

                    session(['cart' => $cart]);

                    return Response::success([
                        'cart' => Cart::getSummary()
                    ]);
                },
            ],
                                             
            //remove
            'remove' => [        
                'rules' => [
                    'product_id' => 'required|integer',
                    'variant_id' => 'required|integer|min:0',
                ],
                'action' => function($request) {
                    //<editor-fold defaultstate="collapsed" desc="remove"> 
                    $cart = session('cart', []);
                    $cartKey = $request->product_id . '_' . $request->variant_id;

                    if (array_key_exists($cartKey, $cart)) {
                        unset($cart[$cartKey]);
                    }

                    session(['cart' => $cart]);

                    return Response::success([
                         'cart' => Cart::getSummary()
                    ]);
                    //</editor-fold>     
                },
            ],
        ];        

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }
}

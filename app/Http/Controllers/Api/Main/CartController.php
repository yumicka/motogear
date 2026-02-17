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
                   'quantity' => 'required|integer',
                ],
                'action' => function($request)  {
                //<editor-fold defaultstate="collapsed" desc="add"> 
                    $product = Product::where('id', $request->product_id)->firstOrFail();
                    
                    $cart = session('cart',[]);            
                    $quantity = (int)$request->quantity; // Ensure it's an integer
                    
                    if (isset($cart[$request->product_id])) {
                        $newQuantity = $cart[$request->product_id]['quantity'] + $quantity;
                        $cart[$request->product_id]['quantity'] = $newQuantity;
                        $cart[$request->product_id]['variant_id'] = $request->variant_id;
                    } else {
                        $cart[$request->product_id] = [
                            'id' => $request->product_id,
                            'quantity' => $quantity,
                            'variant_id' => $request->variant_id,
                        ];
                    }
                    
                    session(['cart' => $cart]);
                    
                    return Response::success([
                        'cart' => Cart::getSummary()
                    ]);                 
                //</editor-fold>     
                },
            ], 
                        
            'change_quantity' => [        
                'rules' => [
                    'product_id' => 'required|integer',
                    'quantity_type' => 'required|string|in:increase,decrease', // Must be "increase" or "decrease"
                ],
                'action' => function($request)  {
                    //<editor-fold defaultstate="collapsed" desc="Change Quantity"> 
                    $product = Product::where('id', $request->product_id)->firstOrFail();

                    $cart = session('cart', []);            

                    // Get current quantity in cart
                    $currentQuantity = isset($cart[$request->product_id]) ? (int)$cart[$request->product_id]['quantity'] : 0;

                    if ($request->quantity_type === 'increase') {
                        $newQuantity = $currentQuantity + 1;

                        if ($newQuantity > 50) {
                            $newQuantity = 50; // Limit max to 50
                        }
                    } elseif ($request->quantity_type === 'decrease') {
                        $newQuantity = $currentQuantity - 1;

                        if ($newQuantity < 1) {
                            $newQuantity = 1; // Prevent going below 1
                        }
                    } else {
                        return Response::error('Invalid type provided');
                    }

                    // Preserve all existing cart item data including variants
                    $cart[$request->product_id] = array_merge(
                        $cart[$request->product_id] ?? [], // Keep existing data
                        [
                            'id' => $request->product_id,
                            'quantity' => $newQuantity
                        ]
                    );

                    session(['cart' => $cart]);

                    return Response::success([
                        'cart' => Cart::getSummary()
                    ]);
                    //</editor-fold>     
                },
            ],
                                             
            //remove
            'remove' => [        
                'rules' => [
                    'product_id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="remove"> 
                    $cart = session('cart',[]);

                    if(array_key_exists($request->product_id, $cart)){
                        unset($cart[$request->product_id]);
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

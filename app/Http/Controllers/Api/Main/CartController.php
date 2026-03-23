<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\Product;

use App\Logic\Core\Translations;
use App\Logic\Core\Response;
use App\Logic\Main\Cart\Cart;
use App\Logic\Main\Product\ProductSizes;

class CartController extends Controller
{
    public function __construct()
    {
    }

    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions"> 
        
        $actions = [

            'add' => [
                'rules' => [
                    'product_id' => 'required|integer',
                    'variant_id' => 'required|integer|min:0',
                    'quantity' => 'required|integer|min:1',
                ],
                'action' => function($request) {
                    $product = Product::where('id', $request->product_id)->firstOrFail();

                    $cart = session('cart', []);
                    $quantity = (int) $request->quantity;
                    $variantId = (int) $request->variant_id;
                    $cartKey = $request->product_id . '_' . $variantId;

                    $currentQuantity = isset($cart[$cartKey])
                        ? (int) $cart[$cartKey]['quantity']
                        : 0;

                    if ($variantId > 0) {
                        $size = ProductSizes::getBySizeId($variantId);

                        if (!$size || empty($size['id'])) {
                            return Response::error('Product variant not found');
                        }

                        $availableCount = (int) ($size['product_count'] ?? 0);
                        $requestedTotal = $currentQuantity + $quantity;

                        if ($requestedTotal > $availableCount) {
                            return Response::error('Not enough stock available');
                        }
                    }

                    if (isset($cart[$cartKey])) {
                        $cart[$cartKey]['quantity'] += $quantity;
                    } else {
                        $cart[$cartKey] = [
                            'product_id' => $request->product_id,
                            'variant_id' => $variantId,
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
                    $variantId = (int) $request->variant_id;
                    $cartKey = $request->product_id . '_' . $variantId;

                    $currentQuantity = isset($cart[$cartKey])
                        ? (int) $cart[$cartKey]['quantity']
                        : 0;

                    if ($currentQuantity <= 0) {
                        return Response::error('Cart item not found');
                    }

                    if ($request->quantity_type === 'increase') {
                        if ($variantId > 0) {
                            $size = ProductSizes::getBySizeId($variantId);

                            if (!$size || empty($size['id'])) {
                                return Response::error('Product variant not found');
                            }

                            $availableCount = (int) ($size['product_count'] ?? 0);

                            if ($currentQuantity >= $availableCount) {
                                return Response::error('Not enough stock available');
                            }
                        }

                        $newQuantity = min($currentQuantity + 1, 50);
                    } else {
                        $newQuantity = max($currentQuantity - 1, 1);
                    }

                    $cart[$cartKey] = array_merge(
                        $cart[$cartKey] ?? [],
                        [
                            'product_id' => $request->product_id,
                            'variant_id' => $variantId,
                            'quantity' => $newQuantity
                        ]
                    );

                    session(['cart' => $cart]);

                    return Response::success([
                        'cart' => Cart::getSummary()
                    ]);
                },
            ],
                                             
            'remove' => [        
                'rules' => [
                    'product_id' => 'required|integer',
                    'variant_id' => 'required|integer|min:0',
                ],
                'action' => function($request) {
                    $cart = session('cart', []);
                    $cartKey = $request->product_id . '_' . $request->variant_id;

                    if (array_key_exists($cartKey, $cart)) {
                        unset($cart[$cartKey]);
                    }

                    session(['cart' => $cart]);

                    return Response::success([
                         'cart' => Cart::getSummary()
                    ]);
                },
            ],
        ];        

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }
}
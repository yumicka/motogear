<?php
namespace App\Logic\Main\Cart;

use DB;

use App\Models\Main\Product;

use App\Logic\Core\ContentTranslations;
use App\Logic\Main\Product\ProductEntries;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;


class Cart
{
    private static function getCartAmount() {
    //<editor-fold defaultstate="collapsed" desc="getCartAmount">
        $cart = session('cart', []);
        $totalQuantity = 0;

        foreach ($cart as $item) {
            $totalQuantity += (int) $item['quantity'];
        }

        return $totalQuantity;
    //</editor-fold>
    }
    
    private static function getTotals() {
        $cart = session('cart', []);

        $productTotal = 0;
        $priceWithoutVAT = 0;
        $shippingPrice = 0; // Placeholder

        foreach ($cart as $item) {
            $product = Product::find($item['id']);

            if ($product) {
                $price = $product->product_price;
                if ($product->product_discount > 0) {
                    $price = $price * (1 - $product->product_discount / 100);
                }

                $priceCents = (int) round($price * 100);
                $lineTotal = $priceCents * (int)$item['quantity'];
                $productTotal += $lineTotal;

                $lineWithoutVAT = $lineTotal / 1.21;
                $priceWithoutVAT += $lineWithoutVAT;
            }
        }

        $totalPrice = $productTotal/100 + $shippingPrice;

        return [
            'product_total' => round($productTotal/100, 2),
            'price_without_vat' => round($priceWithoutVAT/100, 2),
            'shipping_price' => round($shippingPrice/100, 2),
            'total_price' => round($totalPrice, 2),
        ];
    }

    
    private static function getProductSummary() {
    //<editor-fold defaultstate="collapsed" desc="getCartAmount">
        $cart = session('cart', []);
        $productSummary = [];

        foreach ($cart as $item) {
            $product = ProductEntries::getById('lv', $item['id']); // Assuming 'lv' is the language

            if ($product) {
                $productDiscount = $product['product_discount'] != 0;
                $calculated_price = $product['product_price'];
                if($productDiscount){
                    $calculated_price = $product['product_price'] * (1 - $product['product_discount'] / 100);
                }
                $quantity = (int)$item['quantity'];
                $price = round((float)$calculated_price, 2);
                
                // Calculate and round total for this product
                $productTotal = round($quantity * $price, 2);

                // Add quantity and total to product data
                $product['quantity'] = $quantity;
                $product['total'] = number_format($productTotal, 2, '.', '');
//                $product['selected_variant'] = \App\Logic\Main\Products\Variants::getOne('lv', $item['variant_id']);
                
                $productSummary[] = $product;
            }
        }

        return $productSummary;
    //</editor-fold>
    }
    public static function getSummary() {
    //<editor-fold defaultstate="collapsed" desc="getSummary">
        $totals = self::getTotals();
        $cartAmount = self::getCartAmount();
        $productSummary = self::getProductSummary();
        
        return [
            'totals' => $totals,
            'cart_amount' => $cartAmount,
            'product_summary' => $productSummary,
        ];
    //</editor-fold>
    }
    
    public static function amount() {
        return self::getCartAmount();
    }
}
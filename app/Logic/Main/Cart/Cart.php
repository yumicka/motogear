<?php
namespace App\Logic\Main\Cart;

use DB;

use App\Models\Main\Product;

use App\Logic\Core\ContentTranslations;
use App\Logic\Main\Products\ProductEntries;

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
    //<editor-fold defaultstate="collapsed" desc="getTotals">
        $cart = session('cart', []);
        
        $productTotal = 0;
        $priceWithoutVAT = 0;
        $shippingPrice = 0; // Placeholder for now
        
        foreach ($cart as $item) {
            $product = Product::find($item['id']);
            
            if ($product) {
                $lineTotal = $product->calculated_price * $item['quantity'];
                $productTotal += $lineTotal;

                // Assuming 21% VAT
                $lineWithoutVAT = $lineTotal / 1.21;
                $priceWithoutVAT += $lineWithoutVAT;
            }
        }

        $totalPrice = $productTotal + $shippingPrice;

        return [
            'product_total' => round($productTotal, 2),
            'price_without_vat' => round($priceWithoutVAT, 2),
            'shipping_price' => round($shippingPrice, 2),
            'total_price' => round($totalPrice, 2),
        ];
    //</editor-fold>
    }
    private static function getProductSummary() {
    //<editor-fold defaultstate="collapsed" desc="getCartAmount">
        $cart = session('cart', []);
        $productSummary = [];

        foreach ($cart as $item) {
            $product = Products::getById('lv', $item['id']); // Assuming 'lv' is the language

            if ($product) {
                $quantity = (int)$item['quantity'];
                $price = round((float)$product['calculated_price'], 2);
                
                // Calculate and round total for this product
                $productTotal = round($quantity * $price, 2);

                // Add quantity and total to product data
                $product['quantity'] = $quantity;
                $product['total'] = number_format($productTotal, 2, '.', '');
                $product['selected_variant'] = \App\Logic\Main\Products\Variants::getOne('lv', $item['variant_id']);
                
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
}
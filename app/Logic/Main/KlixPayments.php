<?php
namespace App\Logic\Main;

use GuzzleHttp\Client;
use App\Logic\Core\Log;
use App\Logic\Main\Orders;
use App\Types\Main\OrderStatuses;
//use App\Models\Main\Order;

use Arr;

class KlixPayments
{  
    /**
     * Make request
     *
     * @access public           
     * @param  string $method - method
     * @param  string $endpoint - endpoint
     * @param  array $options - options
     * @return array or null
    */
    private static function request($method, $endpoint, $options = [], $config = []) {
    //<editor-fold defaultstate="collapsed" desc="request"> 
        //$brandId = config('services.klix.brand_id');
        $apiKey = config('services.klix.secret_key');
        $base = config('services.klix.endpoint');
        
        $client = new Client(array_merge([
            'base_uri' => $base,
        ], $config));
        
        $headers = [];
        if ($apiKey) {
                $headers['Authorization'] = 'Bearer ' . $apiKey;
        }
        try {
            $response = $client->request($method, $base.$endpoint, array_merge([
                'headers' => $headers
            ], $options));
            $body = (string) $response->getBody()->getContents();
            return json_decode($body, true);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return json_decode($e->getResponse()->getBody(), true);
        }

        return null;
    //</editor-fold>
    }
        
    /**
     * GetPaymentMethods
     *
     * @access public           
     * @param  string $currency - currency 
     * @return array
    */
    public static function getPaymentMethods($currency = 'EUR') {
        $brandId = config('services.klix.brand_id');
        
        return self::request('GET', '/payment_methods/', [
            'query' => [
                'brand_id' => $brandId,
                'currency' => $currency,
            ]
        ]);
    }
    
    /**
     * createPurchase
     *
     * @access public           
     * @param  array $data - data
     * @return array
    */
    public static function createPurchase($data) {
        $brandId = config('services.klix.brand_id');
        
        return self::request('POST', '/purchases/', [
            'json' => is_array($data) 
                    ? array_merge($data, ['brand_id' => $brandId]) 
                    : $data
        ]);
    }
    
    /**
     * getPurchase
     *
     * @access public           
     * @param  string $purchaseId - purchase id 
     * @return array
    */
    public static function getPurchase($purchaseId) {
        return self::request('GET', '/purchases/' . $purchaseId . '/');
    }
    
    /**
     * Create order purchase
     *
     * @access public           
     * @param  \App\Models\Main\Order - $order 
     * @return array or null
     */
    public static function createOrderPurchase($order) {
    //<editor-fold defaultstate="collapsed" desc="createOrderPurchase">
        $locale = app()->getLocale();
        
        //dd(url($locale.'/klix-payment-success/'.$order->id));
        
        //dd(url($locale.'/klix-payment-success/'.$order->id));
        
        $total = (double)$order->total;
        $total = $total * 100;
        $total = intval(round($total));
        
        
        $purchase = null;
        
        try { 
            $purchase = self::createPurchase([
            'client' => [
                'email' => $order->email,
                'phone' => $order->phone,
            ],
            'purchase' => [
                'products' => [
                    [
                        'name' => 'Pirkums',
                        'price' => $total,
                    ]
                ]
            ],  
            'success_redirect' => 'http://oklinika.dobinnovations.lv/lv/klix-payment-success/'.$order->id,
            "brand_id" => 'a60e117c-8af5-4240-b627-42102588b638',
            'reference' => $order->numeration,
            "due_strict" => true,
            "payment_method_whitelist" => [$order->payment_type],
        ]);
        } catch (\Exception $ex) {
            Log::error('KlixPaymentOrder failed', ['error' => $ex->getMessage()]);
        }
       

        if (empty($purchase) || empty($purchase['id'])) {
            Log::error('Klix createPurchase failed', [
                'order_id' => $order->id,
                'purchase' => $purchase
            ]);
            return $purchase ?? [];
        }

        $order->payment_reference_number = $purchase['id'];
        $order->save();
        
        
        //dd($purchase);
        
        if (empty($purchase) || empty($purchase['checkout_url'])) {
            Log::error('KlixPayments::createOrderPurchase failed!', ['order' => $order, 'purchase' => $purchase]);
        }
        
        return $purchase;
    //</editor-fold>  
    }
    
    /**
     * Check order payment
     *
     * @access public           
     * @param  \App\Models\Main\Order - $order 
     * @return void
     */
    public static function checkOrderPayment($order) {
    //<editor-fold defaultstate="collapsed" desc="checkOrderPayment">
        $purchaseId = $order->payment_reference_number;
                
        if (empty($purchaseId)) {            
            return;
        }
        
        $purchase_data = self::getPurchase($purchaseId);
        
        $status = Arr::get($purchase_data, 'status');
               
        if ($status === 'paid') {
            $order->status = OrderStatuses::paid;
            $order->save();
            Orders::confirmOrder($order);
        }    
	else if (in_array($status, ['error', 'cancelled', 'declined', 'blocked', 'error', 'expired'])) {
            $order->status = OrderStatuses::failed;            
            $order->save();
        }
    //</editor-fold>  
    }
}

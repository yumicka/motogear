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
    private static function request($method, $endpoint, $options = [], $config = [])
{
    $apiKey = config('services.klix.secret_key');
    $base = rtrim(config('services.klix.endpoint'), '/');
    
    $client = new Client(array_merge([
        'base_uri' => $base,
        'timeout' => 20,
        'connect_timeout' => 10,
        'http_errors' => false, // <-- ключ!
    ], $config));

    $headers = [
        'Accept' => 'application/json',
    ];
    if ($apiKey) {
        $headers['Authorization'] = 'Bearer ' . $apiKey;
    }

    $url = $base . $endpoint;

    try {
        $response = $client->request($method, $url, array_merge([
            'headers' => $headers,
        ], $options));

        $status = $response->getStatusCode();
        $body = (string) $response->getBody();

        $json = json_decode($body, true);

        // логируем любые не-2xx
        if ($status >= 400) {
            \Log::error('Klix API error', [
                'method' => $method,
                'url' => $url,
                'status' => $status,
                'body' => mb_substr($body, 0, 2000),
                'json' => $json,
            ]);
        }

        return $json ?? [
            '_error' => 'NON_JSON',
            'status' => $status,
            'raw' => $body,
        ];
    } catch (\GuzzleHttp\Exception\GuzzleException $e) {
        \Log::error('Klix Guzzle exception', [
            'method' => $method,
            'url' => $url,
            'error' => $e->getMessage(),
        ]);
        return [
            '_error' => 'GUZZLE_EXCEPTION',
            'message' => $e->getMessage(),
        ];
    }
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
        $baseUrl = 'https://motogear.dobinnovations.lv';
        
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
//            'success_redirect' => $locale.'/klix-payment-success/'.$order->id,
            'success_redirect' => $baseUrl . '/' . $locale . '/klix-payment-success/' . $order->id,
            'cancel_redirect' => $baseUrl . '/' . $locale . '/klix-payment-failed/' . $order->id,
//                
//            "brand_id" => 'a60e117c-8af5-4240-b627-42102588b638',
            'reference' => $order->numeration,
            "due_strict" => true,
            "payment_method_whitelist" => [$order->payment_type],
        ]
        );
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
               
        switch ($status) {
            case 'paid':
                $order->order_status = OrderStatuses::paid;
                $order->save();
                Orders::confirmOrder($order);
                break;

            case 'cancelled':
                $order->order_status = OrderStatuses::cancelled;
                $order->save();
                break;

            case 'pending':
                $order->order_status = OrderStatuses::pending;
                $order->save();
                break;

            default:
                $order->order_status = OrderStatuses::failed;
                $order->save();
                break;
            }
    //</editor-fold>  
    }
}

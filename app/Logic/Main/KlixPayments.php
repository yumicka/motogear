<?php
namespace App\Logic\Main;

use GuzzleHttp\Client;
use App\Logic\Core\Log;
use App\Logic\Main\Orders;
use App\Types\Main\OrderStatuses;
use App\Logic\Main\Product\ProductSizes;

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
                
            'success_redirect' => $baseUrl . '/' . $locale . '/klix-payment-success/' . $order->id,
            'cancel_redirect' => $baseUrl . '/' . $locale . '/klix-payment-failed/' . $order->id,         
            'reference' => $order->numeration,
            "due_strict" => true,
            "payment_method_whitelist" => [$order->payment_type],
        ]
        );
        } catch (\Exception $ex) {
            
            Log::error('KlixPaymentOrder failed', ['error' => $ex->getMessage()]);
        }
       

        if (empty($purchase) || empty($purchase['id'])) {
            $order->order_status = OrderStatuses::failed;
            $order->save();
            Log::error('Klix createPurchase failed', [
                'order_id' => $order->id,
                'purchase' => $purchase
            ]);
            return $purchase ?? [];
        }

        $order->payment_reference_number = $purchase['id'];
        $order->save();
        
        if (empty($purchase) || empty($purchase['checkout_url'])) {
            $order->order_status = OrderStatuses::failed;
            $order->save();
            Log::error('KlixPayments::createOrderPurchase failed!', ['order' => $order, 'purchase' => $purchase]);
        }
        
        return $purchase;
    //</editor-fold>  
    }
    
    private static function decreaseOrderProducts($order)
    {
        $items = $order->order_data;

        if (is_string($items)) {
            $decoded = json_decode($items, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $items = $decoded;
            }
        }

        if (!is_array($items) || empty($items)) {
            return;
        }

        foreach ($items as $item) {
            $productId = (int)($item['id'] ?? 0);
            $count = (int)($item['quantity'] ?? 0);
            $sizeId = (int)($item['selected_variant']['id'] ?? 0);

            if ($productId <= 0 || $count <= 0) {
                continue;
            }

            $result = ProductSizes::decreaseCount($productId, $sizeId, $count);

            if ($sizeId > 0 && !$result) {
                throw new \RuntimeException(
                    'Not enough stock for product_id=' . $productId . ', size_id=' . $sizeId
                );
            }
        }
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
                if ($order->order_status !== OrderStatuses::paid) {
                    try {
                        self::decreaseOrderProducts($order);
                        $order->order_status = OrderStatuses::paid;
                        $order->save();
                        Orders::confirmOrder($order);
                    } catch (\Throwable $e) {
                        Log::error('Failed to decrease stock after successful payment', [
                            'order_id' => $order->id,
                            'error' => $e->getMessage(),
                        ]);

                        throw $e;
                    }
                }
                break;

            case 'cancelled':
                $order->order_status = OrderStatuses::cancelled;
                $order->save();
                break;

            case 'pending':
                $order->order_status = OrderStatuses::pending;
                $order->save();
                break;
            
            case 'created':
                $order->order_status = OrderStatuses::created;
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

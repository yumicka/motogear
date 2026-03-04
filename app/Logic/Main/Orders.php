<?php

namespace App\Logic\Main;

use App\Models\Main\Order;
use Dompdf\Dompdf;
use Illuminate\Support\Facades\File;

class Orders
{
    /**
     * Confirm order
     */
    public static function confirmOrder(Order $order): void
    {
        self::createInvoicePDF($order);
    }

    /**
     * Create invoice pdf
     */
    public static function createInvoicePDF(Order $order): void
    {
        $data = self::getData($order, 'lv');

        $html = view('pdf.invoice', $data)->render();

        $dompdf = new Dompdf();
        $dompdf->set_option('isRemoteEnabled', true);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        $path = storage_path('invoices');
        if (!File::exists($path)) {
            File::makeDirectory($path, 0755, true);
        }

        File::put($path . '/invoice_' . $order->numeration . '.pdf', $dompdf->output());
    }

    public static function getData(Order $order, string $lang = 'lv'): array
    {
        
        $company_requisites =
            config('company_requisites')
            ?? config('configuration.company_requisites')
            ?? [];

        $company_requisites = array_merge([
            'company_name'         => config('app.name', ''),
            'physical_address'     => '',
            'registration_number'  => '',
            'phone'                => '',
            'email'                => '',
            'bank'                 => '',
            'bank_account'         => '',
        ], is_array($company_requisites) ? $company_requisites : []);

        $products = $order->order_data ?? [];
        if (is_string($products)) {
            $decoded = json_decode($products, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $products = $decoded;
            }
        }
        if (!is_array($products)) {
            $products = [];
        }

        $rows = [];
        foreach ($products as $item) {
            \Log::info('ORDER_DATA_ITEM', $item);
            $title = (string)($item['title'] ?? $item['name'] ?? $item['product_title'] ?? '');
            $qty   = (int)($item['quantity'] ?? $item['qty'] ?? 0);

            $price = (float)($item['product_price'] ?? $item['price'] ?? $item['unit_price'] ?? 0);

            $lineTotal = (float)($item['total'] ?? $item['calculated_price'] ?? ($price * $qty));

            $price = round($price, 2);
            $lineTotal = round($lineTotal, 2);

            $rows[] = [
                'title'            => $title,
                'quantity'         => $qty,
                'price'            => round($price, 2),
                'calculated_price' => $lineTotal,
            ];
        }

        $useDelivery = (int)($order->other_address ?? 0) === 1;

        $shippingAddress = $useDelivery
            ? trim((string)($order->delivery_address ?? ''))
            : trim((string)($order->address ?? ''));

        $shippingPostalCode = $order->postal_code ?? '';

        $shippingCountry = $useDelivery
            ? trim((string)($order->delivery_country ?? ''))
            : trim((string)($order->country ?? ''));

        $shippingFull = trim(implode(', ', array_filter([
            $shippingAddress,
            $shippingPostalCode,
            $shippingCountry,
        ])));

        
        $orderData = [
            'fields' => [
                ['phone' => (string)($order->phone ?? '')],
                ['email' => (string)($order->email ?? '')],
                ['name' => (string)($order->first_name ?? '')],
                ['last_name' => (string)($order->surname ?? '')],
            ],
            'shipping' => [
                'address' => $shippingFull,
            ],
        ];

        $orderView = clone $order;

        $orderView->shipping = $order->shipping_price ?? $order->shipping ?? 0;

        $orderView->date = $order->created_at ?? $order->date ?? now();
        $orderView->number = $order->numeration ?? $order->number ?? (string)$order->id;
        $orderView->type = $order->type ?? 'invoice';

        // самое важное: data как в старом коде
        $orderView->data = $orderData;

        return [
            'order' => $orderView,
            'rows' => $rows,
            'company_requisites' => $company_requisites,
        ];
    }
}
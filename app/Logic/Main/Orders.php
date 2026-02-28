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

    /**
     * Adapter for old invoice.blade.php expectations
     */
    public static function getData(Order $order, string $lang = 'lv'): array
    {
        // 1) Company requisites (подстрой под то, где у тебя реально лежит массив реквизитов)
        // Можно заменить на Settings::get('company_requisites') если есть Settings.
        // 1) Company requisites
        $company_requisites =
            config('company_requisites')
            ?? config('configuration.company_requisites')
            ?? [];

        // 1.1) гарантируем нужные ключи (чтобы blade не падал)
        $company_requisites = array_merge([
            'company_name'         => config('app.name', ''),
            'physical_address'     => '',
            'registration_number'  => '',
            'phone'                => '',
            'email'                => '',
            'bank'                 => '',
            'bank_account'         => '',
        ], is_array($company_requisites) ? $company_requisites : []);

        // 2) Достаём товары из нового поля order_data
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

        // 3) Готовим rows под invoice.blade.php: title, quantity, calculated_price
        $rows = [];
        foreach ($products as $item) {
            $title = (string)($item['title'] ?? $item['name'] ?? $item['product_title'] ?? '');
            $qty   = (int)($item['quantity'] ?? $item['qty'] ?? 0);

            // price = цена за единицу (как у тебя в getData раньше)
            $price = (float)($item['price'] ?? $item['unit_price'] ?? 0);

            // calculated_price в шаблоне выглядит как "итого по строке"
            $lineTotal = (float)($item['calculated_price'] ?? ($price * $qty));
            $lineTotal = round($lineTotal, 2);

            $rows[] = [
                'title'            => $title,
                'quantity'         => $qty,
                'price'            => round($price, 2),
                'calculated_price' => $lineTotal,
            ];
        }

        // 4) Адрес доставки: если other_address=0 (isEqual=1) — используем основной, иначе delivery_*
        $useDelivery = (int)($order->other_address ?? 0) === 1;

        $shippingAddress = $useDelivery
            ? trim((string)($order->delivery_address ?? ''))
            : trim((string)($order->address ?? ''));

        $shippingPostalCode = $useDelivery
            ? trim((string)($order->delivery_postal_code ?? ''))
            : trim((string)($order->postal_code ?? ''));

        $shippingCountry = $useDelivery
            ? trim((string)($order->delivery_country ?? ''))
            : trim((string)($order->country ?? ''));

        $shippingFull = trim(implode(', ', array_filter([
            $shippingAddress,
            $shippingPostalCode,
            $shippingCountry,
        ])));

        // 5) Собираем "старый" $order->data['fields'] и $order->data['shipping']
        // invoice.blade.php обращается к:
        // $fields[0]['phone'], $fields[1]['email'], $fields[2]['name'], $fields[3]['last_name']
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

        // 6) Шаблон ещё использует $order->shipping, $order->total, $order->date, $order->type, $order->number
        // Сделаем "view-модель" (клон), чтобы не портить исходный объект.
        $orderView = clone $order;

        // shipping в шаблоне — это доставка (у тебя shipping_price)
        $orderView->shipping = $order->shipping_price ?? $order->shipping ?? 0;

        // date/number/type — подстраховка, если таких полей нет
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
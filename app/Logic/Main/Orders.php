<?php

namespace App\Logic\Main;

use App\Logic\Core\Translations;
use App\Models\Main\Order;
use Illuminate\Support\Facades\Log;
use Dompdf\Dompdf;
use File;
use Mail;
use Arr;

class Orders
{
    /**
     * Confirm order
     */
    public static function confirmOrder(Order $order): void
    {
        self::createInvoicePDF($order);
        self::sendSuccessEmail($order);
        self::sendAdminNotification($order);
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

        File::put($path . '/invoice_' . $order->order_number . '.pdf', $dompdf->output());
    }

    public static function getData(Order $order, string $lang = 'lv'): array
    {
        $companyRequisites =
            config('company_requisites')
            ?? config('configuration.company_requisites')
            ?? [];

        $companyRequisites = array_merge([
            'company_name'        => config('app.name', ''),
            'physical_address'    => '',
            'registration_number' => '',
            'phone'               => '',
            'email'               => '',
            'bank'                => '',
            'bank_account'        => '',
        ], is_array($companyRequisites) ? $companyRequisites : []);

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
            $title = (string) ($item['title'] ?? $item['name'] ?? $item['product_title'] ?? '');
            $qty = (int) ($item['quantity'] ?? $item['qty'] ?? 0);
            $size = (string) (
                $item['selected_variant']['product_size']
                ?? $item['selected_variant']['size']
                ?? $item['size']
                ?? ''
            );
            $price = (float) ($item['product_price'] ?? $item['price'] ?? $item['unit_price'] ?? 0);
            $lineTotal = (float) ($item['total'] ?? $item['calculated_price'] ?? ($price * $qty));

            $rows[] = [
                'title' => $title,
                'quantity' => $qty,
                'size' => $size,
                'price' => round($price, 2),
                'calculated_price' => round($lineTotal, 2),
            ];
        }

        $useDifferentDeliveryAddress = (int) ($order->other_address ?? 0) === 1;

        $shippingAddress = $useDifferentDeliveryAddress
            ? trim((string) ($order->delivery_address ?? ''))
            : trim((string) ($order->address ?? ''));

        $shippingPostalCode = $useDifferentDeliveryAddress
            ? trim((string) ($order->delivery_postal_code ?? ''))
            : trim((string) ($order->postal_code ?? ''));

        $shippingCountry = $useDifferentDeliveryAddress
            ? trim((string) ($order->delivery_country ?? ''))
            : trim((string) ($order->country ?? ''));

        $shippingFullAddress = trim(implode(', ', array_filter([
            $shippingAddress,
            $shippingPostalCode,
            $shippingCountry,
        ])));

        $isCompany = !empty($order->company_name);

        $client = [
            'is_company' => $isCompany,
            'first_name' => (string) ($order->first_name ?? ''),
            'last_name' => (string) ($order->surname ?? ''),
            'full_name' => trim(((string) ($order->first_name ?? '')) . ' ' . ((string) ($order->surname ?? ''))),
            'company_name' => (string) ($order->company_name ?? ''),
            'reg_nr' => (string) ($order->reg_nr ?? ''),
            'vat_nr' => (string) ($order->vat_nr ?? ''),
            'display_name' => $isCompany
                ? (string) ($order->company_name ?? '')
                : trim(((string) ($order->first_name ?? '')) . ' ' . ((string) ($order->surname ?? ''))),
            'email' => (string) ($order->email ?? ''),
            'phone' => (string) ($order->phone ?? ''),
        ];

        $shipping = [
            'other_address' => $useDifferentDeliveryAddress,
            'address' => $shippingAddress,
            'postal_code' => $shippingPostalCode,
            'country' => $shippingCountry,
            'full_address' => $shippingFullAddress,
        ];

        $totals = [
            'shipping' => (float) ($order->shipping_price ?? $order->shipping ?? 0),
            'total' => (float) ($order->total ?? 0),
        ];

        $orderData = [
            'client' => $client,
            'shipping' => [
                'address' => $shipping['full_address'],
            ],
        ];

        $orderView = clone $order;
        $orderView->shipping = $totals['shipping'];
        $orderView->date = $order->created_at ?? $order->date ?? now();
        $orderView->number = $order->order_number ?? $order->number ?? (string) $order->id;
        $orderView->type = $order->type ?? 'invoice';
        $orderView->data = $orderData;

        return [
            'order' => $orderView,
            'rows' => $rows,
            'company_requisites' => $companyRequisites,
            'client' => $client,
            'shipping' => $shipping,
            'totals' => $totals,
        ];
    }
    
    /**
     * Emails
     *
     * @access public           
     * @param  \App\Models\Main\Order - $order 
     * @return void
     */
    
    protected static function getClientEmail(Order $order, array $data = []): ?string
    {
        //<editor-fold defaultstate="collapsed" desc="getClientEmail"> 
        $email = $order->email
        ?? $order->contact_email
        ?? ($data['client']['email'] ?? null);

        $email = is_string($email) ? trim($email) : null;

        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
         //</editor-fold>  
    }
    
    /**
     * Send email to administrator about new order
     *
     * @access public           
     * @param  \App\Models\Main\Order - $order 
     * @return void
     */
    public static function sendAdminNotification($order) {
    //<editor-fold defaultstate="collapsed" desc="sendAdminNotification">           
        try { 
        Mail::send(
            'emails.admin_new_order',
            [
                'introLines' => [
                    'Jauns pasūtījums ' . ($order->order_number ?? $order->number ?? $order->id),
                ],
                'level' => '',
                'outroLines' => []
            ],
            function ($message) use ($order) {
                $message->subject('Jauns pasūtījums ' . ($order->order_number ?? $order->number ?? $order->id));
                $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
                $message->to(env('MAIL_TO'));
            }
        );
        } catch (\Exception $ex) {
            Log::error('sendAdminNotification failed', [
                'order' => $order,
                'error' => $ex->getMessage()
            ]);
        }     
    //</editor-fold>  
    }
    
    /**
     * Send email with order data
     *
     * @access public           
     * @param  \App\Models\Main\Order - $order
     * @return void
     */
    public static function sendSuccessEmail($order): void
    { 
        //<editor-fold defaultstate="collapsed" desc="sendSuccessEmail"> 
        $lang = app()->getLocale();
        $data = self::getData($order, $lang);

        $clientEmail = self::getClientEmail($order, $data);
        $info = \App\Logic\Core\Settings::get('paid_email') ?? [];

        if (!$clientEmail) {
            Log::warning('sendSuccessEmail skipped: client email not found', [
                'order_id' => $order->id ?? null,
            ]);
            return;
        }

        $subject = Translations::get('order_success_email_subject', $lang);

        try {
            Mail::send(
                'emails.order_success',
                $data,
                function ($message) use ($subject, $order, $clientEmail) {
                    $message->subject(
                        Translations::get('your_order_number_is') . ' ' . ($order->order_number ?? $order->id) . ' ' . $subject
                    );
                    $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
                    $message->to($clientEmail);

                    $path = storage_path('invoices');
                    $file = $path . '/invoice_' . ($order->order_number ?? $order->id) . '.pdf';

                    if (File::exists($file)) {
                        $message->attach($file, [
                            'as' => ($order->order_number ?? $order->id) . '.pdf',
                            'mime' => 'application/pdf',
                        ]);
                    }
                }
            );
            $order->recived_email_status = 1;
        } catch (\Exception $ex) {
            Log::error('sendSuccessEmail failed', [
                'order_id' => $order->id ?? null,
                'error' => $ex->getMessage(),
            ]);
        }
        //</editor-fold>  
    }
}
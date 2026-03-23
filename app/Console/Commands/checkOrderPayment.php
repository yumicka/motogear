<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Main\Order;
use App\Logic\Main\KlixPayments;
use App\Types\Main\OrderStatuses;

class checkOrderPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'checkOrderPayment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Extract category ids from categories field
     *
     * @param mixed $value
     * @return array
     */
    

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
       $orders = Order::where('order_status', OrderStatuses::created->value)->get();

        foreach ($orders as $order) {
            KlixPayments::checkOrderPayment($order);
        }
    }
}
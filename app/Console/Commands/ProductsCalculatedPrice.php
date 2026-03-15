<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Main\Product;

class ProductsCalculatedPrice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product_price';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Product price calculatings using discount';

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
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $products = Product::get();
        foreach ($products as $product) {
            $price = (float) $product->product_price;
            $discount = (float) $product->product_discount;

            if ($discount < 0) {
                $discount = 0;
            }

            if ($discount > 100) {
                $discount = 100;
            }

            $calculatedPrice = $price * (1 - ($discount / 100));
            $calculatedPrice = round($calculatedPrice, 2);

            $product->calculated_price = $calculatedPrice;
            $product->save();
        }
    }
}
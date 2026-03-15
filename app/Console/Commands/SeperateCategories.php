<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Main\Product;
use App\Models\Main\BlogCategory;

class SeperateCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seperate_categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seperating product categories and subcategories';

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
    private function extractCategoryIds($value)
    {
        if (empty($value)) {
            return [];
        }

        // If already array
        if (is_array($value)) {
            return array_values(array_filter(array_map('intval', $value)));
        }

        // If json string like "[1,2]" or '["1","2"]'
        if (is_string($value)) {
            $trimmed = trim($value);

            $decoded = json_decode($trimmed, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return array_values(array_filter(array_map('intval', $decoded)));
            }

            // Format like [1],[2],[3]
            preg_match_all('/\[(\d+)\]/', $trimmed, $matches);

            if (!empty($matches[1])) {
                return array_values(array_filter(array_map('intval', $matches[1])));
            }

            // Fallback for comma separated string: "1,2,3"
            return array_values(array_filter(array_map('intval', explode(',', $trimmed))));
        }

        return [];
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        Product::chunk(200, function ($products) {
            foreach ($products as $product) {
                $categoryIds = $this->extractCategoryIds($product->categories);

                if (empty($categoryIds)) {
                    $product->category_id = null;
                    $product->sub_category_id = null;
                    $product->save();
                    continue;
                }

                $categories = BlogCategory::whereIn('id', $categoryIds)->get();

                $mainCategoryId = null;
                $subCategoryId = null;

                foreach ($categories as $category) {
                    if (empty($category->parent_id)) {
                        $mainCategoryId = (int) $category->id;
                    } else {
                        $subCategoryId = (int) $category->id;
                    }
                }

                $product->category_id = $mainCategoryId;
                $product->sub_category_id = $subCategoryId;
                $product->save();
            }
        });
    }
}
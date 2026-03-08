<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Main\BlogCategory;
use App\Logic\Media\Images;
use App\Types\Main\Images as ImagesTypes;

class BlogCategoriesImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog-categories:images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Product Categories ID from 0 to Empty Img';

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
        $categories = BlogCategory::where('category_image_id', 0)->get();

        foreach ($categories as $category) {
            $image = Images::createEmpty(ImagesTypes::single_image_optimized->value, $category->id);
            $category->category_image_id = $image->id;
            $category->save();
        }
    }
}
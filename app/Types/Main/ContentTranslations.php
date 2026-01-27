<?php
namespace App\Types\Main;

enum ContentTranslations: string
{
    case cms_collection = 'cms_collection';
    case cms_content = 'cms_content';
    
    case meta_data = 'meta_data';
    case translations = 'translations';
    
    //blogs
    case blog_entry = 'blog_entry';
    case blog_category = 'blog_category';
    
    //expenses
    case expenses = 'expenses';
    case expenses_items = 'expenses_items';
}
<?php
namespace App\Schema;

class Main
{
    public static function get($schema){
    /*
    |--------------------------------------------------------------------------
    |                             profile
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="profile"> 
    $table = $schema->createTable('profile');
    $table->addOption('comment','User\'s profile');
    $table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
    $table->addOption('engine','InnoDB'); 
    $table->addOption('charset','utf8');//utf8mb4

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

       
    $table->addColumn('user_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'User\'s id']);
    $table->addColumn('avatar_image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'User\'s avatar image']);

    $table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s name']);
    $table->addColumn('surname', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s surname']);
    $table->addColumn('contact_email', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Contact email']);
    
    $table->addColumn('completed', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Is profile completed']);

    $table->setPrimaryKey(['id']);
    $table->addIndex(['user_id'],'idx_user_id');
    $table->addIndex(['avatar_image_id'], 'idx_avatar_image_id');
    //</editor-fold>
    
    
    /*
    |--------------------------------------------------------------------------
    |                             products
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="products"> 
    $table = $schema->createTable('products');
    $table->addOption('comment', 'Products');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    
    $table->addColumn('product_price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => true, 'default' => 0, 'comment' => 'Original price']);
    $table->addColumn('product_discount', 'decimal', ['precision' => 5, 'scale' => 2, 'notnull' => true, 'default' => 0,'comment' => 'Discount in percent']);

    
    $table->addColumn('image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Image id']);
    $table->addColumn('active', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Active']);
    $table->addColumn('top_seller', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Top seller']);

    $table->addColumn('categories', 'text', ['notnull' => false, 'default' => null, 'comment' => '[category_id],[category_id]']);   

    $table->addColumn('pinned', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Pinned']);
    
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             specifications
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="specifications"> 
    $table = $schema->createTable('specifications');
    $table->addOption('comment', 'Product variants');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    $table->addColumn('product_id', 'integer', ['unsigned' => true, 'notnull' => true, 'comment' => 'Product ID']);

    $table->setPrimaryKey(['id']);
    //</editor-fold>

    /*
    |--------------------------------------------------------------------------
    |                             product_sizes
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="product_sizes"> 
    $table = $schema->createTable('product_sizes');
    $table->addOption('comment', 'Product sizes');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    $table->addColumn('product_id', 'integer', ['unsigned' => true, 'notnull' => true, 'comment' => 'Product ID']);
    $table->addColumn('product_size', 'string', ['unsigned' => true, 'notnull' => true, 'comment' => 'Product size']);

    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             brands
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="brands"> 
    $table = $schema->createTable('brands');
    $table->addOption('comment', 'Product brands');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    $table->addColumn('brand_name', 'string', ['unsigned' => true, 'notnull' => true, 'comment' => 'Brand name']);
    $table->addColumn('image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Image id']);
    $table->addColumn('size_guide_image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Size Guide Image ID']);
    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             product_categories
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="product_categories"> 
    $table = $schema->createTable('blog_categories');
    $table->addOption('comment', 'Blog categories');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    $table->addColumn('parent_id', 'integer', ['unsigned' => true, 'notnull'=> false, 'default' => null, 'comment'=>'Item\'s position']);
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->addColumn('category_image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Category image id']);
    
    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             omniva_packages
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="omniva_packages"> 
    $table = $schema->createTable('omniva_packages');
    $table->addOption('comment', 'Omniva packages');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    
    $table->addColumn('ZIP', 'integer', ['unsigned' => true, 'notnull'=> false, 'default' => null, 'comment'=>'Omniva ZIP']);
    $table->addColumn('NAME', 'string', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Omnivas name']);
    $table->addColumn('A0_NAME', 'string', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Omnivas country name']);
    
    $table->setPrimaryKey(['id']);
    //</editor-fold>

    
    
    /*
    |--------------------------------------------------------------------------
    |                             orders
    |--------------------------------------------------------------------------
    */
    //<editor-fold defaultstate="collapsed" desc="orders">
    $table = $schema->createTable('orders');
    $table->addOption('comment', 'Order');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB');
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

    $table->addColumn('user_id', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'User ID']);
    $table->addColumn('numeration', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Order numeration']);
    $table->addColumn('order_status', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Order status']);
    $table->addColumn('payment_type', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Order payment type']);
    $table->addColumn('shipping_type', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Order shipping type']);
    $table->addColumn('payment_reference_number', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Payment reference number']);

    $table->addColumn('total', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull'=> true, 'default' => '0.00', 'comment'=>'Product active price with vat']);
    $table->addColumn('shipping_price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull'=> true, 'default' => '0.00', 'comment'=>'Shipping price']);

    $table->addColumn('first_name', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'First name']);
    $table->addColumn('surname', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Surname']);
    $table->addColumn('email', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Email']);
    $table->addColumn('phone', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Phone number']);
    $table->addColumn('company_name', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Company name']);
    $table->addColumn('reg_nr', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Registration number']);
    $table->addColumn('vat_nr', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'VAT number']);
    $table->addColumn('country', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Country']);
    $table->addColumn('postal_code', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Postal code']);
    $table->addColumn('address', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Address']);
    $table->addColumn('other_address', 'boolean', ['notnull'=> false, 'default' => null, 'comment'=>'Has different delivery address']);
    $table->addColumn('delivery_country', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Delivery country']);
    $table->addColumn('delivery_address', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Delivery address']);
    $table->addColumn('delivery_postal_code', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Delivery postal code']);

    $table->addColumn('order_data', 'text', ['notnull'=> false, 'default' => null, 'comment'=>'Product data in JSON']);

    $table->addColumn('sent_sms_status', 'boolean', ['notnull'=> true, 'default' => false, 'comment'=>'SMS Status']);
    $table->addColumn('sent_email_status', 'boolean', ['notnull'=> true, 'default' => false, 'comment'=>'Email Status']);
    $table->addColumn('recived_email_status', 'boolean', ['notnull'=> true, 'default' => false, 'comment'=>'Email Status']);
    $table->addColumn('recived_sms_status', 'boolean', ['notnull'=> true, 'default' => false, 'comment'=>'SMS Status']);

    $table->addColumn('courier_company', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Courier company']);
    $table->addColumn('tracking_number', 'string', ['notnull'=> false, 'default' => null, 'comment'=>'Tracking number']);

    $table->setPrimaryKey(['id']);
    //</editor-fold> 
    
    return $schema;
    } 
}

    
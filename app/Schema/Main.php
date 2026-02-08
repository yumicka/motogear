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
    
    //Added
    $table->addColumn('product_price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => true, 'default' => 0, 'comment' => 'Original price']);
    $table->addColumn('product_discount', 'decimal', ['precision' => 5, 'scale' => 2, 'notnull' => true, 'default' => 0,'comment' => 'Discount in percent']);
//    $table->addColumn('calculated_price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => true, 'default' => 0, 'comment' => 'Calculated price']);    

    $table->addColumn('image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Image id']);
    $table->addColumn('active', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Active']);
    $table->addColumn('categories', 'text', ['notnull' => false, 'default' => null, 'comment' => '[category_id],[category_id]']);    
    $table->addColumn('pinned', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Pinned']);
    
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    
    /*
    |--------------------------------------------------------------------------
    |                             product_specs
    |--------------------------------------------------------------------------
    */
    $table = $schema->createTable('product_specs');
    $table->addOption('comment', 'Product specifications');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB');
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    $table->addColumn('id', 'integer', [
        'unsigned' => true,
        'notnull' => true,
        'autoincrement' => true
    ]);

    $table->addColumn('created_at', 'datetime', [
        'notnull' => false,
        'default' => null,
        'comment' => 'Created timestamp'
    ]);

    $table->addColumn('updated_at', 'datetime', [
        'notnull' => false,
        'default' => null,
        'comment' => 'Updated timestamp'
    ]);

    //saistiba šeit !!
    $table->addColumn('product_id', 'integer', [
        'unsigned' => true,
        'notnull' => true,
        'comment' => 'FK to products.id'
    ]);

    $table->addColumn('rotational_force_protection', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Rotational Force Protection'
    ]);

    $table->addColumn('intercom', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Intercom ready'
    ]);

    $table->addColumn('product_weight', 'decimal', [
        'precision' => 10,
        'scale' => 2,
        'notnull' => false,
        'default' => null,
        'comment' => 'Weight in grams or kg'
    ]);

    $table->addColumn('product_type', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Product type'
    ]);

    $table->addColumn('closure', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Closure type'
    ]);

    $table->addColumn('ride_style', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Ride style'
    ]);

    $table->addColumn('material', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Material'
    ]);

    $table->addColumn('sunvisor', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Has sunvisor'
    ]);

    $table->addColumn('colour', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Colour'
    ]);

    $table->addColumn('removable_lining', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Removable lining'
    ]);

    $table->addColumn('pinlock', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Pinlock ready'
    ]);

    $table->addColumn('brand', 'string', [
        'length' => 255,
        'notnull' => false,
        'default' => null,
        'comment' => 'Brand'
    ]);

    $table->addColumn('emergency_release_system', 'boolean', [
        'notnull' => true,
        'default' => 0,
        'comment' => 'Emergency Release System'
    ]);

    $table->setPrimaryKey(['id']);

    /*
    |--------------------------------------------------------------------------
    |                             blog_categories
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="blog_categories"> 
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

    $table->setPrimaryKey(['id']);
    //</editor-fold>
    

        return $schema;
    }
}

    
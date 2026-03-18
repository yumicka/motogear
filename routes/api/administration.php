<?php

Route::group(['prefix' => 'users'], function (){

    Route::post('search', 'UsersController@search');
    Route::post('actions', 'UsersController@actions');

});

Route::group(['prefix' => 'meta_data'], function () {
    
    Route::post('search','MetaDataController@search');
    Route::post('actions','MetaDataController@actions');
    
});

Route::group(['prefix' => 'translations'], function () {
    
    Route::post('search','TranslationsController@search');
    Route::post('actions','TranslationsController@actions');
    
});

Route::group(['prefix' => 'settings'], function () {
    
    Route::post('actions','SettingsController@actions');
    
});

# ========================================================================#
#
#                           Products
#    
# ========================================================================#    

Route::group(['namespace' => 'BlogEntries', 'prefix' => 'blog'], function () {
 
    Route::post('search', 'BlogEntriesController@search');
    Route::post('actions', 'BlogEntriesController@actions');
    
    Route::group(['prefix' => 'categories'], function () {
        Route::post('search', 'BlogCategoriesController@search');
        Route::post('actions', 'BlogCategoriesController@actions');
     
    });
    
    Route::group(['prefix' => 'delivery'], function () {
        Route::post('search', 'DeliveryCompaniesController@search');
        Route::post('actions', 'DeliveryCompaniesController@actions');
    });
    
    Route::group(['prefix' => 'orders'], function () {
        Route::post('search', 'OrderAdmController@search');
        Route::post('actions', 'OrderAdmController@actions');
    });
    
    Route::group(['prefix' => 'brands'], function () {
        Route::post('search', 'BrandsController@search');
        Route::post('actions', 'BrandsController@actions');
    });
    
    Route::group(['prefix' => 'specifications'], function () {
        Route::post('search', 'SpecificationsController@search');
        Route::post('actions', 'SpecificationsController@actions');
    });
    
    Route::group(['prefix' => 'product_sizes'], function () {
        Route::post('search', 'ProductSizeController@search');
        Route::post('actions', 'ProductSizeController@actions');
    });


});

# ========================================================================#
#
#                           Expenses
#    
# ========================================================================#    

Route::group(['namespace' => 'Expenses', 'prefix' => 'expenses'], function () {
 
    Route::post('search', 'ExpensesController@search');
    Route::post('actions', 'ExpensesController@actions');
    
    Route::group(['prefix' => 'expenses_items'], function () {

        Route::post('search', 'ExpensesItemsController@search');
        Route::post('actions', 'ExpensesItemsController@actions');

    });
});

# ========================================================================#
#
#                           ExpensesRecords
#    
# ========================================================================#    

Route::group(['prefix' => 'expenses_records'], function () {
 
    Route::post('search', 'ExpensesRecordsController@search');
    Route::post('actions', 'ExpensesRecordsController@actions');
});
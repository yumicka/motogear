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
#                           Blogs
#    
# ========================================================================#    

Route::group(['namespace' => 'BlogEntries', 'prefix' => 'blog'], function () {
 
    Route::post('search', 'BlogEntriesController@search');
    Route::post('actions', 'BlogEntriesController@actions');
    
    Route::group(['prefix' => 'categories'], function () {

        Route::post('search', 'BlogCategoriesController@search');
        Route::post('actions', 'BlogCategoriesController@actions');

    });
});

# ========================================================================#
#
#                           Blogs
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
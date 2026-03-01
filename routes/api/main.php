<?php

Route::group(['prefix' => 'contact_form'], function () {

    Route::post('send','ContactFormController@send');
    Route::post('final_send','ContactFormController@final_send');
    Route::post('contact_form','ContactFormController@contact_form'); 
    
});

Route::post('search','SearchController@search');

Route::group(['prefix' => 'registration', 'middleware' => 'guest'], function () {
    
    Route::post('actions','RegistrationController@actions');
    
});

Route::group(['prefix' => 'users', 'middleware' => 'auth'], function () {
    
    Route::post('actions','UsersController@actions');
    
});

Route::group(['prefix' => 'cookies'], function () {
    
    Route::post('actions','CookiesController@actions');
    
});

# ========================================================================#
#
#                           Blog
#    
# ========================================================================# 

Route::group(['prefix' => 'blog'], function () {

    Route::post('search', 'BlogEntriesController@search');  
    
});

# ========================================================================#
#
#                           Expenses
#    
# ========================================================================# 

Route::group(['prefix' => 'expenses'], function () {

    Route::post('search', 'ExpensesController@search');  
    
});

# ========================================================================#
#
#                           Products
#    
# ========================================================================# 

Route::group(['prefix' => 'products'], function () {
    Route::post('search', 'ProductsController@search');
    Route::post('searchByBrand', 'ProductsController@searchByBrand');

});

# ========================================================================#
#
#                           Cart
#    
# ========================================================================# 

Route::group(['prefix' => 'cart'], function () {
    Route::post('amount', 'CartController@amount');
    Route::post('actions','CartController@actions');

});

# ========================================================================#
#
#                           Omniva
#    
# ========================================================================# 

Route::group(['prefix' => 'omniva'], function () {
    Route::post('packages','OmnivaPackagesController@list');
});

# ========================================================================#
#
#                           Order
#    
# ========================================================================# 

Route::group(['prefix' => 'order'], function () {
    Route::post('actions', 'OrderController@actions');
    Route::post('pay/{order}', 'OrderController@pay');
});

# ========================================================================#
#
#                           Brands
#    
# ========================================================================# 

Route::group(['prefix' => 'brands'], function () {
    Route::post('get-by-name', 'BrandsController@getByName');
    Route::post('get-by-id', 'BrandsController@getById');
});


<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;
use App\Types\Main\OrderStatuses;

class Order extends Model
{
    /**
     * Database connection.
     *
     * @var string
     */
    protected $connection = 'main';


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';


    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;


    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];


    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'order_data' => 'array',
        'order_status' => OrderStatuses::class,
    ];    
} 
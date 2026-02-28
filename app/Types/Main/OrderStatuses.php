<?php
namespace App\Types\Main;

enum OrderStatuses: string
{
    case pending = 'pending';
    
    case payment_pending = 'payment_pending'; 
    case paid = 'paid';
    case failed = 'failed';
    case cancelled = 'cancelled';
    
    case declined = 'declined';
    case processing = 'processing';    
    case confirmed = 'confirmed';

    case shipped = 'shipped';
    case delivered = 'delivered';

    case completed = 'completed';
    case refunded = 'refunded';
}


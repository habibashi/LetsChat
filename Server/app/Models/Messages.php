<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'name',
        'chatRoom_id'
    ];

    public function chatRooms() {
        return $this->belongsTo(chatRooms::class);
    }
}

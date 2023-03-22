<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersChatRooms extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chatRoom_id'
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function chatRooms() {
        return $this->belongsTo(chatRooms::class);
    }
}

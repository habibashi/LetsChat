<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRooms extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id'
    ];

    public function usersChatRooms() {
        return $this->hasMany(users_chat_rooms::class);
    }

    public function messages() {
        return $this->hasMany(messages::class);
    }

    public function company() {
        return $this->belongsTo(company::class);
    }
}

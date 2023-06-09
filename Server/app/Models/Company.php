<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'logo',
        'active',
        'email'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function chat_room()
    {
        return $this->hasMany(ChatRooms::class);
    }
}

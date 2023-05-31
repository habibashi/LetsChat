<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeopleMessage extends Model
{
    use HasFactory;
    protected $fillable = [
        'chatRoom_id',
        'name',
        'message'
    ];

    public function chatRoom() {
        return $this->belongsTo(PeopleChatRoom::class);
    }
}

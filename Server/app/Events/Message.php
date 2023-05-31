<?php

namespace App\Events;

use App\Models\PeopleChatRoom;
use App\Models\PeopleMessage;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $message;

    public function __construct(PeopleMessage $message)
    {
        $this->message = $message;
    }
    public function broadcastOn()
    {
        $chatRoomId = $this->message->chatRoom_id;
        $users = PeopleChatRoom::find($chatRoomId)->users;

        $channels = [];
        foreach ($users as $user) {
            $channels[] = new PrivateChannel('private-chat.' . $user->id);
        }

        event(new PeopleMessage());
        return $channels;
    }
}

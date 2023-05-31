<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Models\ChatRooms;
use App\Models\User;
use App\Models\Company;
use App\Models\Messages;
use App\Models\PeopleMessage;
use App\Models\PeopleChatRoom;
use App\Models\UsersChatRooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

class ChatController extends Controller
{   
    public function AdminGroups() {
        return Company::all();
    }

    public function AdminUsers() {
        return User::all();
    }

    public function AdminPeople() {
        $users = User::query()
            ->when(request('search'), function($query) {
                $query->where('name', 'LIKE', '%' . request('search') . '%')
                 ->orWhere('email', 'LIKE', '%' . request('search') . '%');
            })
            ->paginate();

        return response()->json([$users], 201);
    }

    public function People(){
    $user = Auth::user();

    $users = User::query()
        ->when(request('search'), function($query) {
            $query->where('name', 'LIKE', '%' . request('search') . '%')
                 ->orWhere('email', 'LIKE', '%' . request('search') . '%');
        })
        ->where('company_id', '=', $user->company_id) // add the condition to filter by company_id
        ->paginate();

    return response()->json([$users], 201);
    }

    public function index($user1Id, $user2Id) {
        $user1 = User::find($user1Id);
        $user2 = User::find($user2Id);

        $chatRoom = $user1->chatRooms()->where('user2_id', $user2->id)->first();

        if ($chatRoom) {
            $messages = $chatRoom->messages;
        } else {
            $messages = [];
        }

        return response()->json($messages);
    }

    public function peopleRooms(){
        $authUserId = auth()->user()->id;

        $rooms = PeopleChatRoom::join('users AS user1', 'people_chat_rooms.user1_id', '=', 'user1.id')
            ->join('users AS user2', 'people_chat_rooms.user2_id', '=', 'user2.id')
            ->where(function ($query) use ($authUserId) {
                $query->where('people_chat_rooms.user1_id', $authUserId)
                    ->orWhere('people_chat_rooms.user2_id', $authUserId);
            })
            ->select('people_chat_rooms.id', 'people_chat_rooms.created_at', 'people_chat_rooms.updated_at',
                'user1.id AS user1_id', 'user1.name AS user1_name', 'user1.email AS user1_email', 'user1.photo AS user1_photo',
                'user2.id AS user2_id', 'user2.name AS user2_name', 'user2.email AS user2_email', 'user2.photo AS user2_photo')
            ->get();

        $formattedRooms = [];

        foreach ($rooms as $room) {
            $otherUserId = ($room->user1_id == $authUserId) ? $room->user2_id : $room->user1_id;
            $otherUserName = ($room->user1_id == $authUserId) ? $room->user2_name : $room->user1_name;
            $otherUserEmail = ($room->user1_id == $authUserId) ? $room->user2_email : $room->user1_email;
            $otherUserPhoto = ($room->user1_id == $authUserId) ? $room->user2_photo : $room->user1_photo;

            $roomData = [
                'id' => $room->id,
                'created_at' => $room->created_at,
                'updated_at' => $room->updated_at,
                'users' => [
                    [
                        'id' => $authUserId,
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email,
                        'photo' => auth()->user()->photo,
                    ],
                    [
                        'id' => $otherUserId,
                        'name' => $otherUserName,
                        'email' => $otherUserEmail,
                        'photo' => $otherUserPhoto,
                    ],
                ],
            ];

            $formattedRooms[] = $roomData;
        }

        return $formattedRooms;
    }

    public function PeopleChatPage($roomId){
        $authUserId = Auth::id();
    
        $room = PeopleChatRoom::join('users AS user1', 'people_chat_rooms.user1_id', '=', 'user1.id')
            ->join('users AS user2', 'people_chat_rooms.user2_id', '=', 'user2.id')
            ->where(function ($query) use ($authUserId, $roomId) {
                $query->where(function ($query) use ($authUserId) {
                    $query->where('people_chat_rooms.user1_id', $authUserId)
                        ->orWhere('people_chat_rooms.user2_id', $authUserId);
                })
                ->where('people_chat_rooms.id', $roomId);
            })
            ->select('people_chat_rooms.id', 'people_chat_rooms.created_at', 'people_chat_rooms.updated_at',
                'user1.id AS user1_id', 'user1.name AS user1_name', 'user1.email AS user1_email', 'user1.photo AS user1_photo',
                'user2.id AS user2_id', 'user2.name AS user2_name', 'user2.email AS user2_email', 'user2.photo AS user2_photo')
            ->first();
    
        $messages = PeopleMessage::where('chatRoom_id', $roomId)->get();
    
        $formattedRoom = null;
    
        if ($room) {
            $otherUserId = ($room->user1_id == $authUserId) ? $room->user2_id : $room->user1_id;
            $otherUserName = ($room->user1_id == $authUserId) ? $room->user2_name : $room->user1_name;
            $otherUserEmail = ($room->user1_id == $authUserId) ? $room->user2_email : $room->user1_email;
            $otherUserPhoto = ($room->user1_id == $authUserId) ? $room->user2_photo : $room->user1_photo;
    
            $formattedRoom = [
                'id' => $room->id,
                'created_at' => $room->created_at,
                'updated_at' => $room->updated_at,
                'users' => [
                    [
                        'id' => $authUserId,
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email,
                        'photo' => auth()->user()->photo,
                    ],
                    [
                        'id' => $otherUserId,
                        'name' => $otherUserName,
                        'email' => $otherUserEmail,
                        'photo' => $otherUserPhoto,
                    ],
                ],
                'messages' => $messages
            ];
        }
    
        return $formattedRoom;
    }

    public function createMessage(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required',
            'message' => 'required',
            'chatRoom_id' => 'required',
        ]);

        PeopleMessage::create([
            'name' => $attributes['name'],
            'message' => $attributes['message'],
            'chatRoom_id' => $attributes['chatRoom_id'],
        ]);

        return response()->json(['success' => true]);
    }

    public function GroupChatPage($roomId) {
        $authUserId = Auth::id();

        $room = ChatRooms::join('users_chat_rooms AS ucr', 'chat_rooms.id', '=', 'ucr.chatRoom_id')
            ->join('users', 'ucr.user_id', '=', 'users.id')
            ->where('ucr.chatRoom_id', $roomId)
            ->whereIn('ucr.user_id', function ($query) use ($roomId,$authUserId) {
                $query->select('user_id')
                    ->from('users_chat_rooms')
                    ->where('chatRoom_id', $roomId)
                    ->where('user_id', '=', $authUserId);
            })
            ->select('chat_rooms.id', 'chat_rooms.created_at', 'chat_rooms.updated_at',
                'users.id AS user_id', 'users.name', 'users.email', 'users.photo')
            ->first();

        $messages = Messages::where('chatRoom_id', $roomId)
            ->select('id', 'message', 'name')
            ->get();

        $formattedRoom = null;

        if ($room) {
            $formattedRoom = [
                'id' => $room->id,
                'created_at' => $room->created_at,
                'updated_at' => $room->updated_at,
                'users' => $room,
                'messages' => $messages
            ];
        }

        return $formattedRoom;
    }

    public function createGroupMessage(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required',
            'message' => 'required',
            'chatRoom_id' => 'required',
        ]);

        Messages::create([
            'name' => $attributes['name'],
            'message' => $attributes['message'],
            'chatRoom_id' => $attributes['chatRoom_id'],
        ]);

        return response()->json(['message' => true]);
    }

    


}

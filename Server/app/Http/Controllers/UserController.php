<?php

namespace App\Http\Controllers;

use App\Models\ChatRooms;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PeopleChatRoom;
use App\Models\UsersChatRooms;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function User(Request $request) {
        $userId = $request->route('id');
        return User::find($userId);
    }
    
    public function GetUsers() {
        return User::all();
    }

    public function GetActiveUsers() {
        $id = Auth::user()->company_id;
        return User::where('company_id', $id)->get();
    }

    public function createAccount(Request $request)
{
    $formFields = $request->validate([
        'name' => ['required', 'min:3'],
        'email' => ['required', 'string', 'email', 'unique:users,email'],
        'password' => ['required', 'string', 'confirmed', 'min:8'],
        'gender' => ['required'],
        'job_title' => ['required'],
        'started_working_on' => ['required'],
        'role' => ['required'],
        'company_id' => ['required'],
    ]);

    try {
        DB::beginTransaction();
        // Create user
        $user = User::create([
            'name' => $formFields['name'],
            'email' => $formFields['email'],
            'password' => bcrypt($formFields['password']),
            'gender' => $formFields['gender'],
            'job_title' => $formFields['job_title'],
            'started_working_on' => $formFields['started_working_on'],
            'role' => $formFields['role'],
            'company_id' => $formFields['company_id'],
        ]);

        $users = User::where('company_id', $formFields['company_id'])->get();

        $rooms = ChatRooms::where('company_id', $formFields['company_id'])->get();
        
        foreach ($users as $getUser) {
            if ($user->id != $getUser->id) {
                PeopleChatRoom::create([
                    'user1_id' => $getUser->id,
                    'user2_id' => $user->id
                ]);

                
            }
        }
        foreach ($rooms as $room) {
                UsersChatRooms::create([
                    'user_id' => $user->id,
                    'chatRoom_id' => $room->id
                ]);
        }
        
        DB::commit();

        return response()->json(['message' => 'User created successfully'], 201);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['message' => 'User creation failed'], 500);
    }
}


    // login 
    public function Login(Request $request) {
        $formFields = $request->validate([
            'email' => 'required|string',
            'password' => 'required'
        ]);
        $user = User::where('email', $formFields['email'])->first();

        
        if (!$user || !Hash::check($formFields['password'], $user->password)) {
            return response([
                'message' => 'Incorrect email or password'
            ], 400);
        }

        if ($user->role == 'employee' AND $user->company->active == '0'){
            return response([
                'message' => 'Your Company is Deactivated'
            ], 400);
        }

        if ($user->role == 'employee' AND $user->active == '0'){
            return response([
                'message' => 'Your account is Deactivated'
            ], 400);
        }

        return $this->createTokenResponse($user);
    }

    private function createTokenResponse(User $user){
        $token = $user->createToken('token')->plainTextToken;

        return response([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'photo' => $user->photo,
            'company_id' => $user->company_id,
            'job_title' => $user->job_title,
            'token' => $token
        ], 201);
    }

    public function EditProfile(Request $request) {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $editData->name = $request->name;
        $editData->email = $request->email;
        $editData->gender = $request['gender'];
        $editData->job_title = $request->job_title;
        $editData->photo = $request->photo;
        
        if (!Hash::check($request['currPass'], $editData->password)){
            return response([
                'message' => 'Incorrect curr password'
            ], 400);
        }
        
        $formFields = $request->validate([
            'newPass' => ['required', 'string', 'confirmed', 'min:8'],
        ]);

        $editData->password = bcrypt($formFields['newPass']);

        $editData->save();
        

        return response()->json(['message' => 'Profile Changed successfully'], 201);
    }
}

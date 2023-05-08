<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function GetUsers() {
        return User::all();
    }

    public function GetActiveUsers() {
        $id = Auth::user()->company_id;

        return User::where('company_id', $id)->get();
    }

    // Create Accounts
    public function createAccount(Request $request) {
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
        // Create user
        User::create([
            'name' => $formFields['name'],
            'email' => $formFields['email'],
            'password' => bcrypt($formFields['password']),
            'gender' => $formFields['gender'],
            'job_title' => $formFields['job_title'],
            'started_working_on' => $formFields['started_working_on'],
            'role' => $formFields['role'],
            'company_id' => $formFields['company_id'],
        ]);
        return response()->json(['message' => 'User created successfully'], 201);
    }

    // login 
    public function Login(Request $request) {
        $formFields = $request->validate([
            'email' => 'required|string',
            'password' => 'required'
        ]);
        //->with('company')
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
        
        if (Hash::check($request['currPass'], $editData->password)){
            // Perform actions if current password matches
        }
        
        $formFields = $request->validate([
            'newPass' => ['required', 'string', 'confirmed', 'min:8'],
        ]);

        $editData->password = bcrypt($formFields['newPass']);

        $editData->save();
        

        return response()->json(['message' => 'Profile Changed successfully'], 201);
    }
}

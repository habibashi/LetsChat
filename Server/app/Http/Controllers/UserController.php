<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // public function register(Request $request) {
    //     $formFields = $request->validate([
    //         'name' => ['required', 'min:3'],
    //         'email' => ['required', 'string', 'email', 'unique:users,email'],
    //         'password' => ['required', 'string', 'confirmed', 'min:8'],
    //     ]);

    //     // Create user
    //     $user = User::create([  
    //         'name' => $formFields['name'],
    //         'email' => $formFields['email'],
    //         'password' => bcrypt($formFields['password']),
    //     ]);

    //     return $this->createTokenResponse($user);
    // }

    public function login(Request $request) {
        // dd($request());
        $formFields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $formFields['email'])->first();

        // || !Hash::check($formFields['password'], $user->password)
        if (!$user) {
            return response([
                'message' => 'Incorrect email or password'
            ], 400);
        }

        if ($user->role == 'employee' AND $user->company->active == '0'){
            return response([
                'message' => 'Your Company is Deactivated'
            ], 400);
        }

        return $this->createTokenResponse($user);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response(["message" => 'Logged out'], 200);
    }



    private function createTokenResponse(User $user)
    {
        $token = $user->createToken('token')->plainTextToken;

        return response([
            'name' => $user->name,
            'email' => $user->email,
            'token' => $token
        ], 201);
    }
}

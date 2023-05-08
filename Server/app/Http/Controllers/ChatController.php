<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{   
    public function AdminGroups() {
        return Company::all();
    }

    public function AdminUsers() {
        return User::all();
    }

    public function EmployeeManagerUsers() {
        $id = Auth::user()->company_id;
        return User::where('company_id', $id)->get();
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
    $user = Auth::user(); // get the authenticated user

    $users = User::query()
        ->when(request('search'), function($query) {
            $query->where('name', 'LIKE', '%' . request('search') . '%')
                 ->orWhere('email', 'LIKE', '%' . request('search') . '%');
        })
        ->where('company_id', '=', $user->company_id) // add the condition to filter by company_id
        ->paginate();

    return response()->json([$users], 201);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\ChatRooms;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function ActiveCompany(Request $request)
    {
        $editActive = $request->validate([
            'company_id' => ['required'],
            'active' => ['required']
        ]);

        $query = Company::where('id', $editActive['company_id'])->first();

        $query->active = $editActive['active'];
        $query->save();

        return response()->json(['message' => 'activated Company created successfully'], 201);

    }

    public function ActiveUsers(Request $request) {
        $id = Auth::user()->company_id;
        $editActive = $request->validate([
            'user_id' => ['required'],
            'active' => ['required']
        ]);

        $query = User::where('id', $editActive['user_id'])->where('company_id', $id)->first();

        $query->active = $editActive['active'];
        $query->save();

        return response()->json(['message' => 'activated Company created successfully'] , 201);
    }

    public function GetGroupCompany() {
        $id = auth()->user()->company_id;

        return ChatRooms::join('companies', 'chat_rooms.company_id', '=', 'companies.id')
        ->where('companies.id', $id)
        ->select('chat_rooms.id', 'companies.name', 'companies.email', 'companies.logo')
        ->get();
    }

    public function EditCompany(Request $request) {
        $id = Auth::user()->company_id;
        $editData = Company::find($id);
        $editData->name = $request->name;
        $editData->email = $request->email;
        $editData->description = $request->description;
        $editData->logo = $request->logo;
        
        $editData->save();
        return response()->json(['message' => 'Company created successfully'], 201);
    }

    public function GetAllCompany() {
        return Company::all();
    }

    public function CreateCompany(Request $request)
    {
        $id = Auth::user()->id;
        $editData = User::find($id);
        if ($editData->role !== 'admin') {
            return "Sorry, this account must be an Admin";
        }

        $formFields = $request->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required'],
            'logo' => ['required'],
            'active' => ['required'],
            'email' => ['required', 'string', 'email', 'unique:companies,email'],
        ]);

        try {
            DB::beginTransaction();

            // Create Company
            $company = Company::create([
                'name' => $formFields['name'],
                'description' => $formFields['description'],
                'logo' => $formFields['logo'],
                'active' => $formFields['active'],
                'email' => $formFields['email']
            ]);

            // Create Chat Rooms for the Company
            ChatRooms::create([
                'company_id' => $company->id
            ]);

            DB::commit();

            return response()->json(['message' => 'Company created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Company creation failed'], 500);
        }
    }

}

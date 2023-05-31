<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public Routes
Route::post('/users/login', [UserController::class, 'Login']);
// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Admin
    Route::post('/createAccount', [UserController::class, 'CreateAccount']);
    Route::post('/createCompany', [CompanyController::class, 'CreateCompany']);
    Route::get('/getAllCompany', [CompanyController::class, 'GetAllCompany']);
    Route::put('/activeCompany', [CompanyController::class, 'ActiveCompany']);
    // Manager
    Route::put('/editCompany', [CompanyController::class, 'EditCompany']);
    Route::get('/getActiveUsers', [UserController::class, 'GetActiveUsers']);
    Route::put('/activeUsers', [CompanyController::class, 'ActiveUsers']);
    // Profile
    Route::put('/editProfile', [UserController::class, 'EditProfile']);
    // Chat
    Route::get('/adminPeople', [ChatController::class, 'AdminPeople']); 
    Route::get('/people', [ChatController::class, 'People']);
    Route::get('/adminGroups', [ChatController::class, 'AdminGroups']);
    Route::get('/getGroupCompany', [CompanyController::class, 'GetGroupCompany']);
    Route::get('/adminUsers', [ChatController::class, 'AdminUsers']);
    Route::get('/employeeManagerUsers', [ChatController::class, 'EmployeeManagerUsers']);
    Route::get('/peopleRooms', [ChatController::class, 'peopleRooms']);
    Route::get('/adminPeopleRooms', [ChatController::class, 'AdminPeopleRooms']);
    Route::get('/peopleChatPage/{roomId}', [ChatController::class, 'PeopleChatPage']);
    Route::post('/message', [ChatController::class, 'CreateMessage']);
    Route::post('/createGroupMessage', [ChatController::class, 'createGroupMessage']);
    Route::get('groupChatPage/{id}', [ChatController::class, 'GroupChatPage']);
    Route::get('/user/{id}', [UserController::class, 'User']);
    
    Route::post('/pusher/auth', [ChatController::class, 'auth']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


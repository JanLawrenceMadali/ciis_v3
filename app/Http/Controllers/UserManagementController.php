<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::get();
        return inertia('user-management/index', [
            'users' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ];
            }),
        ]);
    }

    public function updateStatus(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $user->update([
            'status' => $request->status,
        ]);

        return to_route('user-management')->with(['success' => 'User status updated successfully.']);
    }
}

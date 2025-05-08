<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Liste tous les admins avec les infos utilisateur
    public function index()
    {
        $admins = Admin::with('user')->get();
        return response()->json($admins, 200);
    }

    // Crée un nouvel admin (utilisateur + entrée admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Créer l'admin lié à l'utilisateur
        $admin = Admin::create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Admin created successfully',
            'data' => [
                'user' => $user,
                'admin' => $admin,
            ]
        ], 201);
    }

    // Afficher un admin
    public function show($id)
    {
        $admin = Admin::with('user')->find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        return response()->json($admin, 200);
    }

    // Mise à jour des infos utilisateur liées à l'admin
    public function update(Request $request, $id)
    {
        $admin = Admin::with('user')->find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $admin->user_id,
            'password' => 'sometimes|string|min:8',
        ]);

        $user = $admin->user;

        if (isset($validated['name'])) $user->name = $validated['name'];
        if (isset($validated['email'])) $user->email = $validated['email'];
        if (isset($validated['password'])) $user->password = Hash::make($validated['password']);

        $user->save();

        return response()->json([
            'message' => 'Admin updated successfully',
            'data' => $admin->load('user')
        ], 200);
    }

    // Supprimer un admin (et potentiellement son utilisateur)
    public function destroy($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        $admin->user()->delete(); // Supprime l'utilisateur associé (cascade)
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully'], 200);
    }
}

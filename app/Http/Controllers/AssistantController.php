<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assistant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AssistantController extends Controller
{
    public function index()
    {
        $assistants = Assistant::with('user')->get();
        return response()->json($assistants, 200);
    }

    public function store(Request $request)
    {
        // Valider les données
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

        // Vérifier si l'utilisateur a été créé avec succès
        if (!$user) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }

        // Créer l'assistant lié à l'utilisateur
        $assistant = Assistant::create([
            'user_id' => $user->id,
        ]);

        // Vérifier si l'assistant a été créé avec succès
        if (!$assistant) {
            return response()->json(['message' => 'Failed to create assistant'], 500);
        }

        return response()->json([
            'message' => 'Assistant created successfully',
            'data' => [
                'user' => $user,
                'assistant' => $assistant,
            ]
        ], 201);
    }

    public function show($id)
    {
        $assistant = Assistant::with('user')->find($id);

        if (!$assistant) {
            return response()->json(['message' => 'Assistant not found'], 404);
        }

        return response()->json($assistant, 200);
    }

    public function update(Request $request, $id)
    {
        $assistant = Assistant::with('user')->find($id);

        if (!$assistant) {
            return response()->json(['message' => 'Assistant not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $assistant->user_id,
            'password' => 'sometimes|string|min:8',
        ]);

        $user = $assistant->user;

        if (isset($validated['name'])) $user->name = $validated['name'];
        if (isset($validated['email'])) $user->email = $validated['email'];
        if (isset($validated['password'])) $user->password = Hash::make($validated['password']);

        $user->save();

        return response()->json([
            'message' => 'Assistant updated successfully',
            'data' => $assistant->load('user')
        ], 200);
    }

    public function destroy($id)
    {
        $assistant = Assistant::find($id);

        if (!$assistant) {
            return response()->json(['message' => 'Assistant not found'], 404);
        }

        $assistant->user()->delete(); // Supprime l'utilisateur associé (cascade)
        $assistant->delete();

        return response()->json(['message' => 'Assistant deleted successfully'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Teacher;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    // Liste tous les enseignants avec leur utilisateur
    public function index()
    {
        $teachers = Teacher::with('user')->get();
        return response()->json($teachers, 200);
    }

    // Crée un nouvel enseignant
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

        // Créer le teacher lié à l'utilisateur
        $teacher = Teacher::create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Teacher created successfully',
            'data' => [
                'user' => $user,
                'teacher' => $teacher,
            ]
        ], 201);
    }

    // Afficher un enseignant spécifique
    public function show($id)
    {
        $teacher = Teacher::with('user')->find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        return response()->json($teacher, 200);
    }

    // Mise à jour de l'utilisateur lié à l'enseignant
    public function update(Request $request, $id)
    {
        $teacher = Teacher::with('user')->find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $teacher->user_id,
            'password' => 'sometimes|string|min:8',
        ]);

        $user = $teacher->user;

        if (isset($validated['name'])) $user->name = $validated['name'];
        if (isset($validated['email'])) $user->email = $validated['email'];
        if (isset($validated['password'])) $user->password = Hash::make($validated['password']);

        $user->save();

        return response()->json([
            'message' => 'Teacher updated successfully',
            'data' => $teacher->load('user')
        ], 200);
    }

    // Supprimer un enseignant (et l'utilisateur lié)
    public function destroy($id)
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $teacher->user()->delete(); // Supprime aussi l'utilisateur
        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    }
}

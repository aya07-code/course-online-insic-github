<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    // Liste tous les étudiants avec leur utilisateur
    public function index()
    {
        $students = Student::with('user')->get();
        return response()->json($students, 200);
    }

    // Crée un nouvel étudiant
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

        // Créer le student lié à l'utilisateur
        $student = Student::create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Student created successfully',
            'data' => [
                'user' => $user,
                'student' => $student,
            ]
        ], 201);
    }

    // Afficher un étudiant spécifique
    public function show($id)
    {
        $student = Student::with('user')->find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student, 200);
    }

    // Mise à jour de l'utilisateur lié à l'étudiant
    public function update(Request $request, $id)
    {
        $student = Student::with('user')->find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $student->user_id,
            'password' => 'sometimes|string|min:8',
        ]);

        $user = $student->user;

        if (isset($validated['name'])) $user->name = $validated['name'];
        if (isset($validated['email'])) $user->email = $validated['email'];
        if (isset($validated['password'])) $user->password = Hash::make($validated['password']);

        $user->save();

        return response()->json([
            'message' => 'Student updated successfully',
            'data' => $student->load('user')
        ], 200);
    }

    // Supprimer un étudiant (et l'utilisateur lié)
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->user()->delete(); // Supprime aussi l'utilisateur
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully'], 200);
    }
}

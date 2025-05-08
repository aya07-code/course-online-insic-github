<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserQuiz;

class UserQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les UserQuiz avec leurs relations
        $userQuizzes = UserQuiz::with(['user', 'quiz'])->get();
        return response()->json($userQuizzes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'quiz_id' => 'required|exists:quizzes,id',
            'score' => 'required|integer|min:0',
        ]);

        // Créer un nouveau UserQuiz
        $userQuiz = UserQuiz::create($validatedData);

        return response()->json([
            'message' => 'UserQuiz created successfully',
            'data' => $userQuiz
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver le UserQuiz par ID avec ses relations
        $userQuiz = UserQuiz::with(['user', 'quiz'])->find($id);

        if (!$userQuiz) {
            return response()->json(['message' => 'UserQuiz not found'], 404);
        }

        return response()->json($userQuiz, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver le UserQuiz par ID
        $userQuiz = UserQuiz::find($id);

        if (!$userQuiz) {
            return response()->json(['message' => 'UserQuiz not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'quiz_id' => 'sometimes|exists:quizzes,id',
            'score' => 'sometimes|integer|min:0',
        ]);

        // Mettre à jour le UserQuiz
        $userQuiz->update($validatedData);

        return response()->json([
            'message' => 'UserQuiz updated successfully',
            'data' => $userQuiz
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le UserQuiz par ID
        $userQuiz = UserQuiz::find($id);

        if (!$userQuiz) {
            return response()->json(['message' => 'UserQuiz not found'], 404);
        }

        // Supprimer le UserQuiz
        $userQuiz->delete();

        return response()->json(['message' => 'UserQuiz deleted successfully'], 200);
    }
}

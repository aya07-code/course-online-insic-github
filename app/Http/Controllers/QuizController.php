<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les quizzes avec leurs relations
        $quizzes = Quiz::with(['chapitre', 'questions', 'userQuizzes'])->get();
        return response()->json($quizzes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'chapitre_id' => 'required|exists:chapitres,id',
        ]);

        // Créer un nouveau quiz
        $quiz = Quiz::create($validatedData);

        return response()->json([
            'message' => 'Quiz created successfully',
            'data' => $quiz
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver le quiz par ID avec ses relations
        $quiz = Quiz::with(['chapitre', 'questions', 'userQuizzes'])->find($id);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        return response()->json($quiz, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver le quiz par ID
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'chapitre_id' => 'sometimes|exists:chapitres,id',
        ]);

        // Mettre à jour le quiz
        $quiz->update($validatedData);

        return response()->json([
            'message' => 'Quiz updated successfully',
            'data' => $quiz
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le quiz par ID
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        // Supprimer le quiz
        $quiz->delete();

        return response()->json(['message' => 'Quiz deleted successfully'], 200);
    }
}

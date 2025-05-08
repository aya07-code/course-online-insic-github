<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les questions avec leur quiz associé
        $questions = Question::with('quiz')->get();
        return response()->json($questions, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question' => 'required|string',
            'options' => 'required|json',
            'correct_answer' => 'required|string',
        ]);

        // Créer une nouvelle question
        $question = Question::create($validatedData);

        return response()->json([
            'message' => 'Question created successfully',
            'data' => $question
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver la question par ID avec son quiz associé
        $question = Question::with('quiz')->find($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        return response()->json($question, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver la question par ID
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'quiz_id' => 'sometimes|exists:quizzes,id',
            'question' => 'sometimes|string',
            'options' => 'sometimes|json',
            'correct_answer' => 'sometimes|string',
        ]);

        // Mettre à jour la question
        $question->update($validatedData);

        return response()->json([
            'message' => 'Question updated successfully',
            'data' => $question
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver la question par ID
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        // Supprimer la question
        $question->delete();

        return response()->json(['message' => 'Question deleted successfully'], 200);
    }
}

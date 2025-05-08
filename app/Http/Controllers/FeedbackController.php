<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les feedbacks avec leurs relations
        $feedbacks = Feedback::with(['user', 'formation'])->get();
        return response()->json($feedbacks, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'contenu' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'user_id' => 'required|exists:users,id',
            'formation_id' => 'required|exists:formations,id',
        ]);

        // Créer un nouveau feedback
        $feedback = Feedback::create($validatedData);

        return response()->json([
            'message' => 'Feedback created successfully',
            'data' => $feedback
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver le feedback par ID avec ses relations
        $feedback = Feedback::with(['user', 'formation'])->find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        return response()->json($feedback, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver le feedback par ID
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'contenu' => 'sometimes|string',
            'rating' => 'sometimes|integer|min:1|max:5',
            'user_id' => 'sometimes|exists:users,id',
            'formation_id' => 'sometimes|exists:formations,id',
        ]);

        // Mettre à jour le feedback
        $feedback->update($validatedData);

        return response()->json([
            'message' => 'Feedback updated successfully',
            'data' => $feedback
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le feedback par ID
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        // Supprimer le feedback
        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted successfully'], 200);
    }
}

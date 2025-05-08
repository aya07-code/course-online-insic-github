<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les formations avec leurs relations
        $formations = Formation::with(['category', 'paiements', 'chapitres', 'certifications', 'feedbacks', 'formationUsers'])->get();
        return response()->json($formations, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duree' => 'nullable|string|max:255',
            'categories_id' => 'required|exists:categories,id',
        ]);

        // Créer une nouvelle formation
        $formation = Formation::create($validatedData);

        return response()->json([
            'message' => 'Formation created successfully',
            'data' => $formation
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver la formation par ID avec ses relations
        $formation = Formation::with(['category', 'paiements', 'chapitres', 'certifications', 'feedbacks', 'formationUsers'])->find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        return response()->json($formation, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver la formation par ID
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'duree' => 'nullable|string|max:255',
            'categories_id' => 'sometimes|exists:categories,id',
        ]);

        // Mettre à jour la formation
        $formation->update($validatedData);

        return response()->json([
            'message' => 'Formation updated successfully',
            'data' => $formation
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver la formation par ID
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        // Supprimer la formation
        $formation->delete();

        return response()->json(['message' => 'Formation deleted successfully'], 200);
    }
}

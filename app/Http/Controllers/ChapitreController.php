<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chapitre;

class ChapitreController extends Controller
{
    /**
     * Afficher la liste de tous les chapitres.
     */
    public function index()
    {
        $chapitres = Chapitre::with(['formation', 'lessons', 'quiz'])->get();

        return response()->json([
            'success' => true,
            'data' => $chapitres
        ], 200);
    }

    /**
     * Créer un nouveau chapitre.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'formation_id' => 'required|exists:formations,id',
        ]);

        $chapitre = Chapitre::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Chapitre créé avec succès',
            'data' => $chapitre
        ], 201);
    }

    /**
     * Afficher un chapitre spécifique.
     */
    public function show($id)
    {
        $chapitre = Chapitre::with(['formation', 'lessons', 'quiz'])->find($id);

        if (!$chapitre) {
            return response()->json([
                'success' => false,
                'message' => 'Chapitre non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $chapitre
        ], 200);
    }

    /**
     * Mettre à jour un chapitre existant.
     */
    public function update(Request $request, $id)
    {
        $chapitre = Chapitre::find($id);

        if (!$chapitre) {
            return response()->json([
                'success' => false,
                'message' => 'Chapitre non trouvé'
            ], 404);
        }

        $validatedData = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'formation_id' => 'sometimes|exists:formations,id',
        ]);

        $chapitre->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Chapitre mis à jour avec succès',
            'data' => $chapitre
        ], 200);
    }

    /**
     * Supprimer un chapitre.
     */
    public function destroy($id)
    {
        $chapitre = Chapitre::find($id);

        if (!$chapitre) {
            return response()->json([
                'success' => false,
                'message' => 'Chapitre non trouvé'
            ], 404);
        }

        $chapitre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Chapitre supprimé avec succès'
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationUser;

class FormationUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les inscriptions avec leurs relations
        $formationUsers = FormationUser::with(['user', 'formation'])->get();
        return response()->json($formationUsers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'formation_id' => 'required|exists:formations,id',
            'date' => 'nullable|date',
        ]);

        // Créer une nouvelle inscription
        $formationUser = FormationUser::create($validatedData);

        return response()->json([
            'message' => 'FormationUser created successfully',
            'data' => $formationUser
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver l'inscription par ID avec ses relations
        $formationUser = FormationUser::with(['user', 'formation'])->find($id);

        if (!$formationUser) {
            return response()->json(['message' => 'FormationUser not found'], 404);
        }

        return response()->json($formationUser, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver l'inscription par ID
        $formationUser = FormationUser::find($id);

        if (!$formationUser) {
            return response()->json(['message' => 'FormationUser not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'formation_id' => 'sometimes|exists:formations,id',
            'date' => 'nullable|date',
        ]);

        // Mettre à jour l'inscription
        $formationUser->update($validatedData);

        return response()->json([
            'message' => 'FormationUser updated successfully',
            'data' => $formationUser
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver l'inscription par ID
        $formationUser = FormationUser::find($id);

        if (!$formationUser) {
            return response()->json(['message' => 'FormationUser not found'], 404);
        }

        // Supprimer l'inscription
        $formationUser->delete();

        return response()->json(['message' => 'FormationUser deleted successfully'], 200);
    }
}

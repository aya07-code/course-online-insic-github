<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paiement;

class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les paiements avec leurs relations
        $paiements = Paiement::with(['user', 'formation'])->get();
        return response()->json($paiements, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'method' => 'required|string|max:255',
            'recu' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'formation_id' => 'required|exists:formations,id',
        ]);

        // Créer un nouveau paiement
        $paiement = Paiement::create($validatedData);

        return response()->json([
            'message' => 'Paiement created successfully',
            'data' => $paiement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver le paiement par ID avec ses relations
        $paiement = Paiement::with(['user', 'formation'])->find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        return response()->json($paiement, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver le paiement par ID
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'amount' => 'sometimes|numeric|min:0',
            'date' => 'sometimes|date',
            'method' => 'sometimes|string|max:255',
            'recu' => 'nullable|string',
            'user_id' => 'sometimes|exists:users,id',
            'formation_id' => 'sometimes|exists:formations,id',
        ]);

        // Mettre à jour le paiement
        $paiement->update($validatedData);

        return response()->json([
            'message' => 'Paiement updated successfully',
            'data' => $paiement
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le paiement par ID
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        // Supprimer le paiement
        $paiement->delete();

        return response()->json(['message' => 'Paiement deleted successfully'], 200);
    }
}

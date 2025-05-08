<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Certification;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les certifications avec leurs relations
        $certifications = Certification::with(['user', 'formation'])->get();
        return response()->json($certifications, 200);
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
            'code' => 'required|string|unique:certifications,code|max:255',
        ]);

        // Créer une nouvelle certification
        $certification = Certification::create($validatedData);

        return response()->json([
            'message' => 'Certification created successfully',
            'data' => $certification
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver la certification par ID avec ses relations
        $certification = Certification::with(['user', 'formation'])->find($id);

        if (!$certification) {
            return response()->json(['message' => 'Certification not found'], 404);
        }

        return response()->json($certification, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver la certification par ID
        $certification = Certification::find($id);

        if (!$certification) {
            return response()->json(['message' => 'Certification not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'formation_id' => 'sometimes|exists:formations,id',
            'code' => 'sometimes|string|unique:certifications,code|max:255',
        ]);

        // Mettre à jour la certification
        $certification->update($validatedData);

        return response()->json([
            'message' => 'Certification updated successfully',
            'data' => $certification
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver la certification par ID
        $certification = Certification::find($id);

        if (!$certification) {
            return response()->json(['message' => 'Certification not found'], 404);
        }

        // Supprimer la certification
        $certification->delete();

        return response()->json(['message' => 'Certification deleted successfully'], 200);
    }
}

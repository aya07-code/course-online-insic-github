<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les leçons avec leurs relations
        $lessons = Lesson::with(['formation', 'chapitre'])->get();
        return response()->json($lessons, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'chapitre_id' => 'required|exists:chapitres,id',
        ]);

        // Créer une nouvelle leçon
        $lesson = Lesson::create($validatedData);

        return response()->json([
            'message' => 'Lesson created successfully',
            'data' => $lesson
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver la leçon par ID avec ses relations
        $lesson = Lesson::with(['formation', 'chapitre'])->find($id);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        return response()->json($lesson, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver la leçon par ID
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'contenu' => 'sometimes|string',
            'chapitre_id' => 'sometimes|exists:chapitres,id',
        ]);

        // Mettre à jour la leçon
        $lesson->update($validatedData);

        return response()->json([
            'message' => 'Lesson updated successfully',
            'data' => $lesson
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver la leçon par ID
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        // Supprimer la leçon
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully'], 200);
    }
}

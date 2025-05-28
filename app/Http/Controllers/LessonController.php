<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Lesson::query();

        if ($request->has('chapitre_id')) {
            $query->where('chapitre_id', $request->chapitre_id);
        }

        $lessons = $query->get();

        return response()->json([
            'success' => true,
            'data' => $lessons
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
           
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'chapitre_id' => 'required|exists:chapitres,id',
            'file' => 'required|file|mimes:pdf,mp4,avi,mov,webm,ogg,jpg,jpeg,png',
        ]);

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('lessons', 'public');
            $validatedData['file_url'] = asset('storage/' . $filePath);
            $extension = strtolower($request->file('file')->getClientOriginalExtension());
            if ($extension === 'pdf') {
                $validatedData['type'] = 'pdf';
            } elseif (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                $validatedData['type'] = 'img';
            } elseif (in_array($extension, ['mp4', 'avi', 'mov', 'webm', 'ogg'])) {
                $validatedData['type'] = 'video';
            }
        }

        $lesson = Lesson::create($validatedData);

        return response()->json([
            'message' => 'Lesson created successfully',
            'data' => $lesson
        ], 201);
    }catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating lesson',
                'error' => $e->getMessage()
            ], 500);
        }
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
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'content' => 'sometimes|string',
            'type' => 'sometimes|in:pdf,video,img',
            'chapitre_id' => 'sometimes|exists:chapitres,id',
            'file' => 'sometimes|file|mimes:pdf,mp4,avi,mov,webm,ogg,jpg,jpeg,png',
        ]);

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('lessons', 'public');
            $validatedData['file_url'] = asset('storage/' . $filePath);
            $extension = strtolower($request->file('file')->getClientOriginalExtension());
            if ($extension === 'pdf') $validatedData['type'] = 'pdf';
            elseif ($extension === 'mp4') $validatedData['type'] = 'video';
            elseif (in_array($extension, ['jpg', 'jpeg', 'png'])) $validatedData['type'] = 'img';
            // Ajoutez d'autres formats vidéo si besoin
        }

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

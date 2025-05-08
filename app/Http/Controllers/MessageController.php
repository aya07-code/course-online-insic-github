<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les messages avec leur utilisateur associé
        $messages = Message::with('user')->get();
        return response()->json($messages, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'content' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|in:read,unread',
            'user_id' => 'required|exists:users,id',
        ]);

        // Créer un nouveau message
        $message = Message::create($validatedData);

        return response()->json([
            'message' => 'Message created successfully',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver le message par ID avec son utilisateur associé
        $message = Message::with('user')->find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        return response()->json($message, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver le message par ID
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'content' => 'sometimes|string',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:read,unread',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        // Mettre à jour le message
        $message->update($validatedData);

        return response()->json([
            'message' => 'Message updated successfully',
            'data' => $message
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le message par ID
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        // Supprimer le message
        $message->delete();

        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
}

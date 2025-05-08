<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les notifications avec leur utilisateur associé
        $notifications = Notification::with('user')->get();
        return response()->json($notifications, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'message' => 'required|string',
            'date' => 'required|date',
            'status' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
        ]);

        // Créer une nouvelle notification
        $notification = Notification::create($validatedData);

        return response()->json([
            'message' => 'Notification created successfully',
            'data' => $notification
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Trouver la notification par ID avec son utilisateur associé
        $notification = Notification::with('user')->find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        return response()->json($notification, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Trouver la notification par ID
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        // Valider les données
        $validatedData = $request->validate([
            'message' => 'sometimes|string',
            'date' => 'sometimes|date',
            'status' => 'sometimes|boolean',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        // Mettre à jour la notification
        $notification->update($validatedData);

        return response()->json([
            'message' => 'Notification updated successfully',
            'data' => $notification
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver la notification par ID
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        // Supprimer la notification
        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully'], 200);
    }
}

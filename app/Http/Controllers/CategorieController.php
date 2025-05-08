<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::with('formations')->get();
        return response()->json($categories, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categorie = Categorie::create($validatedData);

        return response()->json([
            'message' => 'Categorie created successfully',
            'data' => $categorie
        ], 201);
    }

    public function show($id)
    {
        $categorie = Categorie::with('formations')->find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Categorie not found'], 404);
        }

        return response()->json($categorie, 200);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Categorie not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categorie->update($validatedData);

        return response()->json([
            'message' => 'Categorie updated successfully',
            'data' => $categorie
        ], 200);
    }

    public function destroy($id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Categorie not found'], 404);
        }

        $categorie->delete();

        return response()->json(['message' => 'Categorie deleted successfully'], 200);
    }
}

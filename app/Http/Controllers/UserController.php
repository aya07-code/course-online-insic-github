<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function updateAvatar(Request $request)
    {
    $user = auth()->user();

    if ($request->hasFile('avatar')) {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $avatarPath = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $avatarPath;
        $user->save();

        return response()->json([
            'message' => 'Avatar updated successfully',
            'avatar' => asset("storage/" . $user->avatar),
        ]);
    }

    // Supprimer l'image (remettre l'image par défaut)
    if ($request->get('remove_avatar') === '1') {
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->avatar = null;
            $user->save();
        }

        return response()->json([
            'message' => 'Avatar removed successfully',
            'avatar' => asset("/assets/img/dashboard/edit/2j.jpg"),
        ]);
    }

    return response()->json(['message' => 'No avatar provided'], 400);
}
    public function index()
    {
        $users = User::paginate(10);
        $users->makeHidden('password');
        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        $user = User::create($validatedData);
        $user->makeHidden('password');

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->makeHidden('password');
        return response()->json($user, 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);
        $user = $user->refresh();
        $user->makeHidden('password');

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    /**
     * Test : retourne la liste brute des notes/résultats des quiz par utilisateur, formation, chapitre.
     */
    public function testQuizNotesResultsRaw()
    {
        $results = \DB::select("
            SELECT users.name AS user_name, formations.titre AS formation_titre, chapitres.title AS chapitre_title, quizzes.title AS quiz_title, quizzes.notes, quizzes.resultats
            FROM users
            LEFT JOIN formation_users ON formation_users.user_id = users.id
            LEFT JOIN formations ON formations.id = formation_users.formation_id
            LEFT JOIN chapitres ON chapitres.formation_id = formations.id
            LEFT JOIN quizzes ON quizzes.chapitre_id = chapitres.id
            ORDER BY users.id, formations.id, chapitres.id, quizzes.id
        ");
        return response()->json($results);
    }
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string',
        ]);

        // Gestion de l'avatar en base64
        if ($request->filled('avatar') && str_starts_with($request->avatar, 'data:image')) {
            preg_match('/^data:image\/(\w+);base64,/', $request->avatar, $type);
            $type = $type[1] ?? 'png';
            $avatarData = substr($request->avatar, strpos($request->avatar, ',') + 1);
            $avatarData = base64_decode($avatarData);

            $fileName = 'avatar_' . $user->id . '_' . time() . '.' . $type;
            $filePath = 'avatars/' . $fileName;
            \Storage::disk('public')->put($filePath, $avatarData);

            $validated['avatar'] = '/storage/' . $filePath;
        }

        $user->update($validated);

        return response()->json(['user' => $user]);
    }
    public function updatePassword(Request $request)
{
    $request->validate([
        'current_password' => 'required',
        'new_password' => 'required|confirmed|min:6',
    ]);

    $user = $request->user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Le mot de passe actuel est incorrect.'], 422);
    }

    $user->password = bcrypt($request->new_password);
    $user->save();

    return response()->json(['message' => 'Mot de passe mis à jour !']);
}

public function fillStudentsFromUsers()
{
    $users = User::where('role', 'student')->get();
    $added = 0;
    foreach ($users as $user) {
        if (!\App\Models\Student::where('user_id', $user->id)->exists()) {
            \App\Models\Student::create(['user_id' => $user->id]);
            $added++;
        }
    }
    return response()->json([
        'message' => 'Remplissage terminé',
        'added' => $added
    ]);
}
}

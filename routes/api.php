<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController; 
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\ChapitreController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\FormationUserController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserQuizController;

Route::get('/', function () {
    return view('home'); 
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('admins', AdminController::class);
    Route::apiResource('assistants', AssistantController::class);
    Route::apiResource('categories', CategorieController::class);
    Route::apiResource('certifications', CertificationController::class);
    Route::apiResource('chapitres', ChapitreController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::apiResource('formations', FormationController::class);
    Route::apiResource('formation-users', FormationUserController::class);
    Route::apiResource('lessons', LessonController::class);
    Route::apiResource('messages', MessageController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('questions', QuestionController::class);
    Route::apiResource('quizzes', QuizController::class);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('user-quizzes', UserQuizController::class);
    Route::post('/user/avatar', [UserController::class, 'updateAvatar']);
    Route::post('/logout', [AuthController::class, 'logout']);
})->get('/user', function (Request $request) {
    return $request->user();
});
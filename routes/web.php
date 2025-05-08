<?php

use Illuminate\Support\Facades\Route;
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
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserQuizController;

Route::get('/', function () {
    return view('home'); 
});

// Routes pour les contrôleurs
Route::resource('admins', AdminController::class);
Route::resource('assistants', AssistantController::class);
Route::resource('categories', CategorieController::class);
Route::resource('certifications', CertificationController::class);
Route::resource('chapitres', ChapitreController::class);
Route::resource('feedbacks', FeedbackController::class);
Route::resource('formations', FormationController::class);
Route::resource('formation-users', FormationUserController::class);
Route::resource('lessons', LessonController::class);
Route::resource('messages', MessageController::class);
Route::resource('notifications', NotificationController::class);
Route::resource('paiements', PaiementController::class);
Route::resource('questions', QuestionController::class);
Route::resource('quizzes', QuizController::class);
Route::resource('students', StudentController::class);
Route::resource('teachers', TeacherController::class);
Route::resource('users', UserController::class);
Route::resource('user-quizzes', UserQuizController::class);

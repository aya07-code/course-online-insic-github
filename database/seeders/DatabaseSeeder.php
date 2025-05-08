<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    $this->call([
        UserSeeder::class,
        StudentSeeder::class,
        TeacherSeeder::class,
        AdminSeeder::class,
        AssistantSeeder::class,
        CategorieSeeder::class,
        FormationSeeder::class,
        ChapitreSeeder::class,
        LessonSeeder::class,
        QuizSeeder::class,
        QuestionSeeder::class,
        UserQuizSeeder::class,
        CertificationSeeder::class,
        FormationUserSeeder::class,
        FeedbackSeeder::class,
        PaiementSeeder::class,
        MessageSeeder::class,
        NotificationSeeder::class,
    ]);
}
}

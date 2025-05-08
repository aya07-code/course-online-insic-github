<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserQuiz;

class UserQuizSeeder extends Seeder {
    public function run(): void {
        UserQuiz::factory()->count(20)->create();
    }
}

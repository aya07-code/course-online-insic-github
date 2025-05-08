<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lesson;

class LessonSeeder extends Seeder {
    public function run(): void {
        Lesson::factory()->count(40)->create();
    }
}

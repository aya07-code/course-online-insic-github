<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Feedback;

class FeedbackSeeder extends Seeder {
    public function run(): void {
        Feedback::factory()->count(20)->create();
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Chapitre;

class ChapitreSeeder extends Seeder {
    public function run(): void {
        Chapitre::factory()->count(20)->create();
    }
}

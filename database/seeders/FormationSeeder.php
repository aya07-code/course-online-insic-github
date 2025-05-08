<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Formation;

class FormationSeeder extends Seeder {
    public function run(): void {
        Formation::factory()->count(10)->create();
    }
}

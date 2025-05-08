<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FormationUser;

class FormationUserSeeder extends Seeder {
    public function run(): void {
        FormationUser::factory()->count(20)->create();
    }
}

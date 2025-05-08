<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Certification;

class CertificationSeeder extends Seeder {
    public function run(): void {
        Certification::factory()->count(10)->create();
    }
}

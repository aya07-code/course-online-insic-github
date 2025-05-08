<?php

namespace Database\Factories;
use App\Models\Chapitre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'chapitre_id' => Chapitre::factory(),
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['video', 'pdf', 'img']),
        ];
    }
}

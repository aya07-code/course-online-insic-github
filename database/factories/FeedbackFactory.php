<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contenu' => $this->faker->paragraph(),
            'rating' => $this->faker->numberBetween(1, 5),
            'user_id' => User::factory(),
            'formation_id' => Formation::factory(),
        ];
    }
}

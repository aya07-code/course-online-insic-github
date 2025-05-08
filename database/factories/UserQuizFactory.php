<?php

namespace Database\Factories;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserQuiz>
 */
class UserQuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'quiz_id' => Quiz::factory(),
            'score' => $this->faker->numberBetween(0, 100),
        ];
    }
}

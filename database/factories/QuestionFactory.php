<?php

namespace Database\Factories;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $options = $this->faker->words(4);
        return [
            'quiz_id' => Quiz::factory(),
            'question' => $this->faker->sentence(),
            'options' => json_encode($options),
            'correct_answer' => $options[0],
        ];
    }
}

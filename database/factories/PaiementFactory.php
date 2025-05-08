<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paiement>
 */
class PaiementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 20, 500),
            'date' => $this->faker->date(),
            'method' => $this->faker->randomElement(['carte', 'paypal', 'virement']),
            'recu' => $this->faker->imageUrl(),
            'user_id' => User::factory(),
            'formation_id' => Formation::factory(),
        ];
    }
}

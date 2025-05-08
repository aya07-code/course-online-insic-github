<?php

namespace Database\Factories;
use App\Models\Formation;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formation>
 */
class FormationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Formation::class;

    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 0, 500),
            'duree' => $this->faker->numberBetween(1, 52) . ' semaines',
            'categories_id' => Categorie::factory(),
        ];
    }
}

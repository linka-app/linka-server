<?php

    namespace Database\Factories;

    use App\Models\Bookmark;
    use Illuminate\Database\Eloquent\Factories\Factory;

    class BookmarkFactory extends Factory
    {
        protected $model = Bookmark::class;

        public function definition()
        {
            return [
                'url'         => $this->faker->url(),
                'title'       => $this->faker->words(),
                'description' => $this->faker->sentence(),
                'unread'      => $this->faker->boolean(),
                'archived'    => $this->faker->boolean(),
                'shared'      => $this->faker->boolean(),
            ];
        }
    }

<?php

    namespace Database\Factories;

    use App\Models\Bookmark;
    use App\Models\User;
    use Illuminate\Database\Eloquent\Factories\Factory;

    class BookmarkFactory extends Factory
    {
        protected $model = Bookmark::class;

        public function definition()
        {
            return [
                'url'         => $this->faker->url(),
                'title'       => $this->faker->city(),
                'description' => $this->faker->sentence(),
                'unread'      => $this->faker->boolean(),
                'archived'    => $this->faker->boolean(),
                'shared'      => $this->faker->boolean(),
                'user_id'     => User::factory(),
            ];
        }
    }

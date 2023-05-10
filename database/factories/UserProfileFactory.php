<?php

    namespace Database\Factories;

    use App\Models\UserProfile;
    use Illuminate\Database\Eloquent\Factories\Factory;

    class UserProfileFactory extends Factory
    {
        protected $model = UserProfile::class;

        public function definition(): array
        {
            return [
                'bookmark_date_display' => $this->faker->randomElement([
                                                                           'relative',
                                                                           'absolute',
                                                                           'hidden'
                                                                       ]),
                'bookmark_link_target'  => $this->faker->randomElement([
                                                                           '_blank',
                                                                           '_self'
                                                                       ]),
                'enable_sharing'        => $this->faker->boolean(),
                'enable_favicons'       => $this->faker->boolean(),
            ];
        }
    }

<?php

    namespace App\Providers;

    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Http\Resources\Json\JsonResource;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\ServiceProvider;
    use Illuminate\Support\Stringable;
    use Str;

    class AppServiceProvider extends ServiceProvider
    {
        /**
         * Register any application services.
         */
        public function register(): void
        {
            //
        }

        /**
         * Bootstrap any application services.
         */
        public function boot(): void
        {
            JsonResource::withoutWrapping();

            Builder::macro('filterByCurrentUser', function (string $userColumn = 'user_id') {
                return $this->where($userColumn, Auth::id());
            });

            // String helpers
            Str::macro('urlHost', function (string $value) {
                return @parse_url($value)['host'];
            });

            Stringable::macro('urlHost', function () {
                return new Stringable(@parse_url($this->value)['host']);
            });

        }
    }

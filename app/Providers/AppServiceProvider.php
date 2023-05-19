<?php

    namespace App\Providers;

    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Http\Resources\Json\JsonResource;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\ServiceProvider;

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
        }
    }

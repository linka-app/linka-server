<?php

    use App\Http\Controllers\BookmarkController;
    use App\Http\Controllers\LinkaController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\UserProfileController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
        ]);
    });

    Route::middleware('auth', 'verified')->group(function () {
        Route::Resource('bookmark', BookmarkController::class);
        Route::Resource('user-profile', UserProfileController::class)->only('store');
    });

    Route::get('/dashboard', [
        LinkaController::class,
        'index'
    ])->middleware([
                       'auth',
                       'verified'
                   ])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [
            ProfileController::class,
            'edit'
        ])->name('profile.edit');
        Route::patch('/profile', [
            ProfileController::class,
            'update'
        ])->name('profile.update');
        Route::delete('/profile', [
            ProfileController::class,
            'destroy'
        ])->name('profile.destroy');
    });

    require __DIR__ . '/auth.php';

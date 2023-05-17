<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\UserProfileRequest;
    use Illuminate\Support\Facades\Redirect;

    class UserProfileController extends Controller
    {

        public function store(UserProfileRequest $request)
        {

            $profile = $request->user()->profile()->firstorNew();
            $profile->fill($request->validated());
            $profile->save();

            return Redirect::route('profile.edit');
        }
    }

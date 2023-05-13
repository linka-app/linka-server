<?php

    namespace App\Http\Controllers\Api;

    use App\Http\Requests\UserProfileRequest;
    use App\Http\Resources\UserProfileResource;
    use App\Models\UserProfile;

    class UserProfileController extends Controller
    {
        public function index()
        {
            $this->authorize('viewAny', UserProfile::class);

            return UserProfileResource::collection(UserProfile::all());
        }

        public function store(UserProfileRequest $request)
        {
            $this->authorize('create', UserProfile::class);

            return new UserProfileResource(UserProfile::create($request->validated()));
        }

        public function show(UserProfile $userProfile)
        {
            $this->authorize('view', $userProfile);

            return new UserProfileResource($userProfile);
        }

        public function update(UserProfileRequest $request, UserProfile $userProfile)
        {
            $this->authorize('update', $userProfile);

            $userProfile->update($request->validated());

            return new UserProfileResource($userProfile);
        }

        public function destroy(UserProfile $userProfile)
        {
            $this->authorize('delete', $userProfile);

            $userProfile->delete();

            return response()->json();
        }
    }

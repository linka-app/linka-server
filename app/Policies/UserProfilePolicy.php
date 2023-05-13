<?php

    namespace App\Policies;

    use App\Models\User;
    use App\Models\UserProfile;
    use Illuminate\Auth\Access\HandlesAuthorization;

    class UserProfilePolicy
    {
        use HandlesAuthorization;

        public function viewAny(User $user): bool
        {

        }

        public function view(User $user, UserProfile $userProfile): bool
        {
        }

        public function create(User $user): bool
        {
        }

        public function update(User $user, UserProfile $userProfile): bool
        {
        }

        public function delete(User $user, UserProfile $userProfile): bool
        {
        }

        public function restore(User $user, UserProfile $userProfile): bool
        {
        }

        public function forceDelete(User $user, UserProfile $userProfile): bool
        {
        }
    }

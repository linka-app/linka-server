<?php

    namespace App\Policies;

    use App\Models\Bookmark;
    use App\Models\User;
    use http\Client\Response;
    use Illuminate\Auth\Access\HandlesAuthorization;

    class BookmarkPolicy
    {
        use HandlesAuthorization;

        public function viewAny(User $user): bool
        {
            return TRUE;
        }

        public function view(User $user, Bookmark $bookmark): bool
        {
            return TRUE;
        }

        public function create(User $user): bool
        {
            return TRUE;
        }

        public function update(User $user, Bookmark $bookmark): bool
        {
            return $user->id === $bookmark->user_id
                ? Response::allow()
                : Response::deny('You do not own this bookmark.');
        }

        public function delete(User $user, Bookmark $bookmark): bool
        {
        }

        public function restore(User $user, Bookmark $bookmark): bool
        {
        }

        public function forceDelete(User $user, Bookmark $bookmark): bool
        {
        }
    }

<?php

    namespace App\Listeners;

    use App\Events\BookmarkSaved;
    use Illuminate\Support\Facades\Storage;

    class GetFavicon
    {
        /**
         * Create the event listener.
         */
        public function __construct()
        {
            // ...
        }

        /**
         * Handle the event.
         */
        public function handle(BookmarkSaved $event): void
        {
            Storage::put(
                "{$event->bookmark->id}.png", file_get_contents(
                                                'https://www.google.com/s2/favicons?sz=64&domain_url=' . str($event->bookmark->url)->urlHost()->toString()
                                            )
            );
        }
    }

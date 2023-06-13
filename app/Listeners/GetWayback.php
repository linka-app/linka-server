<?php

    namespace App\Listeners;

    use App\Events\BookmarkSaved;
    use Illuminate\Support\Facades\Http;

    class GetWayback
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

            $theSnapshot = Http::get("https://archive.org/wayback/available?url=" . $event->bookmark->url)->json();
            if (!empty($theSnapshot['archived_snapshots'])) {
                $theSnapshotUrl = $theSnapshot['archived_snapshots']['closest']['url'];
                $event->bookmark->update(['web_archive_snapshot_url' => $theSnapshotUrl]);
            }
        }
    }

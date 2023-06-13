<?php

    namespace App\Events;

    use App\Models\Bookmark;
    use Illuminate\Broadcasting\InteractsWithSockets;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;

    class BookmarkSaved
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        /**
         * Create a new event instance.
         */
        public function __construct(
            public Bookmark $bookmark,
        ) {
            //
        }
    }

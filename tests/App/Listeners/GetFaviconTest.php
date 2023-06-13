<?php

    use App\Events\BookmarkSaved;

    it('Gets Favicons', function () {

        $bookmark = \App\Models\Bookmark::factory()->create();
        $event = new BookmarkSaved($bookmark);
        $listener = new \App\Listeners\GetFavicon();
        $listener->handle($event);

        //check whether file exists in path
        Storage::assertExists("{$bookmark->id}.png");
        //do some more assertions.....
        //after test delete the file from storage path
        Storage::delete("{$bookmark->id}.png");
        //check whether file was deleted
        Storage::assertMissing("{$bookmark->id}.png");

    });

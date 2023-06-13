<?php

    use App\Events\BookmarkSaved;

    it('Gets Snapshots From WaybackMachine', function () {

        $bookmark = \App\Models\Bookmark::factory()->create(['url' => 'https://mui.com/material-ui/react-container/']);
        $event = new BookmarkSaved($bookmark);
        $listener = new \App\Listeners\GetWayback();
        $listener->handle($event);
        $bookmark->refresh();

        expect($bookmark->web_archive_snapshot_url)->toContain('https://mui.com/material-ui/react-container/');
    });

    it('Gracefully fails with missing Snapshots From WaybackMachine', function () {

        $bookmark = \App\Models\Bookmark::factory()->create();
        $event = new BookmarkSaved($bookmark);
        $listener = new \App\Listeners\GetWayback();
        $listener->handle($event);
        $bookmark->refresh();

        expect($bookmark->web_archive_snapshot_url)->toBeNull();
    });

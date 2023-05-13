<?php

    namespace App\Services;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;
    use Illuminate\Http\Request;

    class BookmarkService
    {
        public function index(Request $request)
        {
            return BookmarkResource::collection($request->user()->bookmarks());
        }

        public function store(BookmarkRequest $request)
        {

            $validated = $request->safe()->except(['tags']);

            $bookmark = $request->user()->bookmarks()->create($validated);

            foreach ($request->safe()->only(['tags']) as $tag) {
                $bookmark->tags()->firstOrCreate([
                                                     ...$tag,
                                                     'user_id' => $request->user()->id
                                                 ]);
            }
            $bookmark->refresh();

            return new BookmarkResource($bookmark);
        }

        public function show(Bookmark $bookmark)
        {

            return new BookmarkResource($bookmark);
        }

        public function update(BookmarkRequest $request, Bookmark $bookmark)
        {

            $bookmark->update($request->validated());

            return new BookmarkResource($bookmark);
        }

        public function destroy(Bookmark $bookmark)
        {

            $bookmark->delete();

            return TRUE;
        }
    }

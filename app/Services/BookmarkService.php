<?php

    namespace App\Services;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;
    use Auth;
    use Illuminate\Http\Request;
    use Spatie\Tags\Tag;

    class BookmarkService
    {
        public function index(Request $request)
        {
            $filteredTags = $request->get('tags') ?? [];

            if (
                $request->get('search')
            ) {
                return BookmarkResource::collection(Bookmark::search($request->get('search'))->where('user_id', Auth::id())->get());
            }

            return BookmarkResource::collection($request->user()->bookmarks);
        }

        public function store(BookmarkRequest $request)
        {

            $validated = $request->safe()->except(['tags']);

            $bookmark = Bookmark::make($validated);
            $bookmark->user_id = Auth::id();

            if (empty($bookmark->title)) {
                //$bookmark->title = WebpageData::getWebPageTitle($bookmark->link);
            }

            $bookmark->save();

            //$groupIds = $validated['groups'];
            //$bookmark->groups()->sync($groupIds);

            $tags = [];

            foreach ($request->safe()->only(['tags']) as $tag) {
                $tags[] = Tag::filterByCurrentUser()->find($tag);
            }

            $bookmark->syncTags($tags);

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

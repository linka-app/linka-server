<?php

    namespace App\Http\Controllers\Api;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;
    use App\Services\BookmarkService;
    use Illuminate\Http\Request;

    class BookmarkApiController extends ApiController
    {
        public function index(Request $request)
        {
            $this->authorize('viewAny', Bookmark::class);

            return $this->resourceCollectionResponse(BookmarkResource::collection($request->user()->bookmarks()), 'ok');
        }

        public function store(BookmarkRequest $request)
        {
            $this->authorize('create', Bookmark::class);

            return $this->resourceResponse((new BookmarkService())->store($request), 'ok');
        }

        public function show(Bookmark $bookmark)
        {
            $this->authorize('view', $bookmark);

            return $this->resourceResponse(new BookmarkResource($bookmark), 'ok');
        }

        public function update(BookmarkRequest $request, Bookmark $bookmark)
        {
            $this->authorize('update', $bookmark);

            $bookmark->update($request->validated());

            return $this->resourceResponse(new BookmarkResource($bookmark), 'ok');
        }

        public function destroy(Bookmark $bookmark)
        {
            $this->authorize('delete', $bookmark);

            $bookmark->delete();

            return $this->noContentResponse();
        }
    }

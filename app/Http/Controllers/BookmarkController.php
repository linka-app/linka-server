<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;

    class BookmarkController extends Controller
    {
        public function index()
        {
            $this->authorize('viewAny', Bookmark::class);

            return BookmarkResource::collection(Bookmark::all());
        }

        public function store(BookmarkRequest $request)
        {
            $this->authorize('create', Bookmark::class);

            return new BookmarkResource(Bookmark::create($request->validated()));
        }

        public function show(Bookmark $bookmark)
        {
            $this->authorize('view', $bookmark);

            return new BookmarkResource($bookmark);
        }

        public function update(BookmarkRequest $request, Bookmark $bookmark)
        {
            $this->authorize('update', $bookmark);

            $bookmark->update($request->validated());

            return new BookmarkResource($bookmark);
        }

        public function destroy(Bookmark $bookmark)
        {
            $this->authorize('delete', $bookmark);

            $bookmark->delete();

            return response()->json();
        }
    }

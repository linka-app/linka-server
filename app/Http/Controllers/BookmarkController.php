<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;
    use App\Services\BookmarkService;
    use Illuminate\Http\Request;
    use Inertia\Inertia;

    class BookmarkController extends Controller
    {
        public function index(Request $request, array $filteredTags = [])
        {
            $this->authorize('viewAny', Bookmark::class);

//            Bookmark::search($searchString)
//                //orderBy('created_at', 'desc')
//                // ->filterByCurrentUser()
//                //                                   ->filterByTags($filteredTags)
//                //                                   ->paginate(20)
//                //                                   ->withQueryString()
//                //                                   ->through(fn(Bookmark $link) => [
//                //                                       'title' => $link->title,
//                //                                       'url'   => $link->url,
//                //                                       PHP_URL_HOST,
//                //                                       'id'    => $link->id,
//                //                                   ])

            return Inertia::render('Linka', [
                'config' => [
                    'language' => 'en'
                ],
                'links'  => fn() => (new BookmarkService())->index($request),
                'tags'   => TagController::getAllTags(),
            ]);

            //return BookmarkResource::collection(Bookmark::all());
        }

        /**
         * Store a newly created resource in storage.
         */
        public function create()
        {

            //$this->authorize('create', Bookmark::class);
            return Inertia::render('Bookmark/Add', [
                'config' => [
                    'language' => 'en'
                ],
                'tags'   => TagController::getAllTags(),
            ]);

        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(BookmarkRequest $request)
        {

            //$this->authorize('create', Bookmark::class);
            (new BookmarkService())->store($request);

            return to_route('dashboard');
        }

        public function show(Bookmark $bookmark)
        {
            //  $this->authorize('view', $bookmark);

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

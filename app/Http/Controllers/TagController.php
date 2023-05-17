<?php

    namespace App\Http\Controllers;

    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Request;
    use Inertia\Inertia;
    use Inertia\Response;
    use Spatie\Tags\Tag;

    class TagController extends Controller
    {
        protected function rules(): array
        {
            return [
                'tagName' => 'required|min:2|string',
            ];
        }

        /**
         * Display a listing of the resource.
         */
        public function index(): Response
        {
            return Inertia::render('Tags/Index', [
                'tags' => Tag::orderBy('name')
                             ->filterByCurrentUser()
                             ->get()
                             ->transform(fn(Tag $tag) => [
                                 'id'   => $tag->id,
                                 'name' => $tag->name,
                             ]),
            ]);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            //
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            Request::validate($this->rules());

            Tag::create([
                            'name'    => Request::get('tagName'),
                            'user_id' => Auth::id(),
                        ]);
        }

        /**
         * Display the specified resource.
         */
        public function show(Tag $tag)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         */
        public function edit(Tag $tag)
        {
            //
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, Tag $tag)
        {
            Request::validate($this->rules());

            $tag->name = Request::get('tagName');

            $tag->save();
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Tag $tag)
        {
            $tag->delete();
        }

        /**
         * Returns all tags for the current user.
         */
        public static function getAllTags()
        {
            $theTags = Tag::orderBy('name')
                //->filterByCurrentUser()
                          ->get()
                          ->transform(fn(Tag $tag) => [
                              'id'    => $tag->id,
                              'label' => $tag->name,
                          ]);

            return empty($theTags) ? [] : $theTags;
        }

        /**
         * Returns all tags of the given link.
         */
        public static function getTagsOfLink($link): array
        {
            $tags = $link->tags()->filterByCurrentUser()->get();
            $linkTags = [];

            foreach ($tags as $tag) {
                $linkTags[] = (object)[
                    'id'   => $tag->id,
                    'name' => $tag->name
                ];
            }

            return $linkTags;
        }
    }

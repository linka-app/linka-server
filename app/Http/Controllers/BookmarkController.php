<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\BookmarkRequest;
    use App\Http\Resources\BookmarkResource;
    use App\Models\Bookmark;
    use App\Services\BookmarkService;
    use Auth;
    use Illuminate\Http\Request;
    use Inertia\Inertia;
    use OpenAI\Laravel\Facades\OpenAI;
    use PHPHtmlParser\Dom;
    use Redirect;

    class BookmarkController extends Controller
    {
        public function fill(Request $request, array $filteredTags = [])
        {

            $filteredUrl = filter_var($request->get('url'), FILTER_VALIDATE_URL);

            $dom = new Dom;
            $dom->loadFromUrl($filteredUrl);

            $description = [];
            $description[] = strip_tags($dom->find('title')->innerHtml);

            foreach ($dom->find('meta') as $item) {
                if (
                    $item->getAttribute('name') == 'description'
                ) {
                    $description[] = strip_tags($item->getAttribute('content'));
                }
            }

            foreach ([
                         ...$dom->find('h1'),
                         ...$dom->find('h2'),
                         ...$dom->find('h3'),
                         ...$dom->find('p'),
                         ...$dom->find('main ul')
                     ] as $item) {
                $description[] = strip_tags($item->innerHtml);
            }

            $response = OpenAI::chat()->create([
                                                   'model'    => 'gpt-3.5-turbo',
                                                   'messages' => [
                                                       [
                                                           'role'    => 'system',
                                                           'content' => implode("\n", [
                                                               'You are to act as the author of a website summarizer.',
                                                               'Your mission is to create a clean and comprehensive summary of the content I send.',
                                                               'I will send you the output of a \'document.querySelectorAll(\'title,meta[name="description"],h1,h2,h3,p,main ul\') command',
                                                               'you will convert it into an JSON object that has \'title\', \'desc\', and \'tags\' attributes.',
                                                               'Use the present tense.',
                                                               'The \'desc\' should be no longer than 40 words,',
                                                               'the \'tags\' should be all lowercase and in a \'slug\' format and there should be no more then 5 tags.',
                                                               'Your Response should always be this Populated JSON object:',
                                                               '\'{"title": "", "desc": "", and "tags": []}\'',
                                                               'Respond with only one JSON Object, so no explnation, and nothing extra.',
                                                               'Use english to answer.'
                                                           ])
                                                       ],
                                                       [
                                                           'role'    => 'user',
                                                           'content' => 'Title: di-sukharev/opencommit: GPT CLI to auto-generate impressive commits in 1 second 🤯🔫
Description: GPT CLI to auto-generate impressive commits in 1 second 🤯🔫 - di-sukharev/opencommit: GPT CLI to auto-generate impressive commits in 1 second 🤯🔫
Site Content:
GPT CLI to auto-generate impressive commits in 1 second
Killing lame commits with AI
All the commits in this repo are done with OpenCommit — look into the commits to see how OpenCommit works. Emoji and long commit description text is configurable.
Setup
Install OpenCommit globally to use in any repository:
Get your API key from OpenAI. Make sure you add payment details, so API works.
Set the key to OpenCommit config:
Your api key is stored locally in ~/.opencommit config file.
~/.opencommit
Usage
You can call OpenCommit directly to generate a commit message for your staged changes:
You can also use the oc shortcut:
oc'
                                                       ],
                                                       [
                                                           'role'    => 'assistant',
                                                           'content' => json_encode([
                                                                                        'title' => 'OpenCommit: GPT CLI to Auto-Generate Impressive Commits in 1 Second',
                                                                                        'desc'  => 'OpenCommit is a GPT CLI tool that generates impressive commit messages in seconds, using OpenAI\'s ChatGPT model. It allows you to preface commits with emojis, postface them with descriptions of changes, and supports internationalization. It can also be used as a Git hook and ignores files to prevent uploading artifacts and large files.',
                                                                                        'tags'  => [
                                                                                            'opencommit',
                                                                                            'gpt',
                                                                                            'cli',
                                                                                            'git',
                                                                                            'commit messages'
                                                                                        ],
                                                                                    ])
                                                       ],
                                                       [
                                                           'role'    => 'user',
                                                           'content' => str(implode("\n", $description))->substr(0, 4000)->toString()
                                                       ],
                                                   ],
                                               ]);

            return $response->choices[0]->message->content;
        }

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
                'links' => fn() => (new BookmarkService())->index($request),
                'tags'  => TagController::getAllTags(),
                'group' => GroupController::getAllGroups(),
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
                'tags'   => TagController::getAllTags(),
                'groups' => GroupController::getAllGroups(),
            ]);

        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(BookmarkRequest $request)
        {

            $validated = $request->validated();
            $bookmark = new Bookmark();
            $bookmark->fill($validated);
            $bookmark['user_id'] = Auth::id();
            $bookmark->save();

            $bookmark->syncTagsWithType($validated['tags'], 'tag');
            $bookmark->syncTagsWithType($validated['groups'], 'group');

            return to_route('dashboard');
        }

        public function show(Bookmark $bookmark)
        {
            return Inertia::render('Bookmark/Edit', [
                'bookmark' => new BookmarkResource($bookmark),
                'tags'     => TagController::getAllTags(),
                'groups'   => GroupController::getAllGroups(),
            ]);
        }

        public function update(BookmarkRequest $request, Bookmark $bookmark)
        {

            $validated = $request->validated();
            $bookmark->update($validated);

            $bookmark->syncTagsWithType($validated['tags'], 'tag');
            $bookmark->syncTagsWithType($validated['groups'], 'group');

            return Redirect::route('dashboard');
        }

        public function destroy(Bookmark $bookmark)
        {
            $this->authorize('delete', $bookmark);

            $bookmark->delete();

            return response()->json();
        }
    }

<?php

    declare(strict_types=1);

    use App\Models\User;
    use Illuminate\Foundation\Testing\RefreshDatabase;
    use Illuminate\Testing\Fluent\AssertableJson;

    uses(RefreshDatabase::class);

    it('creates bookmarks', function (array $bookmark) {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/v1/bookmarks', $bookmark);

        $response->assertStatus(200)
                 ->assertJson(fn(AssertableJson $json) => $json
                     ->where('message', 'ok')
                     ->where('data', 'ok')
                     ->where('name', 'Victoria Faith')
                     ->where('email', fn(string $email) => str($email)->is('victoria@gmail.com'))
                     ->whereNot('status', 'pending')
                     ->missing('password')
                     ->etc()
                 );

//        ->assertJson(function (AssertableJson $json) {
//            dd($json);
//        });

//            $json->where('id', 1)
//                 ->where('name', 'Victoria Faith')
//                 ->where('email', fn (string $email) => str($email)->is('victoria@gmail.com'))
//                 ->whereNot('status', 'pending')
//                 ->missing('password')
//                 ->etc()
//            );;

        if (
            isset($bookmark['tags'])
        ) {
            collect($bookmark['tags'])->each(function ($name) use ($response) {
                $response->assertSeeText($name);
            });
        }

    })->with([
//                 [
//                     [
//                         'title' => fake()->text(),
//                         'url'   => fake()->url()
//                     ]
//                 ],
//                 [
//                     [
//                         'title'       => fake()->text(),
//                         'url'         => fake()->url(),
//                         'description' => fake()->text()
//                     ]
//                 ],
[
    [
        'title'       => fake()->text(),
        'url'         => fake()->url(),
        'description' => fake()->text(),
        'tags'        => [
            'name' => fake()->text(64)
        ]
    ]
],
             ]);

    it('validates bookmarks', function (array $bookmark, array $bookmarkErrors) {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/v1/bookmarks', $bookmark);

        $response->assertStatus(302);
        $response->assertSessionHasErrors($bookmarkErrors);
    })->with([
                 [
                     [
                         'title' => 'My first bookmark',
                         'url'   => fake()->text(256),
                     ],
                     ['url']
                 ],
                 [
                     [
                         'title' => NULL,
                         'url'   => fake()->url()
                     ],
                     ['title']
                 ],
                 [
                     [
                         'title' => '',
                         'url'   => fake()->url()
                     ],
                     ['title']
                 ],
                 [
                     [
                         'title' => fake()->realTextBetween(256, 300),
                         'url'   => fake()->url(),
                     ],
                     ['title']
                 ],
                 [
                     [
                         'title' => fake()->realTextBetween(256, 300),
                         'url'   => fake()->text(256),
                     ],
                     [
                         'title',
                         'url'
                     ]
                 ],
                 [
                     [
                         'title'  => fake()->text(255),
                         'url'    => fake()->url(),
                         'unread' => fake()->text(),
                     ],
                     [
                         'unread'
                     ]
                 ],
                 [
                     [
                         'title'    => fake()->text(255),
                         'url'      => fake()->url(),
                         'unread'   => fake()->text(),
                         'archived' => fake()->text(),
                         'shared'   => fake()->text(),
                     ],
                     [
                         'unread',
                         'archived',
                         'shared',
                     ]
                 ],
             ]);


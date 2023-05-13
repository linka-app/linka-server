<?php

    declare(strict_types=1);

    use App\Models\User;
    use Illuminate\Foundation\Testing\RefreshDatabase;

    uses(RefreshDatabase::class);

    it('updates tags', function () {
        $user = User::factory()
                    ->has(\App\Models\Tag::factory()->count(5))
                    ->create();

        $response = $this
            ->actingAs($user)
            ->patch('/tag/1', [
                'name' => 'Test Tag',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/tags');

        $user->refresh();

        $this->assertSame('Test Tag', $user->name);

        $response = $this
            ->actingAs($user)
            ->get('/tags');

        $response->assertOk();
    });

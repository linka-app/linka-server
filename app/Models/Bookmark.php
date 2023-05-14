<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Query\Builder;
    use Illuminate\Validation\Rule;
    use Laravel\Scout\Searchable;
    use Spatie\Tags\HasTags;

    class Bookmark extends Model
    {
        use Searchable;
        use HasTags;
        use HasFactory;

        protected $fillable = [
            'url',
            'title',
            'description',
            'unread',
            'archived',
            'shared',
        ];

        protected $casts = [
            'unread'   => 'boolean',
            'archived' => 'boolean',
            'shared'   => 'boolean',
        ];

        public static function rules(string $linkFromRequest, string $link = ''): array
        {
            return [
                'url'         => [
                    'url',
                    'required',
                    $link !== $linkFromRequest ? Rule::unique(Bookmark::class, 'url')->where(fn(Builder $query) => $query->where('user_id', \Auth::id())) : '',
                ],
                'title'       => 'string|min:2|max:255|nullable',
                'description' => 'string|nullable',
                'unread'      => 'boolean|nullable',
                'archived'    => 'boolean|nullable',
                'shared'      => 'boolean|nullable',
            ];
        }

        /**
         * Get all tag IDs for the link.
         */
        public function tagIds(): array
        {
            return $this->tags()->pluck('id')->toArray();
        }

        public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
        {
            return $this->belongsTo(User::class);
        }

    }

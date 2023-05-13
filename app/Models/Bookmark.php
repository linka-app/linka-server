<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Bookmark extends Model
    {
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

        public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
        {
            return $this->belongsTo(User::class);
        }

        public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
        {
            return $this->belongsToMany(Tag::class);
        }
    }

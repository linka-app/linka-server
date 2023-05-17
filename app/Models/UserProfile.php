<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class UserProfile extends Model
    {
        use HasFactory;

        protected $fillable = [
            'bookmark_date_display',
            'bookmark_link_target',
            'dark_mode',
        ];

        protected $casts = [
            'dark_mode' => 'boolean',
        ];

        public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
        {
            return $this->belongsTo(User::class);
        }

        public function bookmarks(): \Illuminate\Database\Eloquent\Relations\HasMany
        {
            return $this->hasMany(Bookmark::class);
        }
    }

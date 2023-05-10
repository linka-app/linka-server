<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Tag extends Model
    {
        use HasFactory;

        protected $fillable = [
            'name'
        ];

        public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
        {
            return $this->belongsTo(User::class);
        }

        public function bookmarks(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
        {
            return $this->belongsToMany(Bookmark::class);
        }
    }

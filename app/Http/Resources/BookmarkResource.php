<?php

    namespace App\Http\Resources;

    use Illuminate\Http\Request;
    use Illuminate\Http\Resources\Json\JsonResource;

    /** @mixin \App\Models\Bookmark */
    class BookmarkResource extends JsonResource
    {
        public function toArray(Request $request): array
        {
            return [
                'id'          => $this->id,
                'url'         => $this->url,
                'title'       => $this->title,
                'description' => $this->description,
                'unread'      => $this->unread,
                'archived'    => $this->archived,
                'shared'      => $this->shared,
                'tags'        => $this->tags->pluck('name')->all()
            ];
        }
    }

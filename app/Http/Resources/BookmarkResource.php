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
                'tags'        => TagResource::collection($this->tags),
                'created_at'  => $this->created_at,
                'updated_at'  => $this->updated_at,
            ];
        }
    }

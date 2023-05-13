<?php

    namespace App\Http\Resources;

    use Illuminate\Http\Request;
    use Illuminate\Http\Resources\Json\JsonResource;

    /** @mixin \App\Models\UserProfile */
    class UserProfileResource extends JsonResource
    {
        public function toArray(Request $request): array
        {
            return [
                'id'                    => $this->id,
                'bookmark_date_display' => $this->bookmark_date_display,
                'bookmark_link_target'  => $this->bookmark_link_target,
                'created_at'            => $this->created_at,
                'updated_at'            => $this->updated_at,

            ];
        }
    }

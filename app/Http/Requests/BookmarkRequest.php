<?php

    namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;

    class BookmarkRequest extends FormRequest
    {
        public function rules(): array
        {
            return [
                'url'         => 'url|required|unique:bookmarks',
                'title'       => 'required|string|max:255',
                'description' => 'string',
                'unread'      => 'boolean',
                'archived'    => 'boolean',
                'shared'      => 'boolean',
                'tags'        => 'sometimes|array:name',
                'tags.name'   => 'sometimes|required|string|max:64',
            ];
        }
    }

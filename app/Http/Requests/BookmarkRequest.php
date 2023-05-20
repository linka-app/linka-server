<?php

    namespace App\Http\Requests;

    use App\Models\Bookmark;

    class BookmarkRequest extends BaseFormRequest
    {

        /**
         * Prepare the data for validation.
         */
        protected function prepareForValidation(): void
        {
            $this->merge([
                             'url' => filter_var($this->url, FILTER_VALIDATE_URL) ? $this->url : "https://$this->url",
                         ]);
        }

        public function store(): array
        {
            return
                [
                    ...Bookmark::rules($this->request->get('url')),
                    'tags'   => 'array',
                    'groups' => 'array',
                ];
        }

        public function update(): array
        {
            return
                [
                    ...Bookmark::rules($this->request->get('url')),
                    'tags'   => 'array',
                    'groups' => 'array',
                    'url'    => [
                        'url',
                        'required'
                    ]
                ];
        }
    }

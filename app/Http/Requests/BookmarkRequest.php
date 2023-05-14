<?php

    namespace App\Http\Requests;

    use App\Models\Bookmark;
    use Illuminate\Foundation\Http\FormRequest;

    class BookmarkRequest extends FormRequest
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

        public function rules(): array
        {
            return array_merge(
                [
                    'tags' => 'array'
                ],
                Bookmark::rules($this->request->get('url')),
            );
        }
    }

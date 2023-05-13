<?php

    namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;
    use Str;

    class TagRequest extends FormRequest
    {
        /**
         * Handle a passed validation attempt.
         */
        protected function passedValidation(): void
        {
            $this->replace(['name' => $this->user()->profile->slugifyTag() ? Str::slug($this->input('name')) : $this->input('name')]);
        }

        public function rules(): array
        {
            return [
                'name' => 'required|string|max:64',
            ];
        }
    }

<?php

    namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;

    class UserProfileRequest extends FormRequest
    {
        /**
         * Get the validation rules that apply to the request.
         *
         * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
         */
        public function rules(): array
        {
            return [
                'language'              => [
                    'required',
                    'string',
                    'min:2',
                    'max:5',
                ],
                'dark_mode'             => ['boolean'],
                'bookmark_link_target'  => [
                    'required',
                    'in:_blank,_self'
                ],
                'bookmark_date_display' => [
                    'required',
                    'in:relative,absolute,hidden'
                ],
                'bookmark_view'         => [
                    'required',
                    'in:condensed,expanded'
                ],
            ];
        }

        /**
         * Handle a passed validation attempt.
         */
        protected function passedValidation(): void
        {
            $this->replace(['dark_mode' => !empty($this['dark_mode'])]);
        }
    }

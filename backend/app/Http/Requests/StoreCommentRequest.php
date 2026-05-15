<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    // app/Http/Requests/Api/StoreCommentRequest.php
    public function rules(): array
    {
        return [
            'comment_body' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'comment_body' => strip_tags($this->comment_body), // XSS Protection
        ]);
    }
}

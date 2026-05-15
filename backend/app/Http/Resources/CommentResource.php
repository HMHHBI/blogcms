<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // app/Http/Resources/Api/CommentResource.php
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'comment_body' => $this->comment_body,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'is_admin' => $this->user->is_admin, // Tag ke liye
            ],
            'post' => [
                'title' => $this->post->title ?? 'Deleted Post',
            ],
            'parent_id' => $this->parent_id,
            'created_at' => $this->created_at->diffForHumans(),
            // ✅ Ye line threaded comments ko load karegi
            'replies' => CommentResource::collection($this->whenLoaded('replies')),
        ];
    }
}

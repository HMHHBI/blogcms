<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['post_id', 'user_id', 'parent_id', 'comment_body', 'is_approved'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->with('replies', 'user:id,name');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

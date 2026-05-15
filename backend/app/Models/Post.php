<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'category_id', 'title', 'slug', 'content', 'image_url', 'image_public_id', 'status', 'is_premium'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments()
    {
        // Sirf top-level approved comments load karein
        return $this->hasMany(Comment::class)
            ->whereNull('parent_id')
            ->where('is_approved', true)
            ->latest();
    }
}

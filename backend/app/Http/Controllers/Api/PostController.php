<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
// SDK imports
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

class PostController extends Controller
{
    private function cloudinary()
    {
        $config = Configuration::instance(env('CLOUDINARY_URL'));
        return new UploadApi($config);
    }

    private function sanitizeContent($content)
    {
        // 1. &nbsp; ko normal space se badalna taake frontend par overflow na ho
        $content = str_replace('&nbsp;', ' ', $content);

        // 2. Dangerous tags nikalna (Script, Iframe) par headings/formatting rehne dena
        $allowedTags = '<h1><h2><h3><h4><h5><h6><p><b><strong><i><em><ul><ol><li><br><a>';
        return strip_tags($content, $allowedTags);
    }

    public function index()
    {
        $posts = Post::with('category')->latest()->paginate(10);
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        try {
            $validated = $request->validated();

            $cleanContent = $this->sanitizeContent($validated['content']);

            $imageUrl = null;
            $imagePublicId = null;

            if ($request->hasFile('image')) {
                // Manual SDK Upload
                $result = $this->cloudinary()->upload($request->file('image')->getRealPath(), [
                    'folder' => 'blog-posts'
                ]);

                $imageUrl = $result['secure_url'];
                $imagePublicId = $result['public_id'];
            }

            $post = Post::create([
                'user_id' => $request->user()->id,
                'category_id' => $validated['category_id'],
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']) . '-' . rand(100, 999),
                'content' => $cleanContent,
                'image_url' => $imageUrl,
                'image_public_id' => $imagePublicId,
                'status' => $validated['status'] ?? 'published',
            ]);

            return response()->json([
                'message' => 'Post created successfully!',
                'data' => new PostResource($post)
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Store Error: ' . $e->getMessage()], 500);
        }
    }

    public function update(StorePostRequest $request, Post $post)
    {
        try {
            $validated = $request->validated();

            if (isset($validated['content'])) {
                $validated['content'] = $this->sanitizeContent($validated['content']);
            }

            if ($request->hasFile('image')) {
                // Old image delete logic
                if (!empty($post->image_public_id)) {
                    try {
                        // SDK delete call
                        $config = Configuration::instance(env('CLOUDINARY_URL'));
                        $adminApi = new \Cloudinary\Api\Admin\AdminApi($config);
                        $adminApi->deleteAssets([$post->image_public_id]);
                    } catch (\Exception $e) {
                        Log::info("Image delete skip: " . $e->getMessage());
                    }
                }

                // Manual SDK Upload
                $result = $this->cloudinary()->upload($request->file('image')->getRealPath(), [
                    'folder' => 'blog-posts'
                ]);

                $validated['image_url'] = $result['secure_url'];
                $validated['image_public_id'] = $result['public_id'];
            }

            if ($post->title !== $validated['title']) {
                $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
            }

            $post->update($validated);

            return response()->json([
                'message' => 'Post updated successfully!',
                'data' => new PostResource($post)
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Update Error: ' . $e->getMessage()], 500);
        }
    }

    public function show(Post $post)
    {
        $post->load(['category', 'author', 'comments.user', 'comments.replies']);
        return new PostResource($post);
    }

    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // SDK delete in destroy
        if ($post->image_public_id) {
            try {
                $config = Configuration::instance(env('CLOUDINARY_URL'));
                $adminApi = new \Cloudinary\Api\Admin\AdminApi($config);
                $adminApi->deleteAssets([$post->image_public_id]);
            } catch (\Exception $e) {
            }
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully.']);
    }
}
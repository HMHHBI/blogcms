<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;

// Public Routes
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:3,1');

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

// Protected Routes (Sirf login ke baad)
Route::middleware('auth:sanctum')->group(function () {
    // Categories CRUD
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Posts CRUD
    Route::post('/posts', [PostController::class, 'store']);
    Route::match(['put', 'post'], '/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    // ✅ NEW: Comment System Routes
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->middleware('throttle:10,1');

    // Admin routes: Moderation
    Route::get('/admin/comments', [CommentController::class, 'index']); // Pending list
    Route::patch('/admin/comments/{comment}/approve', [CommentController::class, 'update']); // Approve action
    Route::delete('/admin/comments/{comment}', [CommentController::class, 'destroy']); // Reject/Delete action

    // Dashboard Stats
    Route::get('/admin/stats', function () {
        return response()->json([
            'posts' => \App\Models\Post::count(),
            'categories' => \App\Models\Category::count(),
            'pending_comments' => \App\Models\Comment::where('is_approved', false)->count(),
        ]);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
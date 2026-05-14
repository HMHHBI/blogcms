<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation: Frontend se 'title' aur 'info' aa raha hai
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:categories,name',
            'info' => 'required|string',
        ]);

        // Model mein 'name', 'description', aur 'slug' save karna
        $category = Category::create([
            'name' => $validated['title'],
            'description' => $validated['info'],
            'slug' => Str::slug($validated['title']), // Title se automatically slug banana
        ]);

        return response()->json([
            'message' => 'Category created successfully!',
            'data' => new CategoryResource($category)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        // Single category fetch karna (Route Model Binding)
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'info' => 'required|string',
        ]);

        $category->update([
            'name' => $validated['title'],
            'description' => $validated['info'],
            'slug' => Str::slug($validated['title']),
        ]);

        return response()->json([
            'message' => 'Category updated successfully!',
            'data' => new CategoryResource($category)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Pehle check karein ke is category mein posts toh nahi?
        if ($category->posts()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category with associated posts.'
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully!'
        ]);
    }
}

# 🚀 BlogCMS — Full Stack Blog Management System

A modern full-stack **Blog Content Management System (CMS)** built with **Laravel (REST API)** and **Next.js (React)**.

This project demonstrates a production-style architecture with authentication, CRUD operations, and a clean separation between frontend and backend using a monorepo structure.

---

## 📁 Project Structure
```
blogcms/
├── backend/   → Laravel REST API
├── frontend/  → Next.js application
```
---

## ⚙️ Tech Stack

### 🖥 Backend
- Laravel (PHP Framework)
- Laravel Sanctum Authentication
- RESTful API Architecture
- MySQL Database
- Validation & Resource Controllers

### 🌐 Frontend
- Next.js (React Framework)
- Axios (API integration)
- Tailwind CSS
- Protected Routes & Auth Handling

---

## 🔐 Features

### 👨‍💻 Authentication
- User Registration & Login
- Token-based authentication (Sanctum)
- Protected API routes

### 📝 Blog Management
- Create Posts
- Edit Posts
- Delete Posts
- View Posts

### 🗂 Category System
- Add / Manage Categories
- Assign posts to categories

### 🎯 Frontend Features
- Modern UI design
- Admin dashboard
- Protected routes
- Dynamic post pages
- API-driven content

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/HMHHBI/blogcms.git
cd blogcms
```
2️⃣ Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
#### Backend runs at:
```bash
http://localhost:8000
```
### 3️⃣ Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
#### Frontend runs at:
```
http://localhost:3000
```
### 🔐 Environment Variables
#### Backend (.env)
```bash
APP_NAME=BlogCMS
APP_URL=http://localhost:8000

DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```
## 📡 API Endpoints
Auth
- POST /api/register
- POST /api/login
Posts
- GET /api/posts
- POST /api/posts
- PUT /api/posts/{id}
- DELETE /api/posts/{id}
Categories
- GET /api/categories
- POST /api/categories
## 🧠 What I Learned From This Project
- Full-stack architecture design
- REST API development with Laravel
- Frontend integration with Next.js
- Authentication systems (Sanctum)
- Monorepo project structure
- Real-world CRUD system design
## 🚀 Future Improvements
- Role-based access control (Admin/User)
- Image upload (Cloud storage)
- Pagination & search system
- Refresh token system
- Deployment (Vercel + Render)
## 👨‍💻 Author
Hassan (HMHHBI)

GitHub: https://github.com/HMHHBI
## ⭐ Support
If you like this project, give it a ⭐ on GitHub.

It helps motivate future improvements 🚀

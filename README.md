# BookTracker 📚✨

**BookTracker** is a full-stack web application for readers who want to track the books they've read, rate them, explore what others are reading, and connect with fellow book lovers. Built with Angular 18 and .NET 8, it combines clean design, secure authentication, and rich user features – with plenty more to come.

## 🚀 What You Can Do

### ✅ Initial Features (MVP)
- **Log in securely** (Google login + JWT authentication)
- **Add books** you've read to your **personal library**
- **Rate books** from 1 to 5 stars
- **Edit your own books and ratings**
- **View the global library** of all books added by users
- **Search** for books by title or author
- **See average rating** and vote count for each book
- **See your personal rating** on every book you've rated

### 🔜 Planned Features
- 🛡️ **Admin dashboard** to moderate books and users
- 🏅 **Achievements system** – get medals for high-rated submissions
- 👥 **Friend system** – follow friends and explore their libraries
- 📊 **Statistics** – see your reading trends and rating history
- 💬 **Comments or reviews** for each book
- 📱 **Mobile-optimized experience**

## 🧱 Tech Stack

**Frontend**
- Angular 18 (Standalone Components)
- Bootstrap 5
- Font Awesome
- Angular Router
- Reactive Forms
- TypeScript

**Backend**
- .NET 8 Web API
- Entity Framework Core
- SQLite (for development)
- JWT Authentication
- Google OAuth (via OpenID Connect)

## 🧭 Architecture Overview

- All books are stored in a **shared public library**
- Users can **add any public book to their own personal library**
- Ratings are **per user**, and the **average rating** is shown globally
- Only the **creator** (or an **admin**) can edit or delete a book
- Users have a **profile page** showing their books, ratings, and achievements
- Admins can **remove invalid or abusive books**

## 💡 Vision

BookTracker starts as a simple CRUD app for books – but it's being expanded into a **social reading platform**, where users not only track their own reading but engage with a growing community of fellow readers.

Whether you're just logging your favorite novels or earning achievement badges for great recommendations, BookTracker makes your bookshelf smarter, social, and way more fun.

## 📁 Project Structure

book-tracker/
├── backend/ # .NET 8 API with JWT and Google OAuth
└── frontend/ # Angular 18 app with Bootstrap and router
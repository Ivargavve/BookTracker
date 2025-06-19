# BookTracker 📚✨

**BookTracker** is a full-stack web application for readers who want to track the books they've read, rate them, explore what others are reading, and connect with fellow book lovers. Built with Angular 18 and .NET 8, it combines clean design, secure authentication, and rich user features – with plenty more to come.

## 🚀 What You Can Do

### ✅ Initial Features (MVP)
- **Log in securely** (Google login + JWT authentication)
- **Add books** to the **shared public library**
- **Add books to your personal library** if you’ve read them
- **Rate books** from 1 to 5 stars
- **Edit or delete your own books and ratings**
- **Admins can edit or remove any book**
- **Search** for books in the global library
- **See average rating** and total votes for every book
- **See your personal rating** if you’ve rated a book

### 🔒 Permissions Overview
- Anyone (logged in) can add books to the main library
- Only the **user who created a book** can edit or delete it
- **Admins** can edit or delete **any book** as moderators

### 🔜 Planned Features
- 🛡️ **Admin dashboard** to manage books and users
- 🏅 **Achievements system** – earn medals for high-rated contributions
- 👥 **Friend system** – view and explore your friends' libraries
- 📊 **Reading statistics** and personal analytics
- 💬 **Comments or reviews** on books
- 📱 **Mobile-friendly experience**

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
- Users can **add books they've read to their own personal library**
- Ratings are **per user**, and **aggregated globally**
- A user can **only edit or delete their own books**
- **Admins** can moderate and edit **any book**
- Users have a **profile** with their books, ratings, and achievements

## 💡 Vision

BookTracker starts as a simple CRUD app for books – but it's evolving into a **social reading platform**, where users not only log their reading but connect with others, earn achievements, and explore the broader book community.

Whether you're logging your latest favorite or following what your friends are reading, BookTracker helps you stay connected through books.
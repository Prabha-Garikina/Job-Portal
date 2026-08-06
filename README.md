# HIRE HUB 💼 — A Job Search Platform

HIRE HUB is a full-stack web application that helps job seekers search and discover job listings by title, location, and company. It includes user authentication (sign up / login), a job search interface, an integrated chatbot widget, and a Node.js + MySQL backend.

---

## ✨ Features

- 🔍 **Job Search** — Search job listings by job title, location, and company.
- 📋 **Job Listings Display** — Browse featured/latest job postings with company, location, and description.
- 🔐 **User Authentication** — Sign up and log in with secure, hashed passwords (bcrypt) and JWT-based session tokens.
- 💬 **Chatbot Widget** — An embedded chat assistant available on the home page.
- 📱 **Responsive UI** — Built with Bootstrap 4 and Remix Icon / Font Awesome for a clean, mobile-friendly interface.
- 👥 **About Page** — Team information page listing project contributors.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3
- Bootstrap 4.5.2
- Font Awesome & Remix Icon
- Vanilla JavaScript

**Backend:**
- Node.js + Express
- MySQL (via `mysql` package)
- `bcryptjs` — password hashing
- `jsonwebtoken` (JWT) — authentication tokens
- `body-parser` — request body parsing
- `cors` — cross-origin request handling

---

## 🗂️ Project Structure

```
.
├── index.html          # Login page
├── signup.html         # Sign-up page
├── home.html            # Home page — job search + listings + chatbot
├── home-bkp.html         # Backup copy of the home page
├── about.html           # About Us / team page
├── server.js            # Express backend (auth + job search API)
├── package.json          # Node dependencies and scripts
├── package-lock.json
├── css/                  # Stylesheets (login, signup, home, about, main)
├── js/                   # Client-side scripts (login, signup, script.js)
├── images/               # Team photos and background images
└── chatbot/              # Chatbot widget (chat.html, chat.css, chat.js)
```

> **Note:** `home-bkp.html` appears to be a backup/draft copy with nested/duplicated HTML tags and should likely be removed or cleaned up before deployment.

---

## 📦 Requirements

- Node.js (v14+ recommended)
- MySQL Server
- npm

---

## ⚙️ Setup & Installation

1. **Clone the repository** and install dependencies:

   ```bash
   npm install
   ```

2. **Set up the MySQL database:**

   Create a database named `hirehub` with at least the following tables:

   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE jobs (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     company VARCHAR(255),
     location VARCHAR(255),
     description TEXT,
     link VARCHAR(255)
   );
   ```

3. **Configure database credentials** in `server.js` (host, user, password) to match your local MySQL setup.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server runs at `http://localhost:3000`.

5. Open `index.html` in your browser (or serve the frontend via a static file server) to use the app.

---

## 🔌 API Endpoints

| Method | Endpoint      | Description                                              |
|--------|---------------|------------------------------------------------------------|
| POST   | `/signup`     | Register a new user (`name`, `email`, `password`).        |
| POST   | `/login`      | Authenticate a user and return a JWT token.                |
| GET    | `/api/jobs`   | Search jobs by optional query params: `title`, `location`, `company`. |

---

## 🔒 Security Notes

Before deploying this project publicly, consider:
- Moving the database credentials and JWT secret key out of `server.js` and into environment variables (e.g., using a `.env` file with `dotenv`).
- Wiring up the frontend login/signup forms to actually call the `/login` and `/signup` APIs (currently `signup.html`'s form has no `action`/fetch logic connected).
- Adding input validation and rate-limiting to the authentication endpoints.

---

## 👥 Team

| Name | Student ID | Role |
|------|------------|------|
| Prabha Garikina | 23A31A4464 | Team Lead |
| Pranathi Vadapalli | 23A31A4479 | Team Member |
| Ganesh S | 24A35A4429 | Team Member |
| Arjun P | 23A31A44A0 | Team Member |
| Ganesh A | 24A35A4418 | Team Member |

---

## 🛠️ Possible Improvements

- Connect the job listing cards to live data from the `/api/jobs` endpoint instead of static HTML.
- Wire up `index.html` and `signup.html` forms to call the backend auth APIs.
- Remove or clean up `home-bkp.html`.
- Add pagination for job search results.
- Add a proper `.env`-based configuration for secrets and DB credentials.

---

## 📄 License

This project is open source — feel free to use, modify, and distribute it.

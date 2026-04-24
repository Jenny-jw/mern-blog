## Table of Contents

- [Features](#features)
- [Security Features](#security-features)
- [On the Roadmap](#on-the-roadmap)
- [Quickstart](#quickstart)

## Features

- Enables users to easily post comments on articles.
- Allows articles to be organized and filtered by tags.
- Supports theme switching between light, dark, and neon modes.
- Navbar hides on scroll down and reappears when scrolling up for better readability.
- Automatically timestamps each article upon creation.

## Security Features

- **XSS Protection**
  - Sanitizes user-generated content using `sanitize-html` to prevent stored XSS attacks.
  - Authentication tokens are stored in **HttpOnly cookies**, preventing access via JavaScript and mitigating token theft from XSS.
- **CSRF Protection**
  - Implements CSRF protection using `csurf` middleware.
  - Uses a **double submit cookie pattern**, where the client sends a CSRF token via a custom request header (`x-csrf-token`) for server-side validation.
  - Ensures that authenticated cross-site requests cannot be forged by malicious origins.
- **Secure Authentication**
  - Uses `jsonwebtoken` (JWT) for authentication.
  - Tokens are stored in **secure, HttpOnly cookies** instead of localStorage to reduce exposure to XSS attacks.
  - Cookies are configured with `Secure` and `SameSite=None` to support cross-site requests over HTTPS.
- **Rate Limiting**
  - Applies rate limiting to sensitive endpoints (e.g., comment submission) to prevent abuse and brute-force attacks.
- **Bot Protection**
  - Integrates **reCAPTCHA** to ensure that only human users can perform certain actions (e.g., submitting comments).

- **Secure Cookie Practices**
  - Authentication cookies are configured with:
    - `HttpOnly` (prevents JavaScript access)
    - `Secure` (HTTPS only)
    - `SameSite=None` (required for cross-site API architecture)

## On the Roadmap

- Use timestamps (automatically build creatAt and updateAt) in post schema instead of creatAt
- Implement a subscription system (requires a custom domain).
- Add support for multiple languages.
- A better mode-switching management (create CSS for three modes).
- Replace 'createAt' in post schema with "timestamps: true" and copy the value of 'createAt' to 'createdAt'

## Quickstart

### Start backend (MongoDB service)

> Provide API for front-end calls (data access, login, article CRUD, etc.)

```
mongod --dbpath ~/mern-blog/data/db
```

#### Start express in another terminal

```
cd ~/mern-blog/backend
npm start
```

### Start frontend Vite (React app)

> Provides the interface in the browser (which calls the back-end API)

```
cd ~/mern-blog/frontend/vite_blog
npm run dev
```

> Whenever there's a change in frontend

1. First step

```
cd ~/mern-blog/frontend/vite_blog
npm run build
```

2. Second step

Copy everything under dist/ (but not include dist/ itself) to backend/public/.

3. Third

```
git add .
git commit -m "xxx"
git push
```

Render will automatically re-deploy

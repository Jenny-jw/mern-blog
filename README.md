## Table of Contents

- [Features](#features)
- [Security Features](#security-features)
- [On the Roadmap](#on-the-roadmap)
- [Quickstart](#quickstart)

## Features

- Enables users to easily post comments on articles.
- Allows articles to be organized and filtered by tags.
- Supports theme switching between light and dark modes.
- Navbar hides on scroll down and reappears when scrolling up for better readability.
- Automatically timestamps each article upon creation.

## Security Features

- Sanitizes user comments to prevent XSS attacks using `sanitizeHtml`.
- Implements rate limiting to restrict excessive comment submissions.
- Provides CSRF protection to prevent cross-site request forgery attacks.
- Secures authentication tokens with `jsonwebtoken` and stores them in HttpOnly cookies instead of local storage.
- Integrates reCAPTCHA to ensure only human users can submit comments.

## On the Roadmap

- Implement a subscription system (requires a custom domain).
- Add support for multiple languages.

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

# Start backend Express server

> Provide API for front-end calls (data access, login, article CRUD, etc.)

```
cd backend
npm start
```

# Start MongoDB service

> Data Storage and Query

```
mongod --dbpath ~/mern-blog/data/db
```

## In another terminal

```
node server.js
```

# Start frontend Vite (React app)

> Provides the interface in the browser (which calls the back-end API)

```
cd frontend/vite_blog
npm run dev
```

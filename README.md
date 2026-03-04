# User Management CRUD (MERN + MySQL)

A full-stack User CRUD project built with:
- React (client)
- Express (server)
- MySQL (database)
- Axios + React Router + Bootstrap

## Features
- Create user
- Read all users
- Read single user
- Update user
- Delete user
- Bootstrap-based responsive UI

## Project Structure
```text
sample-student-management/
  client/
  server/
    .env.example
    server.js
```

## API Endpoints
- `GET /users` - get all users
- `GET /get_user/:id` - get one user by id
- `POST /add_user` - create user
- `POST /edit_user/:id` - update user
- `DELETE /delete_user/:id` - delete user

## Database
Create a MySQL table named `user_details` with columns:
- `id` (primary key, auto increment)
- `name`
- `email`
- `age`
- `gender`

Example:
```sql
CREATE TABLE user_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL
);
```

## Environment Setup
1. Go to `server` folder.
2. Create `.env` from `.env.example`.
3. Fill in your MySQL credentials.

Example `.env`:
```env
PORT=3500
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```

## Run Locally
From `server` folder:
```bash
npm install
npm run dev
```

This starts:
- Backend on `http://localhost:3500`
- Frontend on `http://localhost:3000`

## GitHub Safety Checklist
- Do not commit `.env`
- Use `.env.example` for shared config keys
- Never hardcode DB passwords or secrets in code

If `.env` was committed before, remove it from tracking:
```bash
git rm --cached server/.env
git commit -m "Remove .env from tracking"
```


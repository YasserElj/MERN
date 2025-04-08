# School Blog - MERN Stack Project

A simple school blog application built with the MERN stack (MongoDB, Express, React, Node.js) that demonstrates how these technologies work together.

## Features

- User authentication (login/register)
- Create, read, update, and delete blog posts
- View all posts on the homepage
- Simple UI with React components

## Tech Stack

- **MongoDB**: NoSQL database to store blog posts and user data
- **Express.js**: Backend framework for building the API
- **React**: Frontend library for building the user interface
- **Node.js**: JavaScript runtime for the server

## Requirements

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier)

## Setting up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster" (takes a few minutes to provision)

3. **Set Up Database Access**
   - In the left sidebar, click "Database Access"
   - Click "Add New Database User"
   - Set Authentication Method to "Password"
   - Enter a simple username (e.g., "schoolblog")
   - Create a password (avoid special characters)
   - Set User Privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - In the sidebar, click "Network Access"
   - Click "Add IP Address"
   - For development, choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go back to "Database" in sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<username>` and `<password>` with the user credentials you created

6. **Update Your .env File**
   - Create or edit server/.env file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/school-blog?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   - Make sure to add the database name (`school-blog`) after the hostname and before the parameters
   - Generate a JWT secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Project Structure

```
school-blog/
├── client/            # React frontend
├── server/            # Node.js & Express backend
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── controllers/   # Request handlers
└── README.md
```

## Getting Started

### Installation
```bash
# Install dependencies for the main project, server, and client
npm run install-all
```

### Backend Setup
```bash
# Start just the backend server
npm run server
```

### Frontend Setup
```bash
# Start just the frontend client
npm run client
```

### Run Both Concurrently
```bash
# Run both frontend and backend together
npm run dev
```

## Troubleshooting

If you encounter connection issues:
- Double-check your MongoDB username and password
- Ensure you've added the database name in the connection string 
- Verify Network Access settings allow your IP address
- Check that your server is running on the correct port

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user
- **GET /api/posts**: Get all blog posts
- **POST /api/posts**: Create a new blog post
- **GET /api/posts/:id**: Get a specific blog post
- **PUT /api/posts/:id**: Update a blog post
- **DELETE /api/posts/:id**: Delete a blog post 
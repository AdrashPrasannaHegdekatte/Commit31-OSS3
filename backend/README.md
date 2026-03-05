# Backend API Documentation

This directory contains the backend codebase for the application, built with **Node.js**, **Express**, and **MongoDB**.

---

# Folder Structure

The backend follows a standard **MVC (Model–View–Controller)** architecture.

```text
backend/
├── config/           # Configuration files (e.g., database connection)
│   └── db.js         # MongoDB connection setup
├── controllers/      # Route handlers implementing the core logic
│   ├── authController.js # Handles registration and login logic
│   └── userController.js # Handles user-related operations
├── middlewares/      # Custom Express middlewares
├── models/           # Mongoose schemas representing database collections
│   └── userModel.js  # User schema definition
├── routes/           # API route definitions mapping URLs to controllers
│   ├── auth.js       # Authentication routes (/api/auth)
│   └── user.js       # User routes (/api/users)
├── package.json      # Project dependencies and scripts
└── server.js         # Application entry point and server configuration
```

---

# Getting Started

## Prerequisites

Make sure the following tools are installed:

* Node.js
* MongoDB (local instance or MongoDB Atlas)

---

## Installation

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/uni_find
CORS_ORIGIN=http://localhost:3000
```

| Variable    | Description                                |
| ----------- | ------------------------------------------ |
| PORT        | Port where the backend server runs         |
| MONGO_URI   | MongoDB database connection string         |
| CORS_ORIGIN | Allowed frontend origins for CORS requests |

Multiple origins can be specified using commas:

```env
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
```

---

# Running the Server

Start the server in development mode:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

The backend will start at:

```text
http://localhost:5000
```

---

# API Routes

## 1. Authentication Routes

Base URL:

```text
/api/auth
```

### Register User

**Endpoint**

```http
POST /api/auth/register
```

**Description**

Registers a new user in the system.

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**

```text
201 Created
```

Returns the newly created user and a success message.

---

### Login User

**Endpoint**

```http
POST /api/auth/login
```

**Description**

Authenticates a user using email and password.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**

```text
200 OK
```

Returns user information and login confirmation.

---

## 2. User Routes

Base URL:

```text
/api/users
```

### Get Current User Profile

**Endpoint**

```http
GET /api/users/me
```

**Description**

Placeholder endpoint for retrieving the authenticated user's profile.

**Response**

```json
{
  "message": "User profile endpoint - To be implemented with JWT"
}
```

---

# Security Middleware

The backend includes several security-related middleware to protect the application from common web vulnerabilities.

---

## Helmet

Helmet is used to secure HTTP response headers.

Helmet helps protect the application from attacks such as:

* Clickjacking
* MIME-type sniffing
* Some Cross-Site Scripting (XSS) attacks

Helmet is applied globally in `server.js`.

```javascript
app.use(helmet());
```

This ensures every response from the server includes secure HTTP headers.

---

## CORS (Cross-Origin Resource Sharing)

CORS controls which external domains can access the API.

Instead of allowing all origins, the backend allows only specific origins defined in the environment configuration.

Example configuration in `server.js`:

```javascript
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
```

This prevents unauthorized domains from accessing the API.

---

## Rate Limiting

The login endpoint is protected using rate limiting to prevent brute-force attacks.

Rate limiting restricts how many requests a user can send within a certain time period.

Applied to:

```text
POST /api/auth/login
```

Example configuration:

```javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts. Please try again later."
  }
});
```

This configuration allows:

* Maximum **5 login attempts**
* Within **15 minutes**
* Per **IP address**

If the limit is exceeded, the API returns:

```json
{
  "error": "Too many login attempts. Please try again later."
}
```

with status code:

```text
429 Too Many Requests
```

---

# Summary

The backend now includes the following security improvements:

* Secure HTTP headers using Helmet
* Controlled cross-origin access using CORS
* Protection against brute-force login attempts using rate limiting

These security measures help make the backend safer for real-world use and provide a reusable pattern for securing future API endpoints.

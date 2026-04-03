# Zorvyn Assignment

A robust Node.js REST API for managing personal financial records with user authentication, role-based access control, and comprehensive financial analytics.

## Description

This application provides a secure and scalable API for users to track their income and expenses. It includes features like user management, record CRUD operations, financial summaries, and advanced filtering. The API is built with security best practices including JWT authentication, rate limiting, input validation, and role-based permissions.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Viewer, Analyst, Admin)
  - Secure password hashing with bcrypt

- **Financial Record Management**
  - Create, read, update, and delete financial records
  - Support for income and expense tracking
  - Category-based organization
  - Date-based record management

- **Advanced Analytics**
  - Total income and expense calculations
  - Net balance computation
  - Category-wise expense analysis
  - Monthly financial summaries
  - Recent transaction history

- **Security Features**
  - Rate limiting (100 requests per 10 minutes)
  - Input validation and sanitization
  - JWT token verification
  - Role-based route protection

- **API Design**
  - RESTful API endpoints
  - Consistent response format
  - Comprehensive error handling
  - HTTP status code compliance

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing, express-rate-limit
- **Validation**: Custom middleware for input validation
- **Development**: Nodemon for hot reloading

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- npm 
- MySQL Server
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zorvyn_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Environment Setup

1. **Create a `.env` file** in the root directory of the project:
   ```env
   PORT=3000
   SALT=10
   JWT_KEY=your_super_secret_jwt_key_here
   ```

   - `PORT`: The port number on which the server will run (default: 3000)
   - `SALT`: Number of salt rounds for bcrypt hashing (recommended: 10)
   - `JWT_KEY`: A secure secret key for JWT token signing (use a strong, random string)

2. **Database Configuration**
   - The database configuration is defined in `src/config/config.json`
   - For production, consider moving database credentials to environment variables

## Database Setup

1. **Install and start MySQL Server**
   - Download and install MySQL from the official website
   - Start the MySQL service

2. **Create the database**
   ```sql
   CREATE DATABASE zorvyn_assignment_db;
   ```

3. **Update database credentials** (if needed)
   - Edit `src/config/config.json` with your MySQL credentials
   - For security, consider using environment variables for production

4. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

   This will create the necessary tables (`Users` and `Records`) in your database.

## Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```

   The server will start on the port specified in your `.env` file (default: 3000).

2. **Verify the setup**
   - Open your browser and navigate to `http://localhost:3000`
   - The API will be available at `http://localhost:3000/api/v1`

## API Endpoints

All API endpoints are prefixed with `/api/v1`. Authentication is required for most endpoints using Bearer tokens.

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | User login | Public |
| GET | `/getUserById/:id` | Get user by ID | Authenticated |
| GET | `/getUserByEmail` | Get user by email | Authenticated |
| PATCH | `/updateUser/:id` | Update user information | Authenticated |
| DELETE | `/deleteUser/:id` | Delete user | Authenticated |
| PATCH | `/changeUserRole/:id` | Change user role | Admin only |

### Record Management Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/createRecord` | Create a new financial record | Admin |
| GET | `/getRecords/:id` | Get all records for a user | Authenticated |
| GET | `/getByFilters` | Get records with filters | Authenticated |
| PATCH | `/updateRecord/:id` | Update a record | Admin |
| DELETE | `/deleteRecord/:id` | Delete a record | Admin |

### Analytics Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/total-income/:userId` | Get total income for a user | Authenticated |
| GET | `/total-expense/:userId` | Get total expense for a user | Authenticated |
| GET | `/net-balance/:userId` | Get net balance for a user | Authenticated |
| GET | `/expense-by-category/:category/:userId` | Get expenses by category | Authenticated |
| GET | `/recent-activity/:userId` | Get recent transactions | Authenticated |
| GET | `/monthly-summary/:year/:userId` | Get monthly financial summary | Authenticated |

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **Viewer**: Can view their own records 
- **Analyst**: Can view records and access insights
- **Admin**: Full access including record creation, updates, deletions, and user management

## Request/Response Format

### Successful Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "err": null
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "err": "Detailed error description"
}
```

## Middlewares

- **Rate Limiting**: Limits requests to 100 per 10-minute window per IP
- **Authentication**: Verifies JWT tokens and sets user context
- **Authorization**: Checks user roles for route access
- **Input Validation**: Validates request bodies, parameters, and query strings
- **Error Handling**: Centralized error handling with appropriate HTTP status codes

## Input Validation

The API includes comprehensive input validation:

- **User Signup/Login**: Email format and password length validation
- **Record Creation**: Amount (>0), type (income/expense), date format, required fields
- **Filters**: Valid query parameters and value ranges
- **Parameters**: ID validation and existence checks

## Error Handling

The application uses custom error classes and consistent error responses:

- **ServiceError**: For business logic errors
- **ValidationError**: For input validation failures
- **AppError**: For application-level errors

All errors return appropriate HTTP status codes and descriptive messages.

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── helper/           # Utility functions and error  classes
├── middlewares/      # Custom middlewares
├── migrations/       # Database migrations
├── models/           # Sequelize models
├── repository/       # Data access layer
├── routes/           # API routes
├── seeders/          # Database seeders
└── services/         # Business logic services
```



## Author

Anant Rai

---


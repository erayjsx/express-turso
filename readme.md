
---

# Turso and Express API

This is a simple API built with Express.js, providing basic user registration, login functionality, and secure authentication using JWT (JSON Web Tokens). The project uses `bcryptjs` for password hashing and includes basic API key authentication for additional security.

## Features

- **User Registration**: Register a new user with a username, email, and password.
- **User Login**: Login with email and password to receive a JWT token.
- **Password Hashing**: Passwords are securely hashed using `bcryptjs`.
- **API Key Authentication**: Only requests with a valid API key can access the API endpoints.
- **User Management**: List users and manage user information.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Authentication**: JWT for secure login
- **Password Hashing**: bcryptjs for securely storing passwords
- **Security**: Helmet.js for basic security headers and API key authentication
- **Environment Variables**: `.env` file for storing sensitive credentials (e.g., API key, JWT secret)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erayjsx/express-turso.git
   ```

2. Install the dependencies:
   ```bash
   cd express-turso
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL=TURSO_DATABASE_URL
   DATABASE_AUTH_TOKEN=TURSO_AUTH_TOKEN
   JWT_SECRET=SECRET_KEY
   API_SECRET_KEY=API_KEY
   ```

4. Run the server:
   ```bash
   nodemon index.js
   ```

The API will start on `http://localhost:3000`.

## Security

- **Password Hashing**: User passwords are hashed using `bcryptjs` to ensure secure storage and prevent exposure of plain-text passwords.
- **API Key Authentication**: The API uses an API key (`x-api-key` header) to authenticate requests. Only requests with a valid API key can access the endpoints.
- **JWT Authentication**: After a successful login, a JWT token is issued. This token must be used in subsequent requests to access protected endpoints.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README gives an overview of your project, its features, and how to set it up. You can customize it as needed to fit your project.
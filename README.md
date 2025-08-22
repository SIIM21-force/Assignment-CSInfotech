# MERN Stack Developer Assignment

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It appears to be an admin dashboard for managing users, agents, and lists, including functionality for file uploads.

## Project Structure

The project is organized into two main parts:

-   `./mern-admin-app/backend`: The Node.js and Express.js server application.
-   `./mern-admin-app/frontend`: The React client-side application.

## Features

-   User authentication (Login/Register)
-   Dashboard for data visualization and management
-   CRUD operations for Agents and Lists
-   CSV and Excel file uploads

## Technologies Used

-   **Frontend:** React, Vite
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose)
-   **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js & npm (or yarn)
-   MongoDB installed and running on your local machine or a connection string to a cloud instance.

### Installation & Setup

**1. Clone the repository**

```bash
git clone <your-repository-url>
cd Assignment-CSInfotech
```

**2. Setup the Backend**

```bash
cd mern-admin-app/backend
npm install
```

Create a `.env` file in the `mern-admin-app/backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

**3. Setup the Frontend**

```bash
cd ../frontend
npm install
```

The frontend may need a proxy setup in `vite.config.js` or an environment variable to connect to the backend API. Ensure it is configured to make requests to the backend server (e.g., `http://localhost:5000`).

### Running the Application

1.  **Start the Backend Server:**
    From the `mern-admin-app/backend` directory:
    ```bash
    npm start
    ```
    The server should now be running on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    From the `mern-admin-app/frontend` directory:
    ```bash
    npm run dev
    ```
    The React application should now be running and accessible in your browser, typically at `http://localhost:5173` (for Vite).

---

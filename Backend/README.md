# Finance Dashboard Backend API

This directory contains the backend REST API for the Finance Dashboard. It is built using **Node.js, Express, and MongoDB (via Mongoose)** to serve transactional data to the React front end.

## 🚀 Key Features

*   **RESTful CRUD Operations:** Fast, stateless API routes to Add, Read, Update, and Delete transactions.
*   **MongoDB Integration:** Uses Mongoose schemas to ensure type validity, required fields checking, and clean document management.
*   **Aggregation API:** A specialized `/summary` endpoint aggregates data natively on the database layer to compute expense vs. income statistics dynamically.
*   **Custom Error Handling:** A centralized error handling middleware that captures exceptions and outputs structured JSON error responses rather than HTML dumps.

## 🛠️ Technology Stack

*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express](https://expressjs.com/)
*   **Database:** MongoDB via [Mongoose](https://mongoosejs.com/)
*   **Environment Variables:** `dotenv`
*   **CORS:** `cors` middleware for cross-origin requests from the React frontend.

## ⚙️ Getting Started

### Prerequisites

*   **Node.js** (v14 or higher)
*   **MongoDB** Account (Atlas) or local instance.

### Installation & Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:** Ensure you have a `.env` file in the root of the `Backend/` directory with the following variables:
    ```env
    PORT=5000
    NODE_ENV=development
    MONGO_URI=your_mongodb_connection_string
    ```
3.  **Start the Server:**
    ```bash
    # For hot-reloading development server
    npm run dev  # or: nodemon server.js
    
    # For standard runtime
    npm start
    ```
    The server should now be running on `http://localhost:5000`.

## 📡 API Endpoints

All transaction routes prefix with `/api/transactions`.

| Method | Endpoint | Description | Query/Body parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all transactions | `?type=`, `?category=`, `?sort=`, `?search=` |
| **GET** | `/summary` | Get aggregated math for charts | *None* |
| **POST** | `/` | Create a new transaction | Requires JSON body: `title`, `amount`, `category`, `type` |
| **PUT** | `/:id` | Update an existing transaction | Requires matching MongoDB `_id` in URL, plus JSON body |
| **DELETE** | `/:id` | Delete a transaction | Requires matching MongoDB `_id` in URL |

## 📂 Architecture & Explanation

*   **`server.js`:** The foundational base file. It loads environment variables, opens the database connection via `config/db.js`, sets up global middleware (JSON parsing, CORS), registers routes, and appends the custom error handler fallback.
*   **`config/db.js`:** The configuration script that parses the `MONGO_URI` variable to asynchronously connect to the MongoDB host using Mongoose.
*   **`models/Transaction.js`:** Mongoose conceptual schema detailing required definitions (`title`, `amount` as numbers, strict `enum` types for 'income' or 'expense').
*   **`routes/transactionRoutes.js`:** Express Router that connects valid HTTP methods to their respective Controller functions natively.
*   **`controllers/transactionController.js`:** Contains the core business logic. 
    *   *Examples:* Translates HTTP Query parameters (e.g., searches) into complex Mongoose `$regex` and `$match` filters recursively. Aggregates monthly income mapping using `$group`.
*   **`middleware/errorMiddleware.js`:** Intercepts `next(error)` calls thrown by routes/controllers and formats a standard JSON response `{"success": false, "error": "Message"}`.

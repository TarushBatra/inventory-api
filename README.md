# 📦 Inventory Management API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](https://jestjs.io/)
📦 Inventory Management System API

A simple backend API to manage products and inventory in a warehouse.
Built with Node.js, Express, and MongoDB following clean architecture principles.

✨ Features

Product Management (CRUD): Create, Read, Update, Delete products

Inventory Logic:

Increase stock quantity

Decrease stock quantity (with validation: stock cannot go below 0)

Bonus Features:

Low-stock threshold check

Unit tests with Jest + Supertest

In-memory MongoDB for safe testing

🛠 Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Testing: Jest + Supertest + MongoDB Memory Server

Code Quality: ESLint + Prettier

📂 Project Structure
src/
 ├── config/           # Database connection
 ├── controllers/      # Request handling
 ├── models/           # Mongoose models
 ├── routes/           # API routes
 ├── services/         # Business logic
 ├── utils/            # Error handling, helpers
 ├── app.js            # Express app config
 └── server.js         # Entry point
tests/                 # Jest + Supertest test cases

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/inventory-api.git
cd inventory-api

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/inventorydb


ℹ️ For cloud DB, replace MONGO_URI with your MongoDB Atlas connection string.

4️⃣ Start Development Server
npm run dev


Your API will be live at → http://localhost:5000/api/products

📌 API Endpoints
🔹 Product Management
Method	Endpoint	Description
POST	/api/products	Create a product
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
PUT	/api/products/:id	Update product details
DELETE	/api/products/:id	Delete product
🔹 Inventory Operations
Method	Endpoint	Description
PATCH	/api/products/:id/increase	Increase stock { "amount": N }
PATCH	/api/products/:id/decrease	Decrease stock { "amount": N }
🔹 Bonus Feature
Method	Endpoint	Description
GET	/api/products/low-stock	List products below threshold
📖 Example Requests

Create Product

POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High performance laptop",
  "stock_quantity": 5,
  "low_stock_threshold": 2
}


Increase Stock

PATCH /api/products/651a2c4f3e1d2b5c8f9a0b12/increase
Content-Type: application/json

{ "amount": 3 }


Low Stock

GET /api/products/low-stock

🧪 Running Tests

We use Jest + Supertest with an in-memory MongoDB for isolated testing.

Run tests:

npm test


✅ Tests cover:

Product creation

Stock increase / decrease

Preventing insufficient stock operations

Low-stock filtering

📝 Assumptions & Design Choices

Products always start with stock_quantity >= 0.

Stock operations are atomic to avoid race conditions.

Default low_stock_threshold = 5, but customizable per product.

Error responses follow REST conventions (400 Bad Request, 404 Not Found, 500 Internal Server Error).

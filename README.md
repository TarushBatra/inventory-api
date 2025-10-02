# 📦 Inventory Management API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](https://jestjs.io/)

A simple **Inventory Management System API** built with **Node.js, Express, and MongoDB**.  
It allows you to manage products, update stock, enforce business rules (no negative stock), and check for low stock thresholds.  

---

## 🚀 Features
- Product CRUD (Create, Read, Update, Delete)
- Stock management (increase / decrease stock with validation)
- Low stock check
- Prevent stock from going below zero
- Jest + Supertest for testing
- Postman Collection included for quick testing

---

## 📂 Project Structure
inventory-api/
├── src/
│ ├── config/ # Database connection
│ ├── controllers/ # Request handlers
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── utils/ # Error handling
│ ├── app.js # Express app
│ └── server.js # Server entrypoint
├── tests/ # Jest + Supertest test cases
├── .gitignore
├── package.json
├── README.md
└── Inventory API.postman_collection.json

---

## ⚙️ Setup & Installation

### 1. Clone the repo
``bash
git clone https://github.com/TarushBatra/inventory-api.git
cd inventory-api
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file in root:
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventoryDB
4. Start development server
npm run dev
Server runs at 👉 http://localhost:5000

📡 API Endpoints
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update product details
DELETE	/api/products/:id	Delete product
PATCH	/api/products/:id/increase	Increase stock
PATCH	/api/products/:id/decrease	Decrease stock
GET	/api/products/low-stock	Get low stock products
🧪 Running Tests

Run Jest + Supertest tests:
npm test

✅ Tests include:

Create product

Increase stock

Decrease stock

Prevent negative stock

Low stock check

📬 Postman Collection

File: Inventory API.postman_collection.json

To use:

Open Postman

Go to Collections → Import

Select this file

Run sample requests for all endpoints

👨‍💻 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

Jest + Supertest

📌 License

This project is licensed under the MIT License.

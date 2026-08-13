# 💰 Personal Finance & Expense Tracker

A full-stack **Personal Finance & Expense Tracker** built with **React,
Vite, Node.js, Express, and MongoDB**.\
The application allows users to manage income and expenses, view monthly
financial summaries, search and filter transactions, and perform CRUD
operations.

## 🚀 Live Project

-   **Frontend:** Deployed on Netlify
-   **Backend API:** Deployed on Render
-   **GitHub:** https://github.com/Rakib-251/Finance-Expense-Tracker.git

## ✨ Features

-   Add income and expense transactions
-   Edit existing transactions
-   Delete individual transactions
-   Reset/delete all transactions
-   View total monthly income
-   View total monthly expenses
-   View monthly savings/balance
-   Search transactions by title or category
-   Filter transactions by income or expense
-   Select a month to view financial information
-   Indian Rupee (₹) currency formatting
-   Responsive React-based user interface
-   REST API integration with the backend
-   Persistent transaction data using MongoDB

## 🛠️ Technologies Used

### Frontend

-   React.js
-   Vite
-   JavaScript
-   HTML
-   CSS

### Backend

-   Node.js
-   Express.js
-   REST API

### Database

-   MongoDB

### Deployment & Version Control

-   Netlify
-   Render
-   Git
-   GitHub

## 📁 Project Structure

``` text
Finance-Expense-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── ...
│   └── package.json
│
└── README.md
```

## 🔄 Application Flow

``` text
React Frontend
      │
      │ REST API Requests
      ▼
Node.js + Express Backend
      │
      │ Database Operations
      ▼
MongoDB
```

## 🔌 API Operations

The frontend communicates with the deployed backend API for transaction
management.

  Method   Operation
  -------- ------------------------
  GET      Fetch all transactions
  POST     Add a transaction
  PUT      Update a transaction
  DELETE   Delete a transaction
  DELETE   Reset all transactions

The frontend uses the deployed Render backend as its API endpoint.

## 💻 Run the Project Locally

### 1. Clone the repository

``` bash
git clone https://github.com/Rakib-251/Finance-Expense-Tracker.git
cd Finance-Expense-Tracker
```

### 2. Start the backend

``` bash
cd backend
npm install
npm start
```

Make sure your backend environment variables are configured correctly,
including the MongoDB connection.

### 3. Start the frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL in the
terminal.

## 🏗️ Build Frontend for Production

From the `frontend` folder:

``` bash
npm run build
```

The production files will be generated inside the `dist` folder.

## 📊 Main Functionalities

### Dashboard

Displays: - Selected month - Total income - Total expenses -
Savings/balance

### Transactions

Each transaction contains: - Title - Amount - Type - Category - Date -
Description

### Search & Filter

Users can search transactions and filter them by: - All - Income -
Expense

## 🔐 Data

Transaction data is stored in the application's backend/database rather
than only in browser local storage.

## 📌 Future Improvements

-   User authentication and registration
-   Multiple user accounts
-   Expense charts and graphs
-   Budget limits and alerts
-   Export transactions to CSV/PDF
-   Category-wise spending analytics
-   Dark/light theme
-   Improved mobile UI
-   Dashboard statistics and reports

## 👨‍💻 Author

**Rakib Ali**

B.Tech in Computer Science & Engineering\
Brainware University

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on
GitHub.

------------------------------------------------------------------------

### 📄 License

This project is created for learning, portfolio, and educational
purposes.

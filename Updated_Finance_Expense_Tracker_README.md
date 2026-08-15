# 💰 Personal Finance & Expense Tracker

A full-stack personal finance and expense tracking web application built with **React, Node.js, Express.js, and MongoDB**.

The application allows users to create an account, securely log in, and manage personal income and expenses through a simple dashboard.

---

## 🚀 Features

### 🔐 Authentication
- User Sign Up
- User Login
- JWT-based authentication
- Password hashing using bcrypt
- Protected authentication flow
- User-specific transactions
- Password show/hide option
- Confirm Password during registration
- Logout functionality

### 💸 Transaction Management
- Add income
- Add expenses
- Edit transactions
- Delete individual transactions
- Reset/delete all transactions
- View transaction history
- Transaction categories
- Transaction descriptions
- Transaction dates
- Income and expense types

### 🏷️ Category-Based Transaction Form
- Category is selected first when adding a transaction.
- For standard categories, the title is automatically based on the selected category.
- The **Title** field is displayed only when the user selects **Other**.
- Users can enter a custom title when **Other** is selected.

### 📊 Dashboard
- Financial overview
- Balance calculation
- Income summary
- Expense summary
- Monthly summary
- Search transactions
- Filter transactions by income/expense
- Month-based transaction overview
- Recent transaction list

---

## 🛠️ Technology Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- REST API
- JWT
- bcryptjs
- CORS

### Database
- MongoDB
- Mongoose

### Development & Deployment
- VS Code
- Git
- GitHub
- Render

---

## 📁 Project Structure

```text
Personal Finance & Expense Tracker/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Auth.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔐 Authentication

The application provides a separate Login and Sign Up flow.

### Sign Up

The user provides:
- Name
- Email
- Password
- Confirm Password

Password confirmation is checked before registration.

### Login

The user provides:
- Email
- Password

The password can be shown or hidden using the visibility button.

### Authentication Flow

```text
User
 ↓
Sign Up / Login
 ↓
Backend Authentication
 ↓
Password Verification / Hashing
 ↓
JWT Token
 ↓
Authenticated User
 ↓
Dashboard
```

---

# 💰 Transaction Management

Users can manage their personal financial transactions.

A transaction contains:

```text
Transaction
├── user
├── title
├── amount
├── type
├── category
├── date
├── description
└── timestamps
```

Supported transaction types:

```text
Income
Expense
```

### Add Transaction Flow

```text
Select Category
       ↓
Is Category "Other"?
     ↙       ↘
   No         Yes
   ↓           ↓
Title uses    Show Title
Category      input field
     ↘       ↙
       Amount
          ↓
         Type
          ↓
         Date
          ↓
     Description
          ↓
   Save Transaction
```

---

# 🏷️ Transaction Categories

The transaction form supports categories such as:

- Food
- Transport
- Shopping
- Bills
- Salary
- Education
- Entertainment
- Health
- Other

When **Other** is selected, a custom Title field is displayed.

---

# 📊 Dashboard

The dashboard provides:

- Current balance
- Total income
- Total expenses
- Monthly summary
- Recent transactions
- Search
- Income/expense filtering
- Month selection

The balance is calculated from income and expenses:

```text
Balance = Total Income - Total Expenses
```

---

# 🔑 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

## Transaction API

```http
POST /api/transactions
GET /api/transactions
GET /api/transactions/:id
PUT /api/transactions/:id
DELETE /api/transactions/:id
DELETE /api/transactions/reset/all
```

### Example Transaction

```json
{
  "title": "Food",
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "date": "2026-08-14",
  "description": "Monthly groceries"
}
```

For the **Other** category, the title can be a custom value.

---

# 🗃️ Database Models

## User

```text
User
├── name
├── email
├── password
└── timestamps
```

## Transaction

```text
Transaction
├── user
├── title
├── amount
├── type
├── category
├── date
├── description
└── timestamps
```

Transactions are associated with users.

---

# ⚙️ Installation

## Clone

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "Personal Finance & Expense Tracker"
```

## Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

Start:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

## Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 Environment Variables

Never upload `.env` to GitHub.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

Add to `.gitignore`:

```text
.env
node_modules/
dist/
```

Never commit MongoDB credentials, passwords, or JWT secrets.

---

# 🚀 Deployment

### Backend
The backend is configured for deployment using **Render**.

### Database
The project uses **MongoDB**.

### Frontend
The React/Vite frontend can be deployed using a suitable static hosting platform.

---

# 🔒 Security

The project uses:

- Password hashing
- JWT authentication
- Protected authentication flow
- User-specific transaction handling
- Environment variables for sensitive values
- CORS configuration

Sensitive credentials should never be committed to GitHub.

---

# 🧪 Application Flow

```text
Open Application
       ↓
      Login
       ↓
Authentication Successful
       ↓
    Dashboard
       ↓
Add Income / Expense
       ↓
Select Category
       ↓
If "Other" → Enter Custom Title
       ↓
Transaction Saved
       ↓
View / Search / Filter
       ↓
Edit or Delete
       ↓
Logout
       ↓
Login Again
       ↓
Access Personal Transactions
```

---

# 📸 Screenshots

Add screenshots of the application here:

```markdown
## Login
![Login Page](screenshots/login.png)

## Sign Up
![Sign Up Page](screenshots/signup.png)

## Dashboard
![Dashboard](screenshots/dashboard.png)

## Add Transaction
![Add Transaction](screenshots/add-transaction.png)
```

---

# 🎯 Future Improvements

Potential future improvements include:

- 📈 Expense charts
- 📊 Monthly financial reports
- 📅 Advanced date filtering
- 💳 Budget management
- 🔔 Spending alerts
- 📥 Export transactions to CSV/PDF
- 🌙 Dark/Light theme
- 👤 User profile
- 🔑 Forgot password
- 📱 Improved mobile responsiveness

---

# 👨‍💻 Author

**Rakib Ali**

B.Tech in Computer Science & Engineering  
Brainware University

---

# ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

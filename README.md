# 💰 Personal Finance & Expense Tracker

A full-stack personal finance and expense tracking web application built with **React, Node.js, Express.js, and MongoDB**.

## 🚀 Features

### 🔐 Authentication
- User Sign Up and Login
- Password hashing with bcrypt
- JWT-based authentication
- Protected transaction routes
- User-specific transactions
- Password show/hide
- Confirm password during registration
- Logout

### 💸 Transaction Management
- Add income and expenses
- Edit transactions
- Delete transactions
- Delete all personal transactions
- View transaction history
- Categories, descriptions, dates, and transaction types

### 📊 Dashboard
- Search transactions
- Filter by transaction type
- Filter by month
- Track income and expenses

## 🛠️ Tech Stack

**Frontend:** React.js, JavaScript, HTML, CSS, Vite

**Backend:** Node.js, Express.js, REST API, JWT, bcryptjs, CORS

**Database:** MongoDB, Mongoose

**Tools:** Git, GitHub, Render, VS Code

## 📁 Project Structure

```text
Personal Finance & Expense Tracker/
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
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Auth.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔐 Authentication Flow

```text
Sign Up
   ↓
Name + Email + Password
   ↓
bcrypt password hashing
   ↓
MongoDB
```

```text
Login
   ↓
Verify credentials
   ↓
JWT token
   ↓
Protected dashboard
```

## 🔑 API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

### Transactions

All transaction routes require:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/transactions` | Create transaction |
| GET | `/api/transactions` | Get user's transactions |
| GET | `/api/transactions/:id` | Get one transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| DELETE | `/api/transactions/reset/all` | Delete user's transactions |

## 🗃️ Database Models

### User

```text
User
├── name
├── email
├── password
└── timestamps
```

### Transaction

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

Each transaction belongs to a specific user.

## ⚙️ Installation

### Clone

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "Personal Finance & Expense Tracker"
```

### Backend

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

### Frontend

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

## 🌐 Environment Variables

Never upload `.env` to GitHub.

Add to `.gitignore`:

```text
.env
node_modules/
dist/
```

## 🚀 Deployment

- Frontend: Vercel or Netlify
- Backend: Render
- Database: MongoDB Atlas

## 🔒 Security

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- User-specific transactions
- Environment variables for secrets
- CORS configuration

Never commit passwords, MongoDB credentials, or JWT secrets.

## 🧪 User Flow

```text
Open Application
       ↓
     Login
       ↓
Authentication successful
       ↓
     Dashboard
       ↓
Add Income / Expense
       ↓
Transaction stored in MongoDB
       ↓
Transaction linked to user
       ↓
Logout
       ↓
Login again
       ↓
Personal transactions restored
```

## 📸 Screenshots

Add your screenshots here:

```markdown
## Login
![Login Page](screenshots/login.png)

## Sign Up
![Sign Up Page](screenshots/signup.png)

## Dashboard
![Dashboard](screenshots/dashboard.png)
```

## 🎯 Future Improvements

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

## 👨‍💻 Author

**Rakib Ali**

B.Tech in Computer Science & Engineering  
Brainware University

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

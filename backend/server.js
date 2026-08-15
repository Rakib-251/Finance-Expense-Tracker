const dns = require("dns");

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Personal Finance Tracker API is running!"
    });
});


// ===============================
// HEALTH CHECK
// ===============================

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Finance Tracker API is healthy"
    });
});


// ===============================
// AUTH ROUTES
// ===============================

app.use(
    "/api/auth",
    authRoutes
);


// ===============================
// TRANSACTION ROUTES
// ===============================

app.use(
    "/api/transactions",
    transactionRoutes
);


// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
        path: req.originalUrl
    });
});


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        const PORT =
            process.env.PORT || 5000;

        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );

            console.log(
                `Health check: http://localhost:${PORT}/health`
            );

        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    });
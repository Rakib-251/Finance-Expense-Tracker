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
    res.send("Personal Finance Tracker API is running!");
});


// ===============================
// TRANSACTION ROUTES
// ===============================

app.use(
    "/api/transactions",
    transactionRoutes
);


// ===============================
// AUTHENTICATION ROUTES
// ===============================

app.use(
    "/api/auth",
    authRoutes
);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });
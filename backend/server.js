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
const Transaction = require("./models/Transaction");

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
// RESET ALL TRANSACTIONS
// ===============================

app.delete("/api/transactions/reset/all", async (req, res) => {
    try {
        const result = await Transaction.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All transactions deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error("Reset error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ===============================
// TRANSACTION ROUTES
// ===============================

app.use(
    "/api/transactions",
    transactionRoutes
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
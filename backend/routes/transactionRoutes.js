const express = require("express");

const router = express.Router();

const {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");


// =========================
// PROTECT ALL TRANSACTION ROUTES
// =========================

router.use(authMiddleware);


// =========================
// CREATE
// =========================

router.post("/", createTransaction);


// =========================
// GET ALL
// =========================

router.get("/", getTransactions);


// =========================
// RESET ALL USER TRANSACTIONS
// =========================

router.delete("/reset/all", deleteAllTransactions);


// =========================
// GET ONE
// =========================

router.get("/:id", getTransaction);


// =========================
// UPDATE
// =========================

router.put("/:id", updateTransaction);


// =========================
// DELETE ONE
// =========================

router.delete("/:id", deleteTransaction);


module.exports = router;
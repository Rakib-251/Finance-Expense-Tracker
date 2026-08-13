const Transaction = require("../models/Transaction");


// CREATE TRANSACTION
const createTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            date,
            description
        } = req.body;

        if (
            !title ||
            amount === undefined ||
            !type ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const transaction = await Transaction.create({
            title,
            amount: Number(amount),
            type,
            category,
            date,
            description: description || ""
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Create transaction error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL TRANSACTIONS
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .sort({
                date: -1,
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        console.error("Get transactions error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE TRANSACTION
const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        console.error("Get transaction error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
    try {
        const transaction =
            await Transaction.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Update transaction error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE ONE TRANSACTION
const deleteTransaction = async (req, res) => {
    try {
        const transaction =
            await Transaction.findByIdAndDelete(
                req.params.id
            );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Delete transaction error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE ALL TRANSACTIONS
const deleteAllTransactions = async (req, res) => {
    try {
        const result = await Transaction.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All transactions deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error(
            "Delete all transactions error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions
};
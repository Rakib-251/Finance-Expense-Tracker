import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://finance-expense-tracker-api-3yh8.onrender.com/api/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  // =========================
  // GET TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setTransactions(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Transaction could not be saved"
        );
      }

      resetForm();
      await fetchTransactions();

    } catch (error) {
      console.error("Save error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date
        ? new Date(transaction.date)
            .toISOString()
            .slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      description: transaction.description || "",
    });

    setShowForm(true);
  };

  // =========================
  // DELETE ONE
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Transaction could not be deleted"
        );
      }

      await fetchTransactions();

    } catch (error) {
      console.error("Delete error:", error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  // =========================
  // RESET ALL
  // =========================

  const handleReset = async () => {
    const confirmed = window.confirm(
      "This will permanently delete ALL transactions. Are you sure?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/reset/all`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to reset transactions"
        );
      }

      setTransactions([]);

      alert("All transactions deleted successfully.");

    } catch (error) {
      console.error("Reset error:", error);
      alert(`Reset failed: ${error.message}`);
    }
  };

  // =========================
  // MONTHLY DATA
  // =========================

  const monthlyTransactions = transactions.filter(
    (transaction) => {
      const transactionMonth = new Date(transaction.date)
        .toISOString()
        .slice(0, 7);

      return transactionMonth === selectedMonth;
    }
  );

  const totalIncome = monthlyTransactions
    .filter(
      (transaction) => transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalExpense = monthlyTransactions
    .filter(
      (transaction) => transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = totalIncome - totalExpense;

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(searchText) ||
        transaction.category
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        filterType === "all" ||
        transaction.type === filterType;

      return matchesSearch && matchesType;
    }
  );

  // =========================
  // FORMATTERS
  // =========================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(
      Number(amount)
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatMonth = (month) => {
    return new Date(`${month}-01`).toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            ₹
          </div>

          <div>
            <h1>Finance Tracker</h1>
            <span>Personal Finance</span>
          </div>

        </div>

        <div className="nav-actions">

          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="add-btn"
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
          >
            + Add Transaction
          </button>

        </div>

      </header>


      <main className="dashboard">

        {/* WELCOME */}

        <section className="welcome">

          <div>

            <p className="small-heading">
              FINANCIAL OVERVIEW
            </p>

            <h2>
              Manage your money smarter.
            </h2>

            <p className="welcome-text">
              Keep track of your income, expenses and
              monthly savings.
            </p>

          </div>


          <div className="month-selector">

            <label>
              Month
            </label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(event.target.value)
              }
            />

          </div>

        </section>


        {/* SUMMARY CARDS */}

        <section className="summary-grid">

          <div className="summary-card">

            <div className="card-top">

              <span>
                Balance
              </span>

              <div className="card-icon">
                ₹
              </div>

            </div>

            <h3>
              ₹{formatAmount(balance)}
            </h3>

            <p>
              {formatMonth(selectedMonth)}
            </p>

          </div>


          <div className="summary-card">

            <div className="card-top">

              <span>
                Income
              </span>

              <div className="card-icon">
                ↗
              </div>

            </div>

            <h3 className="income-text">
              ₹{formatAmount(totalIncome)}
            </h3>

            <p>
              Money received
            </p>

          </div>


          <div className="summary-card">

            <div className="card-top">

              <span>
                Expenses
              </span>

              <div className="card-icon">
                ↘
              </div>

            </div>

            <h3 className="expense-text">
              ₹{formatAmount(totalExpense)}
            </h3>

            <p>
              Money spent
            </p>

          </div>

        </section>


        {/* MONTHLY SUMMARY */}

        <section className="monthly-summary">

          <div className="section-title">

            <p className="small-heading">
              MONTHLY SUMMARY
            </p>

            <h2>
              {formatMonth(selectedMonth)}
            </h2>

          </div>


          <div className="monthly-grid">

            <div>

              <span>
                Income
              </span>

              <strong className="income-text">
                +₹{formatAmount(totalIncome)}
              </strong>

            </div>


            <div>

              <span>
                Expenses
              </span>

              <strong className="expense-text">
                -₹{formatAmount(totalExpense)}
              </strong>

            </div>


            <div>

              <span>
                Savings
              </span>

              <strong>
                ₹{formatAmount(balance)}
              </strong>

            </div>

          </div>

        </section>


        {/* TRANSACTIONS */}

        <section className="transactions-section">

          <div className="section-header">

            <div>

              <p className="small-heading">
                TRANSACTIONS
              </p>

              <h2>
                Recent Transactions
              </h2>

            </div>

            <span className="transaction-count">
              {filteredTransactions.length} transactions
            </span>

          </div>


          {/* SEARCH AND FILTER */}

          <div className="filters">

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />


            <select
              value={filterType}
              onChange={(event) =>
                setFilterType(event.target.value)
              }
            >

              <option value="all">
                All
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

            </select>

          </div>


          {/* EMPTY STATE */}

          {filteredTransactions.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ₹
              </div>

              <h3>
                No transactions found
              </h3>

              <p>
                Add an income or expense to start
                tracking your finances.
              </p>

              <button
                className="add-btn"
                onClick={() => setShowForm(true)}
              >
                + Add Transaction
              </button>

            </div>

          ) : (

            <div className="transaction-list">

              {filteredTransactions.map(
                (transaction) => (

                  <div
                    className="transaction-item"
                    key={transaction._id}
                  >

                    <div className="transaction-main">

                      <div
                        className={`transaction-icon ${
                          transaction.type
                        }`}
                      >
                        {transaction.type === "income"
                          ? "↗"
                          : "↘"}
                      </div>


                      <div>

                        <h3>
                          {transaction.title}
                        </h3>

                        <p>
                          {transaction.category}
                          {" • "}
                          {formatDate(
                            transaction.date
                          )}
                        </p>

                      </div>

                    </div>


                    <div className="transaction-right">

                      <strong
                        className={
                          transaction.type === "income"
                            ? "income-text"
                            : "expense-text"
                        }
                      >
                        {transaction.type === "income"
                          ? "+"
                          : "-"}
                        ₹
                        {formatAmount(
                          transaction.amount
                        )}
                      </strong>


                      <div className="transaction-actions">

                        <button
                          onClick={() =>
                            handleEdit(transaction)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-action"
                          onClick={() =>
                            handleDelete(
                              transaction._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>


      {/* ADD / EDIT MODAL */}

      {showForm && (

        <div className="modal-overlay">

          <div className="transaction-form">

            <div className="form-header">

              <div>

                <p className="small-heading">
                  {editingId ? "UPDATE" : "NEW"}
                </p>

                <h2>
                  {editingId
                    ? "Edit Transaction"
                    : "Add Transaction"}
                </h2>

              </div>


              <button
                className="close-btn"
                onClick={resetForm}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Monthly Salary"
                required
              />


              <div className="form-row">

                <div>

                  <label>
                    Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />

                </div>


                <div>

                  <label>
                    Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >

                    <option value="expense">
                      Expense
                    </option>

                    <option value="income">
                      Income
                    </option>

                  </select>

                </div>

              </div>


              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option>
                  Food
                </option>

                <option>
                  Transport
                </option>

                <option>
                  Shopping
                </option>

                <option>
                  Bills
                </option>

                <option>
                  Salary
                </option>

                <option>
                  Education
                </option>

                <option>
                  Entertainment
                </option>

                <option>
                  Health
                </option>

                <option>
                  Other
                </option>

              </select>


              <label>
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />


              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional note..."
              />


              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="submit-btn"
                >
                  {editingId
                    ? "Save Changes"
                    : "Add Transaction"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
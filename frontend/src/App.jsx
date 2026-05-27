import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    expenseDate: "",
    paymentMode: "",
  });

  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadExpenses();
      loadDashboard();
    }
  }, [token]);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      } else {
        alert("Invalid Credentials");
      }
    } catch {
      alert("Login Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const loadExpenses = async () => {
    const res = await axios.get("http://localhost:8080/api/expenses");
    setExpenses(res.data);
  };

  const loadDashboard = async () => {
    const res = await axios.get("http://localhost:8080/api/expenses/dashboard");
    setDashboard(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveExpense = async () => {
    if (
      !form.title ||
      !form.category ||
      !form.amount ||
      !form.expenseDate ||
      !form.paymentMode
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:8080/api/expenses/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:8080/api/expenses", form);
    }

    setForm({
      title: "",
      category: "",
      amount: "",
      expenseDate: "",
      paymentMode: "",
    });

    loadExpenses();
    loadDashboard();
  };

  const editExpense = (expense) => {
    setEditId(expense.id);
    setForm({
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      paymentMode: expense.paymentMode || "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      title: "",
      category: "",
      amount: "",
      expenseDate: "",
      paymentMode: "",
    });
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    await axios.delete(`http://localhost:8080/api/expenses/${id}`);
    loadExpenses();
    loadDashboard();
  };

  let filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      (expense.paymentMode || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (sortOrder === "high") {
    filteredExpenses = [...filteredExpenses].sort((a, b) => b.amount - a.amount);
  }

  if (sortOrder === "low") {
    filteredExpenses = [...filteredExpenses].sort((a, b) => a.amount - b.amount);
  }

  if (!token) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h2>Expense Tracker Login</h2>
          <p className="text-muted">Secure dashboard using JWT login</p>

          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100" onClick={login}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">💰 Expense Tracker Dashboard</span>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="container py-4">
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="stat-card">
              <p>Total Spent</p>
              <h2>₹ {dashboard.totalSpent || 0}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <p>Total Transactions</p>
              <h2>{dashboard.totalTransactions || 0}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <p>Top Category</p>
              <h2>{dashboard.topCategory || "None"}</h2>
            </div>
          </div>
        </div>

        <div className="card shadow-sm p-4 mb-4">
          <h4 className="mb-3">{editId ? "Update Expense" : "Add New Expense"}</h4>

          <div className="row g-3">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Expense Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                name="paymentMode"
                value={form.paymentMode}
                onChange={handleChange}
              >
                <option value="">Payment</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                name="expenseDate"
                value={form.expenseDate}
                onChange={handleChange}
              />

              <div className="form-check mt-1 small text-muted">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        expenseDate: new Date().toISOString().split("T")[0],
                      });
                    }
                  }}
                />
                <label className="form-check-label">Use today's date</label>
              </div>
            </div>

            <div className="col-md-1">
              <button className="btn btn-primary w-100" onClick={saveExpense}>
                {editId ? "Update" : "Add"}
              </button>
            </div>

            {editId && (
              <div className="col-md-2">
                <button className="btn btn-outline-secondary w-100" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="card shadow-sm p-4">
          <div className="row g-3 mb-3 align-items-center">
            <div className="col-md-4">
              <h4>Expense Records</h4>
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Search title/category/payment"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by Amount</option>
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
            </div>
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>
                    <span className="badge bg-info text-dark">{expense.category}</span>
                  </td>
                  <td>{expense.paymentMode || "-"}</td>
                  <td>₹ {expense.amount}</td>
                  <td>{expense.expenseDate}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editExpense(expense)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
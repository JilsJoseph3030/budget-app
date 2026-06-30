import { useMemo, useState } from "react";

const EXPENSE_CATEGORIES = [
  { value: "Food", label: "Food 🍔" },
  { value: "Shopping", label: "Shopping 🛍️" },
  { value: "Housing", label: "Housing 🏠" },
  { value: "Transport", label: "Transport 🚗" },
  { value: "Entertainment", label: "Entertainment 🎬" },
  { value: "Health", label: "Health 🏥" },
  { value: "Others", label: "Others 📦" }
];

const INCOME_CATEGORIES = [
  { value: "Salary", label: "Salary 💰" },
  { value: "Freelance", label: "Freelance 💻" },
  { value: "Investments", label: "Investments 📈" },
  { value: "Others", label: "Others 📦" }
];

export default function BudgetForm({ setTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const parsedAmount = useMemo(() => {
    const n = Number(amount);
    if (!Number.isFinite(n)) return null;
    return n;
  }, [amount]);

  const canSubmit =
    text.trim().length > 0 && parsedAmount !== null && parsedAmount > 0 && date.length > 0;

  const handleTypeChange = (newType) => {
    setType(newType);
    if (newType === "income") {
      setCategory("Salary");
    } else {
      setCategory("Food");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newTransaction = {
      id: Date.now(),
      text: text.trim(),
      amount: parsedAmount,
      type,
      category,
      date,
    };

    setTransactions((prev) => [newTransaction, ...prev]); // Prepend to show newest first
    setText("");
    setAmount("");
  };

  const currentCategories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="card w-full max-w-md mx-auto">
      <div className="card-header mb-6">
        <h2 className="card-title text-slate-800 flex items-center gap-2">
          <span>📝</span> Add Transaction
        </h2>
        <span className="chip chip-indigo">New</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Description</label>
          <input
            type="text"
            placeholder="e.g. Groceries, Client Payment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input text-slate-800 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input text-slate-800 font-semibold"
              min={0}
              step={0.01}
            />
          </div>

          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input text-slate-800 text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Type</label>
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="input text-slate-800 font-semibold"
            >
              <option value="expense">Expense 💸</option>
              <option value="income">Income 💰</option>
            </select>
          </div>

          <div>
            <label className="form-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input text-slate-800 font-medium"
            >
              {currentCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`btn w-full mt-2 cursor-pointer font-bold ${
            canSubmit ? "btn-primary hover:scale-[1.02]" : "btn-disabled"
          }`}
        >
          Add to Ledger
        </button>
      </form>
    </div>
  );
}

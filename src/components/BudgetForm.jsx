import { useMemo, useState } from "react";

export default function BudgetForm({ setTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const parsedAmount = useMemo(() => {
    const n = Number(amount);
    if (!Number.isFinite(n)) return null;
    return n;
  }, [amount]);

  const canSubmit = text.trim().length > 0 && parsedAmount !== null && parsedAmount >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newTransaction = {
      id: Date.now(),
      text: text.trim(),
      amount: parsedAmount,
      type,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setText("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-0">
      <div className="grid gap-3 sm:grid-cols-1">
        <div>
          <label className="form-label">Description</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Amount</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
            min={0}
            step={0.01}
          />
        </div>

        <div>
          <label className="form-label">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`btn ${canSubmit ? "btn-primary" : "btn-disabled"}`}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}


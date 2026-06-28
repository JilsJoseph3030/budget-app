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

  const canSubmit =
    text.trim().length > 0 && parsedAmount !== null && parsedAmount >= 0;

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
    <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <div className="grid gap-4">
        <div>
          <label className="form-label">Description</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            step={0.01}
          />
        </div>

        <div>
          <label className="form-label">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full mt-6 py-3 rounded-lg font-semibold shadow-md transition-transform ${
            canSubmit
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

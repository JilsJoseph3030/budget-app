import { useState } from "react";

const getCategoryEmoji = (category) => {
  const emojis = {
    Food: "🍔",
    Shopping: "🛍️",
    Housing: "🏠",
    Transport: "🚗",
    Entertainment: "🎬",
    Health: "🏥",
    Salary: "💰",
    Freelance: "💻",
    Investments: "📈",
    Others: "📦"
  };
  return emojis[category] || "📦";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

export default function ExpenseList({ transactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'income' | 'expense'

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" ? true : t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Sort: Chronological descending (by date, then by id)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a.date === b.date) {
      return b.id - a.id;
    }
    return b.date.localeCompare(a.date);
  });

  return (
    <div className="card w-full max-w-4xl mx-auto">
      <div className="card-header flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="card-title text-slate-800 flex items-center gap-2">
            <span>🧾</span> Transaction Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Showing {sortedTransactions.length} of {transactions.length} entries
          </p>
        </div>

        {/* Filters and Search controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input text-xs w-full sm:max-w-[200px]"
          />
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50 w-full sm:w-auto">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                typeFilter === "all"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("income")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                typeFilter === "income"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setTypeFilter("expense")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                typeFilter === "expense"
                  ? "bg-white text-rose-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Expense
            </button>
          </div>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg className="w-20 h-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="text-sm font-bold text-slate-700 mt-4">No Transactions Found</h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            {transactions.length === 0 
              ? "Your ledger is empty. Add a new transaction above to get started!"
              : "No transactions match your search filters. Try clearing them."}
          </p>
        </div>
      ) : (
        <div className="max-h-[480px] overflow-y-auto pr-1 space-y-2.5">
          {sortedTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-4 bg-white/40 border border-slate-200/40 rounded-2xl hover:bg-white/70 transition-all shadow-sm hover:shadow-md gap-3"
            >
              {/* Category Icon and Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-inner shrink-0">
                  {getCategoryEmoji(t.category)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{t.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                      {formatDate(t.date)}
                    </span>
                    <span 
                      className={`badge text-[9px] shrink-0 ${
                        t.type === "income" ? "badge-emerald" : "badge-rose"
                      }`}
                    >
                      {t.category || "General"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount and Deletion */}
              <div className="flex items-center gap-3 shrink-0">
                <span 
                  className={`font-extrabold text-sm ${
                    t.type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
                
                <button
                  onClick={() => handleDelete(t.id)}
                  title="Delete transaction"
                  className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-700 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

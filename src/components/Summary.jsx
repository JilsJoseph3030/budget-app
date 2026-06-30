import { useState } from "react";

const CATEGORY_COLORS = {
  Food: "#f59e0b",       // Amber
  Shopping: "#ec4899",   // Pink
  Housing: "#3b82f6",    // Blue
  Transport: "#8b5cf6",  // Purple
  Entertainment: "#e11d48", // Rose
  Health: "#10b981",     // Emerald
  Others: "#6b7280"      // Gray
};

export default function Summary({ transactions, budgetLimit, setBudgetLimit }) {
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [limitInput, setLimitInput] = useState(budgetLimit.toString());

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  // Aggregate expenses by category
  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const cat = t.category || "Others";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
    });

  const totalExpense = expenses;
  const r = 36;
  const circumference = 2 * Math.PI * r; // ~226.19

  const segments = [];
  let accumulatedPercent = 0;

  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount <= 0) return;
    const percentage = amount / totalExpense;
    const strokeLength = percentage * circumference;
    const strokeOffset = circumference - accumulatedPercent * circumference;
    
    segments.push({
      category: cat,
      amount,
      percentage: percentage * 100,
      color: CATEGORY_COLORS[cat] || "#6b7280",
      strokeDasharray: `${strokeLength} ${circumference}`,
      strokeDashoffset: strokeOffset,
    });
    
    accumulatedPercent += percentage;
  });

  const percentSpent = budgetLimit > 0 ? (expenses / budgetLimit) * 100 : 0;
  
  // Progress bar color matching budget status
  let progressBarColor = "bg-emerald-500";
  let progressTextColor = "text-emerald-600";
  if (percentSpent >= 100) {
    progressBarColor = "bg-rose-500 animate-pulse";
    progressTextColor = "text-rose-600 font-bold";
  } else if (percentSpent >= 80) {
    progressBarColor = "bg-amber-500";
    progressTextColor = "text-amber-600 font-semibold";
  }

  const handleSaveLimit = () => {
    const parsed = Number(limitInput);
    if (!isNaN(parsed) && parsed >= 0) {
      setBudgetLimit(parsed);
      setIsEditingLimit(false);
    }
  };

  return (
    <div className="card w-full">
      <div className="card-header mb-6">
        <h2 className="card-title text-slate-800 flex items-center gap-2">
          <span>📊</span> Financial Overview
        </h2>
        <span className="chip chip-slate">Monthly</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat flex flex-col justify-between">
          <span className="stat-label">Income</span>
          <span className="stat-value font-bold text-emerald-600">
            ₹{income.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="stat flex flex-col justify-between">
          <span className="stat-label">Expenses</span>
          <span className="stat-value font-bold text-rose-600">
            ₹{expenses.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="stat flex flex-col justify-between">
          <span className="stat-label">Net Balance</span>
          <span className={`stat-value font-bold ${balance >= 0 ? "text-indigo-600" : "text-red-500"}`}>
            ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Budget Limit Config and Progress */}
      <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-semibold">Spending Cap:</span>
          {isEditingLimit ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={limitInput}
                onChange={(e) => setLimitInput(e.target.value)}
                className="w-24 p-1 px-2 text-xs border border-indigo-400 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 text-slate-800"
                min={0}
              />
              <button 
                onClick={handleSaveLimit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded p-1 px-2 text-[10px] font-bold cursor-pointer"
              >
                Save
              </button>
              <button 
                onClick={() => { setIsEditingLimit(false); setLimitInput(budgetLimit.toString()); }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-600 rounded p-1 px-2 text-[10px] font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-slate-800 font-bold">₹{budgetLimit.toLocaleString("en-IN")}</span>
              <button 
                onClick={() => setIsEditingLimit(true)}
                className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold hover:underline cursor-pointer"
              >
                (Edit)
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${progressBarColor}`}
              style={{ width: `${Math.min(percentSpent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] mt-1.5">
            <span className="text-slate-400">{percentSpent.toFixed(0)}% of Limit</span>
            <span className={progressTextColor}>
              {percentSpent >= 100 ? "⚠️ Overspending!" : `₹${(budgetLimit - expenses).toLocaleString("en-IN")} left`}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Chart Section */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-1.5">
          <span>🍩</span> Expense Breakdown by Category
        </h3>

        {expenses <= 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={r} fill="transparent" stroke="#e2e8f0" strokeWidth="10" />
              <circle cx="50" cy="50" r={r - 10} fill="transparent" stroke="#f1f5f9" strokeWidth="1" />
            </svg>
            <p className="text-xs mt-2 font-medium">No expenses to display in chart</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* SVG circle donut */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg width="144" height="144" viewBox="0 0 100 100" className="w-full h-full">
                {segments.map((seg) => (
                  <circle
                    key={seg.category}
                    cx="50"
                    cy="50"
                    r={r}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="10"
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-300 hover:stroke-[12px] cursor-pointer"
                  />
                ))}
              </svg>
              {/* Donut Hole Total Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">SPENT</span>
                <span className="text-sm font-extrabold text-slate-800">
                  ₹{expenses.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Custom chart legend */}
            <div className="flex-1 space-y-1.5 w-full max-w-[200px]">
              {segments.map((seg) => (
                <div key={seg.category} className="flex justify-between items-center text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0" 
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="truncate max-w-[80px]">{seg.category}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="font-bold text-slate-700">₹{seg.amount.toFixed(0)}</span> ({seg.percentage.toFixed(0)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

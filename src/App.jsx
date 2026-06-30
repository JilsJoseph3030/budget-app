import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BudgetForm from "./components/BudgetForm";
import Summary from "./components/Summary";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("aura_transactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    try {
      const saved = localStorage.getItem("aura_budget_limit");
      return saved ? Number(saved) : 20000;
    } catch {
      return 20000;
    }
  });

  useEffect(() => {
    localStorage.setItem("aura_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("aura_budget_limit", budgetLimit.toString());
  }, [budgetLimit]);

  return (
    <div className="min-h-screen text-slate-800 font-inter">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
        <div className="text-center space-y-2 py-4">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AuraBudget Dashboard
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Take control of your finances. Add income and expenses, set monthly goals, and track your visual balance in real-time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Summary 
            transactions={transactions} 
            budgetLimit={budgetLimit} 
            setBudgetLimit={setBudgetLimit} 
          />
          <BudgetForm setTransactions={setTransactions} />
        </div>

        <ExpenseList 
          transactions={transactions} 
          setTransactions={setTransactions} 
        />
      </main>
    </div>
  );
}

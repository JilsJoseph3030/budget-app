import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Budget Tracker
          </h2>
          <p className="mt-1 text-slate-600">
            Track income and expenses. Everything is stored locally in your browser.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <BudgetForm setTransactions={setTransactions} />
          <Summary transactions={transactions} />
          <ExpenseList transactions={transactions} setTransactions={setTransactions} />
        </div>
      </main>

    </div>
  );
}


export default App;

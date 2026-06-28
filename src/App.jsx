import { useState } from "react";
import Navbar from "./components/Navbar";
import BudgetForm from "./components/BudgetForm";
import Summary from "./components/Summary";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-inter">
      <div className="container mx-auto max-w-4xl p-6 space-y-8">
        <Navbar />
        <h1 className="text-4xl font-bold text-center">Budget Tracker</h1>
        <p className="text-center text-gray-200">
          Track income and expenses. Everything is stored locally in your browser.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Summary transactions={transactions} />
          <BudgetForm setTransactions={setTransactions} />
        </div>

        <ExpenseList transactions={transactions} setTransactions={setTransactions} />
      </div>
    </div>
  );
}

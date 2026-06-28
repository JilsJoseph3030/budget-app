export default function Summary({ transactions }) {
  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">This Month</h2>
      <p className="text-green-300">💰 Income: ₹{income.toFixed(2)}</p>
      <p className="text-red-300">💸 Expenses: ₹{expenses.toFixed(2)}</p>
      <p className="text-yellow-300 font-bold">🧾 Balance: ₹{(income - expenses).toFixed(2)}</p>
    </div>
  );
}

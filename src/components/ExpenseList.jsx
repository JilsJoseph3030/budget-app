export default function ExpenseList({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-200">No transactions yet. Add one above.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
            >
              <span>
                {t.type === "income" ? "💰" : "💸"} {t.text} - ₹{t.amount}
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 hover:bg-red-600 transition-transform hover:scale-105 text-white px-3 py-1 rounded-lg shadow-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

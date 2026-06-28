const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function ExpenseList({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const safeAmount = (t) => (Number.isFinite(Number(t?.amount)) ? Number(t.amount) : 0);

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Transactions</h2>
        <div className="chip chip-slate">{transactions.length} items</div>
      </div>

      {transactions.length === 0 ? (
        <p className="mt-3 text-slate-500">No transactions yet. Add one above.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-200/60">
          {transactions
            .slice()
            .reverse()
            .map((t) => {
              const isIncome = t.type === "income";
              const amount = safeAmount(t);

              return (
                <li
                  key={t.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 truncate">{t.text}</div>
                    <div className="mt-1">
                      <span className={`badge ${isIncome ? "badge-emerald" : "badge-rose"}`}>
                        {isIncome ? "Income" : "Expense"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`font-bold tabular-nums ${
                        isIncome ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {currency.format(amount)}
                    </div>

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="btn btn-ghost"
                      aria-label={`Delete ${t.text}`}
                      type="button"
                    >
                      <span className="text-lg leading-none">✕</span>
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
}


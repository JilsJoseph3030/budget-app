const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function Summary({ transactions }) {
  const safeAmount = (t) => (Number.isFinite(Number(t?.amount)) ? Number(t.amount) : 0);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + safeAmount(t), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + safeAmount(t), 0);

  const balance = income - expenses;

  const balanceTone = balance >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Summary</h2>
        <div className="chip chip-indigo">This month</div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="stat">
          <div className="stat-label">Income</div>
          <div className="stat-value text-emerald-700">{currency.format(income)}</div>
        </div>

        <div className="stat">
          <div className="stat-label">Expenses</div>
          <div className="stat-value text-rose-700">{currency.format(expenses)}</div>
        </div>

        <div className="stat">
          <div className="stat-label">Balance</div>
          <div className={`stat-value font-extrabold ${balanceTone}`}>{currency.format(balance)}</div>
        </div>
      </div>
    </section>
  );
}


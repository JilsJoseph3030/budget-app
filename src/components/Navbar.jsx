export default function Navbar() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="nav-wrap">
        <div className="flex items-center gap-3">
          <div className="logo-mark" aria-hidden="true">
            ₹
          </div>
          <div>
            <div className="text-white font-extrabold leading-tight">Budget Tracker</div>
            <div className="text-white/80 text-sm">Plan • Add • Review</div>
          </div>
        </div>

        <div className="hidden sm:block text-white/80 text-sm">
          Stored locally in your browser
        </div>
      </nav>
    </header>
  );
}



export default function Navbar() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="nav-wrap">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <div className="logo-mark" aria-hidden="true">
              <span className="text-white"></span>
            </div>
            <div>
              <div className="text-white font-extrabold leading-tight">Budget Tracker</div>
              <div className="text-white/80 text-sm">Plan • Add • Review</div>
            </div>
          </div>

          <div className="hidden lg:block text-white/80 text-sm">
            Stored locally in your browser
          </div>
        </div>
      </nav>
    </header>

  );
}



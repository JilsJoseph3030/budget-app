export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <nav className="nav-wrap shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="logo-mark" aria-hidden="true">
              <span className="text-white text-lg">✨</span>
            </div>
            <div>
              <div className="text-white font-extrabold leading-tight tracking-wide">AuraBudget</div>
              <div className="text-white/80 text-xs font-medium">Plan • Add • Review</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="badge bg-white/20 text-white border-white/20 text-xs hidden sm:inline-flex">
              🟢 Local Storage Secure
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}



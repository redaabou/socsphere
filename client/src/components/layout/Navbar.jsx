import {
  Activity,
  BookOpen,
  FileText,
  History,
  Info,
  Menu,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { label: "Lookup", path: "/", icon: Search, end: true },
  { label: "History", path: "/history", icon: History },
];

const upcomingLinks = [
  { label: "Intel Feeds", icon: Activity },
  { label: "Reports", icon: FileText },
  { label: "About", icon: Info },
];

function DesktopNavigation() {
  return (
    <nav
      className="hidden h-full items-center gap-7 lg:flex"
      aria-label="Primary navigation"
    >
      {navigationLinks.map(({ label, path, icon: Icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            `relative flex h-full items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none ${
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-cyan-400"
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </NavLink>
      ))}

      {upcomingLinks.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className="flex h-full cursor-not-allowed items-center gap-2 text-sm font-medium text-slate-600"
          title="Coming soon"
          aria-disabled="true"
        >
          <Icon size={15} aria-hidden="true" />
          {label}
        </span>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Go to SOCSphere lookup"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
            <ShieldCheck size={22} strokeWidth={2.2} />
          </div>
          <span className="text-xl font-bold tracking-tight">SOCSphere</span>
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            API Live
          </span>

          <button
            type="button"
            className="hidden rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:inline-flex"
            aria-label="Open documentation"
            title="Documentation coming soon"
          >
            <BookOpen size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-800 px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigationLinks.map(({ label, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

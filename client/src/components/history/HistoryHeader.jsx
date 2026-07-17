import { History, Trash2 } from "lucide-react";

export default function HistoryHeader({ total, onClear, hasItems }) {
  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <History size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Analyst workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            IOC Lookup History
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Review previous investigations, filter indicators, and launch a fresh lookup with one action.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start lg:self-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-slate-950">{total}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Lookups</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasItems}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={17} aria-hidden="true" />
          Clear history
        </button>
      </div>
    </header>
  );
}

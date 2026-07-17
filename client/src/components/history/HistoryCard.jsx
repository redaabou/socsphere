import { Clock3, RotateCcw, Trash2 } from "lucide-react";

const levelStyles = {
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  High: "border-orange-200 bg-orange-50 text-orange-700",
  Critical: "border-red-200 bg-red-50 text-red-700",
};

const typeLabels = {
  ip: "IP address",
  domain: "Domain",
  md5: "MD5 hash",
  sha1: "SHA-1 hash",
  sha256: "SHA-256 hash",
};

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function HistoryCard({ item, onDelete, onRerun }) {
  const levelClass = levelStyles[item.level] || "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              {typeLabels[item.type] || item.type}
            </span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${levelClass}`}>
              {item.level} risk · {item.score}/100
            </span>
          </div>

          <h2 className="mt-4 break-all font-mono text-lg font-bold text-slate-950 sm:text-xl">
            {item.value}
          </h2>

          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={15} aria-hidden="true" />
            {formatDate(item.searchedAt)}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
          <button
            type="button"
            onClick={() => onRerun(item.value)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Investigate again
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
            aria-label={`Delete ${item.value} from history`}
          >
            <Trash2 size={16} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

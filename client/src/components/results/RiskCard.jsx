function getRiskStyles(level) {
  switch (level?.toLowerCase()) {
    case "high":
      return {
        badge: "border-red-500/30 bg-red-500/10 text-red-400",
        score: "text-red-400",
        glow: "bg-red-500/10",
      };

    case "medium":
      return {
        badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        score: "text-amber-400",
        glow: "bg-amber-500/10",
      };

    case "low":
    default:
      return {
        badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        score: "text-emerald-400",
        glow: "bg-emerald-500/10",
      };
  }
}

function formatCheckedAt(checkedAt) {
  if (!checkedAt) {
    return "Unavailable";
  }

  const date = new Date(checkedAt);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export function RiskCard({ risk, checkedAt }) {
  if (!risk) {
    return null;
  }

  const styles = getRiskStyles(risk.level);
  const reasons = Array.isArray(risk.reasons) ? risk.reasons : [];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
      <div
        className={`absolute right-0 top-0 h-40 w-40 rounded-full ${styles.glow} blur-3xl`}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
              Risk Assessment
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              IOC Risk Summary
            </h2>
          </div>

          <span
            className={`w-fit rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wide ${styles.badge}`}
          >
            {risk.level ?? "Unknown"} Risk
          </span>
        </div>

        <div className="mt-8 flex items-end gap-2">
          <span className={`text-5xl font-bold ${styles.score}`}>
            {risk.score ?? 0}
          </span>

          <span className="pb-1 text-lg text-slate-400">/ 100</span>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Educational score generated from available threat intelligence
          sources.
        </p>

        <div className="mt-6 border-t border-slate-800 pt-5">
          <h3 className="text-sm font-semibold text-slate-200">
            Detection reasons
          </h3>

          {reasons.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {reasons.map((reason, index) => (
                <li
                  key={`${reason}-${index}`}
                  className="flex gap-2 text-sm text-slate-400"
                >
                  <span className="text-slate-600" aria-hidden="true">
                    •
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-400">
              No malicious or suspicious indicators were identified by the
              current risk rules.
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-800 pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Checked at
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {formatCheckedAt(checkedAt)} UTC
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Assessment type
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Multi-source enrichment
            </p>
          </div>
        </div>

        {risk.disclaimer && (
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
            <p className="text-xs leading-5 text-slate-400">
              {risk.disclaimer}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
// client/src/components/results/RiskSummaryCard.jsx

function formatDate(value) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatType(type) {
  const labels = {
    ip: "IP Address",
    domain: "Domain",
    md5: "MD5 Hash",
    sha1: "SHA-1 Hash",
    sha256: "SHA-256 Hash",
  };

  return labels[type] ?? "Unknown";
}

function getRiskTheme(level = "Low") {
  const normalized = level.toLowerCase();

  if (normalized === "high") {
    return {
      text: "text-red-600",
      badge: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
      circle: "border-red-100 bg-red-50",
    };
  }

  if (normalized === "medium") {
    return {
      text: "text-amber-600",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      circle: "border-amber-100 bg-amber-50",
    };
  }

  return {
    text: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    circle: "border-emerald-100 bg-emerald-50",
  };
}

export default function RiskSummaryCard({ result }) {
  const risk = result?.risk ?? {};
  const theme = getRiskTheme(risk.level);

  const findings =
    risk.reasons?.length > 0
      ? risk.reasons
      : [
          "No malicious indicators detected",
          "No suspicious behavior found",
          "Reputation is clean across sources",
        ];

  const sourceCount = Object.values(result?.sources ?? {}).filter(Boolean).length;

  return (
    <section className="rounded-[28px] border border-blue-100/80 bg-white shadow-[0_24px_80px_-42px_rgba(37,99,235,0.45)]">
      <div className="grid gap-10 p-7 sm:p-9 lg:grid-cols-[1.35fr_0.65fr] lg:p-10">
        <div className="lg:border-r lg:border-slate-200 lg:pr-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
            Risk assessment
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            IOC Risk Summary
          </h2>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-[180px_1fr]">
            <div
              className={`mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 ${theme.circle}`}
            >
              <div className="text-center">
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-6xl font-bold ${theme.text}`}>
                    {risk.score ?? 0}
                  </span>

                  <span className="pb-2 text-xl font-medium text-slate-400">
                    /100
                  </span>
                </div>

                <span
                  className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${theme.badge}`}
                >
                  <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                  {risk.level ?? "Low"} Risk
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Detection findings
              </h3>

              <ul className="mt-5 space-y-4">
                {findings.map((finding) => (
                  <li
                    key={finding}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                      ✓
                    </span>

                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <dl className="divide-y divide-slate-200">
          <Metadata label="IOC Type" value={formatType(result?.type)} />
          <Metadata
            label="Checked At"
            value={`${formatDate(result?.checkedAt)} UTC`}
          />
          <Metadata
            label="Assessment Type"
            value="Multi-source enrichment"
          />
          <Metadata
            label="Data Sources"
            value={`${sourceCount} active sources`}
          />
        </dl>
      </div>

      <div className="border-t border-blue-100 px-6 py-5 lg:px-8">
        <div className="rounded-2xl bg-blue-50 px-5 py-3 text-center text-sm text-blue-700">
          {risk.disclaimer ??
            "This score is an educational enrichment result, not a definitive maliciousness verdict."}
        </div>
      </div>
    </section>
  );
}

function Metadata({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-950">
        {value}
      </dd>
    </div>
  );
}
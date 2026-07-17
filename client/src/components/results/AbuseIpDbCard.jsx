// client/src/components/results/AbuseIpDbCard.jsx

export default function AbuseIpDbCard({ data }) {
  if (!data) return null;

  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-950">
          AbuseIPDB
        </h3>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Clean
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Stat
          label="Abuse confidence"
          value={`${data.abuseConfidenceScore ?? 0}%`}
        />

        <Stat
          label="Country"
          value={data.countryCode ?? "N/A"}
        />

        <Stat
          label="ISP"
          value={data.isp ?? "Unknown"}
        />

        <Stat
          label="Reports"
          value={data.totalReports ?? 0}
        />
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
        {data.usageType ?? "No usage type available"}
      </div>
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}
// client/src/components/results/VirusTotalCard.jsx

export default function VirusTotalCard({ data }) {
  if (!data) return null;

  const stats = data.lastAnalysisStats ?? {};

  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-950">
          VirusTotal
        </h3>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Clean
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
        <Stat label="Reputation" value={data.reputation ?? 0} />
        <Stat label="Malicious" value={stats.malicious ?? 0} />
        <Stat label="Suspicious" value={stats.suspicious ?? 0} />
        <Stat label="Undetected" value={stats.undetected ?? 0} />
        <Stat label="Harmless" value={stats.harmless ?? 0} />
        <Stat label="Timeout" value={stats.timeout ?? 0} />
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
        Last analysis available from VirusTotal
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

      <p className="mt-2 text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}
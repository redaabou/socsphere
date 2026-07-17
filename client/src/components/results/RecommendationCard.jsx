// client/src/components/results/RecommendationCard.jsx

function getRecommendation(level) {
  const normalized = level?.toLowerCase();

  if (normalized === "high") {
    return {
      title: "Immediate review required",
      text: "This IOC contains strong malicious indicators. Consider blocking it and investigating related activity.",
      badge: "Action required",
      card: "border-red-200 bg-red-50",
      badgeStyle: "border-red-300 text-red-700",
    };
  }

  if (normalized === "medium") {
    return {
      title: "Further investigation recommended",
      text: "The IOC contains suspicious signals. Collect additional context before taking action.",
      badge: "Review needed",
      card: "border-amber-200 bg-amber-50",
      badgeStyle: "border-amber-300 text-amber-700",
    };
  }

  return {
    title: "No immediate action needed",
    text: "This IOC appears safe based on the currently available intelligence sources.",
    badge: "No action needed",
    card: "border-emerald-200 bg-emerald-50",
    badgeStyle: "border-emerald-300 text-emerald-700",
  };
}

export default function RecommendationCard({ level }) {
  const recommendation = getRecommendation(level);

  return (
  <section
  className={`flex min-h-[120px] flex-col gap-5 rounded-[24px] border p-7 sm:flex-row sm:items-center sm:justify-between ${recommendation.card}`}
>
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Recommendation
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {recommendation.text}
        </p>
      </div>

      <span
        className={`w-fit rounded-xl border px-4 py-2 text-sm font-semibold ${recommendation.badgeStyle}`}
      >
        {recommendation.badge}
      </span>
    </section>
  );
}
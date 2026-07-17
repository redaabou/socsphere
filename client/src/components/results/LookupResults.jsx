// client/src/components/results/LookupResults.jsx

import RiskSummaryCard from "./RiskSummaryCard";
import VirusTotalCard from "./VirusTotalCard";
import AbuseIpDbCard from "./AbuseIpDbCard";
import RecommendationCard from "./RecommendationCard";

export default function LookupResults({ result }) {
  return (
    <section className="mt-14 space-y-5">
      <RiskSummaryCard result={result} />

      <div className="grid gap-5 lg:grid-cols-2">
        <VirusTotalCard
          data={result?.sources?.virusTotal}
        />

        <AbuseIpDbCard
          data={result?.sources?.abuseIpDb}
        />
      </div>

      <RecommendationCard level={result?.risk?.level} />
    </section>
  );
}
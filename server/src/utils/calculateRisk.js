// server/src/utils/calculateRisk.js

export function calculateRisk({ virusTotal, abuseIpDb }) {
  let score = 0;
  const reasons = [];

  const malicious =
    virusTotal?.lastAnalysisStats?.malicious ?? 0;

  const suspicious =
    virusTotal?.lastAnalysisStats?.suspicious ?? 0;

  if (malicious >= 5) {
    score += 50;
    reasons.push("Detected as malicious by multiple engines");
  } else if (malicious > 0) {
    score += 30;
    reasons.push("Detected as malicious by at least one engine");
  }

  if (suspicious > 0) {
    score += 10;
    reasons.push("Marked suspicious by VirusTotal");
  }

  const abuseScore =
    abuseIpDb?.abuseConfidenceScore ?? 0;

  if (abuseScore >= 75) {
    score += 40;
    reasons.push("High AbuseIPDB confidence score");
  } else if (abuseScore >= 25) {
    score += 20;
    reasons.push("Moderate AbuseIPDB confidence score");
  }

  const normalizedScore = Math.min(score, 100);

  let level = "Low";

  if (normalizedScore >= 70) level = "High";
  else if (normalizedScore >= 30) level = "Medium";

  return {
    score: normalizedScore,
    level,
    reasons,
    disclaimer:
      "This score is an educational enrichment result, not a definitive maliciousness verdict.",
  };
}
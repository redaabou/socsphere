// server/src/services/virusTotalService.js

import axios from "axios";

const vtClient = axios.create({
  baseURL: "https://www.virustotal.com/api/v3",
  timeout: 10000,
});

function getVirusTotalApiKey() {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (!apiKey) {
    throw new Error("VirusTotal API key is not configured");
  }

  return apiKey;
}

export async function lookupVirusTotal(value, type) {
  let endpoint;

  switch (type) {
    case "ip":
      endpoint = `/ip_addresses/${encodeURIComponent(value)}`;
      break;

    case "domain":
      endpoint = `/domains/${encodeURIComponent(value)}`;
      break;

    case "md5":
    case "sha1":
    case "sha256":
      endpoint = `/files/${encodeURIComponent(value)}`;
      break;

    default:
      throw new Error("Unsupported IOC type");
  }

  const response = await vtClient.get(endpoint, {
    headers: {
      "x-apikey": getVirusTotalApiKey(),
    },
  });

  const attributes = response.data.data.attributes;

  return {
    source: "VirusTotal",
    reputation: attributes.reputation ?? 0,
    lastAnalysisStats: attributes.last_analysis_stats ?? {},
    categories: attributes.categories ?? {},
    lastAnalysisDate: attributes.last_analysis_date ?? null,
  };
}
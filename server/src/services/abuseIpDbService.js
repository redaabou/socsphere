// server/src/services/abuseIpDbService.js

import axios from "axios";

const abuseClient = axios.create({
  baseURL: "https://api.abuseipdb.com/api/v2",
  timeout: 10000,
  headers: {
    Key: process.env.ABUSEIPDB_API_KEY,
    Accept: "application/json",
  },
});

export async function lookupAbuseIpDb(ipAddress) {
  const response = await abuseClient.get("/check", {
    params: {
      ipAddress,
      maxAgeInDays: 90,
      verbose: true,
    },
  });

  const data = response.data.data;

  return {
    source: "AbuseIPDB",
    ipAddress: data.ipAddress,
    abuseConfidenceScore: data.abuseConfidenceScore,
    countryCode: data.countryCode,
    usageType: data.usageType,
    isp: data.isp,
    domain: data.domain,
    totalReports: data.totalReports,
    lastReportedAt: data.lastReportedAt,
    isTor: data.isTor,
  };
}
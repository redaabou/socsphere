// server/src/controllers/lookupController.js

import { detectIocType } from "../utils/detectIocType.js";
import { lookupVirusTotal } from "../services/virusTotalService.js";
import { lookupAbuseIpDb } from "../services/abuseIpDbService.js";
import { calculateRisk } from "../utils/calculateRisk.js";

export async function lookupIoc(req, res) {
  try {
    const value = req.body?.value?.trim();

    if (!value) {
      return res.status(400).json({
        error: "IOC value is required",
      });
    }

    const type = detectIocType(value);

    if (type === "unknown") {
      return res.status(400).json({
        error: "Unsupported or invalid IOC",
      });
    }

    const virusTotal = await lookupVirusTotal(value, type);

    const abuseIpDb =
      type === "ip"
        ? await lookupAbuseIpDb(value)
        : null;

    const risk = calculateRisk({
      virusTotal,
      abuseIpDb,
    });

    return res.json({
      value,
      type,
      risk,
      sources: {
        virusTotal,
        abuseIpDb,
      },
      checkedAt: new Date().toISOString(),
    });
} catch (error) {
  console.error("Lookup error:", error.response?.data || error.message);

  return res.status(error.response?.status || 500).json({
    error:
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Unable to complete the lookup",
  });
}
}
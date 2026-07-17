import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import LookupResults from "../components/results/LookupResults";
import { lookupIoc } from "../services/api";
import { saveLookupToHistory } from "../services/historyService";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const rerunHandled = useRef(false);

  const handleSearch = useCallback(async (value) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await lookupIoc(value);
      setResult(data);
      saveLookupToHistory({
        value: data.value,
        type: data.type,
        risk: data.risk,
      });
    } catch (requestError) {
      console.error("Lookup error:", requestError);
      setError(
        requestError.response?.data?.error ||
          requestError.message ||
          "The lookup failed.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const queuedIoc = searchParams.get("ioc")?.trim();
    if (!queuedIoc || rerunHandled.current) {
      return;
    }

    rerunHandled.current = true;
    handleSearch(queuedIoc);
    setSearchParams({}, { replace: true });
  }, [handleSearch, searchParams, setSearchParams]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9ff]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.13),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-28 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            IOC Lookup
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
            Threat{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Intelligence
            </span>{" "}
            Lookup
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Enrich IP addresses, domains, and file hashes using multiple open-source threat-intelligence feeds.
          </p>
        </header>

        <section className="mx-auto mt-10 max-w-5xl">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </section>

        {error && (
          <div
            role="alert"
            className="mx-auto mt-8 max-w-5xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {result && (
          <div className="mx-auto mt-12 max-w-7xl">
            <LookupResults result={result} />
          </div>
        )}
      </div>
    </main>
  );
}

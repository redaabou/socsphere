import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HistoryHeader from "../components/history/HistoryHeader";
import HistoryList from "../components/history/HistoryList";
import HistoryToolbar from "../components/history/HistoryToolbar";
import {
  clearLookupHistory,
  deleteLookupHistoryItem,
  getLookupHistory,
} from "../services/historyService";

const riskValue = (item) => (Number.isFinite(item.score) ? item.score : 0);

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => getLookupHistory());
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const refreshHistory = () => setHistory(getLookupHistory());
    window.addEventListener("storage", refreshHistory);
    window.addEventListener("socsphere:history-updated", refreshHistory);

    return () => {
      window.removeEventListener("storage", refreshHistory);
      window.removeEventListener("socsphere:history-updated", refreshHistory);
    };
  }, []);

  const visibleHistory = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = history.filter((item) => {
      const matchesSearch =
        !normalizedSearch || item.value.toLowerCase().includes(normalizedSearch);
      const matchesType = type === "all" || item.type === type;
      return matchesSearch && matchesType;
    });

    return [...filtered].sort((first, second) => {
      if (sort === "oldest") {
        return new Date(first.searchedAt) - new Date(second.searchedAt);
      }
      if (sort === "risk-high") {
        return riskValue(second) - riskValue(first);
      }
      if (sort === "risk-low") {
        return riskValue(first) - riskValue(second);
      }
      return new Date(second.searchedAt) - new Date(first.searchedAt);
    });
  }, [history, search, type, sort]);

  const handleDelete = (id) => {
    setHistory(deleteLookupHistoryItem(id));
  };

  const handleClear = () => {
    const confirmed = window.confirm(
      "Clear all IOC lookup history? This action cannot be undone.",
    );
    if (confirmed) {
      setHistory(clearLookupHistory());
    }
  };

  const handleRerun = (value) => {
    navigate(`/?ioc=${encodeURIComponent(value)}`);
  };

  const hasFilters = Boolean(search.trim()) || type !== "all";

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f7f9ff]">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <HistoryHeader
          total={history.length}
          hasItems={history.length > 0}
          onClear={handleClear}
        />

        <div className="mt-6">
          <HistoryToolbar
            search={search}
            type={type}
            sort={sort}
            onSearch={setSearch}
            onType={setType}
            onSort={setSort}
          />
        </div>

        <div className="mt-6">
          <HistoryList
            items={visibleHistory}
            hasFilters={hasFilters}
            onDelete={handleDelete}
            onRerun={handleRerun}
          />
        </div>
      </div>
    </main>
  );
}

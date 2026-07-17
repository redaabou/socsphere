import { Filter, Search } from "lucide-react";

const IOC_TYPES = ["all", "ip", "domain", "md5", "sha1", "sha256"];

export default function HistoryToolbar({ search, type, sort, onSearch, onType, onSort }) {
  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_180px_180px]">
      <label className="relative block">
        <span className="sr-only">Search history</span>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search an IOC..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="relative block">
        <span className="sr-only">Filter by IOC type</span>
        <Filter
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <select
          value={type}
          onChange={(event) => onType(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium capitalize text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          {IOC_TYPES.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All IOC types" : option.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Sort history</span>
        <select
          value={sort}
          onChange={(event) => onSort(event.target.value)}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="risk-high">Highest risk</option>
          <option value="risk-low">Lowest risk</option>
        </select>
      </label>
    </section>
  );
}

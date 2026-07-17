import { useState } from "react";

export default function SearchForm({
  onSearch,
  loading,
}) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedValue = value.trim();

    if (!cleanedValue || loading) {
      return;
    }

    onSearch(cleanedValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="ioc"
        className="mb-3 block text-sm font-semibold text-slate-700"
      >
        IP address, domain, or file hash
      </label>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 sm:flex-row">
        <input
          id="ioc"
          type="text"
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          placeholder="Example: 8.8.8.8"
          autoComplete="off"
          spellCheck="false"
          className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 py-3 text-base text-slate-950 outline-none placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze IOC"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span>Examples:</span>

        {["8.8.8.8", "example.com"].map(
          (example) => (
            <button
              key={example}
              type="button"
              onClick={() => setValue(example)}
              className="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-300"
            >
              {example}
            </button>
          ),
        )}
      </div>
    </form>
  );
}
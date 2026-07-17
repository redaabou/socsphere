import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyHistory({ filtered }) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <SearchX size={27} aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">
        {filtered ? "No matching investigations" : "No lookup history yet"}
      </h2>
      <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
        {filtered
          ? "Adjust the search, IOC type, or sorting controls to see other entries."
          : "Run your first IOC lookup and SOCSphere will store a concise investigation record here."}
      </p>
      {!filtered && (
        <Link
          to="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Start an IOC lookup
        </Link>
      )}
    </section>
  );
}

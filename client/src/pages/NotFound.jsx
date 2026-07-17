import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f7f9ff] px-5 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldAlert size={28} />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-600">The requested SOCSphere page does not exist or may have been moved.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <ArrowLeft size={17} />
          Return to lookup
        </Link>
      </section>
    </main>
  );
}

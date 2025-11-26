export default function Links() {
  return (
    <section id="links" className="space-y-3">
      <h2 className="text-xl font-semibold text-emerald-400">
        Links &amp; Extras
      </h2>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 space-y-2">
        <p>
          Military Service: <strong>Status — Exempt</strong>
        </p>

        <p>
          Hack The Box:{" "}
          <a
            href="https://app.hackthebox.com/profile/1968865"
            className="text-emerald-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://app.hackthebox.com/profile/1968865
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/alaminalaa8/"
            className="text-emerald-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://www.linkedin.com/in/alaminalaa8/
          </a>
        </p>
      </div>
    </section>
  );
}

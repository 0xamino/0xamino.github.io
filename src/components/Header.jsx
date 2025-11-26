export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Alamin Alaa
          </h1>
          <p className="text-sm text-slate-400">
            Web Application Penetration Tester &amp; QA Engineer
          </p>
        </div>

        <div className="text-xs sm:text-sm text-slate-300 space-y-0.5 sm:text-right">
          <p>Shebin Elkom, Menofia, EG</p>
          <p>
            <a href="tel:+201554209906" className="hover:text-emerald-400">
              (+20) 01554209906
            </a>
          </p>
          <p>
            <a
              href="mailto:alamenalaa8@gmail.com"
              className="hover:text-emerald-400"
            >
              alamenalaa8@gmail.com
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}

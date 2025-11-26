export default function Certifications() {
  return (
    <section id="certs" className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-400">
        Certifications &amp; Courses
      </h2>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-sm text-slate-200">
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>eWPTXv2</strong> — INE Certified Web Application
            Penetration Tester.
          </li>
          <li>eJPT — Netriders Academy.</li>
          <li>CompTIA Security+ — Netriders Academy.</li>
          <li>Practical Ethical Hacking — TCM Security.</li>
        </ul>

        <p className="pt-2 text-xs text-slate-400">
          INE Certification:{" "}
          <a
            href="https://certs.ine.com/15c169f4-8cce-4813-b690-42baaf8d5932"
            className="text-emerald-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            View credential
          </a>
        </p>
      </div>
    </section>
  );
}

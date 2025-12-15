export default function SyndicateInfrastructureDns() {

  return (
    <article className="space-y-8 text-gray-200 leading-relaxed">
      {/* Title & meta are already shown by WriteupDetail, so we start from the body */}

      {/* Challenge header */}
      <section className="space-y-2">
        <p>
          <strong>Challenge:</strong> Advent of CTF 2025 – CyberStudents
        </p>
        <p>
          <strong>Category:</strong> Miscellaneous
        </p>
        <p>
          <strong>Points:</strong> 121
        </p>
        <p>
          <strong>Author:</strong> qvipin
        </p>
      </section>

      <hr className="border-gray-700" />

      {/* Objective */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🎯 Objective
        </h2>
        <p>
          The North Pole Threat Intelligence Division (NPLD) detected unusual
          DNS activity tied to <code>krampus.csd.lol</code>, a domain supposedly
          used by the <strong>Krampus Syndicate</strong> for coordinating
          operations.
        </p>
        <p>My mission was to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Perform a full DNS-based reconnaissance sweep</li>
          <li>Map hidden infrastructure without brute-forcing subdomains</li>
          <li>Extract the hidden key buried somewhere inside DNS records</li>
        </ul>
        <p className="bg-gray-900/60 border border-gray-700 rounded-md p-3 text-sm">
          <span className="font-semibold">Rule:</span>{" "}
          Absolutely no subdomain bruteforce. All clues are already inside DNS.
        </p>
        <p>
          So the mindset going in was:{" "}
          <strong>follow the DNS trail and treat every record as a breadcrumb.</strong>
        </p>
      </section>

      {/* 1. Initial Recon */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🧭 1. Initial Recon — Start With the Obvious
        </h2>
        <p>
          I started with the root domain and pulled common DNS record types.
          Even if most records are empty, any non-empty result is usually
          intentional in CTF-style infrastructure.
        </p>

        <h3 className="text-xl font-semibold text-neon">
          🔍 Check NS records
        </h3>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer krampus.csd.lol NS`}</code>
        </pre>
        <p>
          <strong>Result:</strong> <em>(empty)</em>
        </p>
        <p>
          Not unusual — small or private infra often doesn&apos;t define
          custom NS for subdomains.
        </p>

        <h3 className="text-xl font-semibold text-neon">
          🔍 Check TXT records
        </h3>
        <p>TXT records are a goldmine in reconnaissance challenges.</p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"v=spf1 include:_spf.krampus.csd.lol -all"`}</code>
        </pre>
        <p>
          This is an SPF (Sender Policy Framework) record, which points us to
          another hostname:
        </p>
        <p>
          ➡️ <code>_spf.krampus.csd.lol</code>
        </p>
        <p>That&apos;s our first breadcrumb.</p>
      </section>

      {/* 2. Follow the SPF trail */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🕵️‍♂️ 2. Follow the SPF Trail
        </h2>
        <p>
          When SPF includes another domain, it&apos;s natural to check that
          domain&apos;s TXT records too.
        </p>

        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer _spf.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"v=spf1 ip4:203.0.113.0/24 ~all"`}</code>
        </pre>
        <p>
          This reveals a full IPv4 range (RFC 5737 test net, but used
          intentionally here):
        </p>
        <p>
          ➡️ <code>203.0.113.0/24</code>
        </p>
        <p>
          This hints at a whole network segment the Syndicate may be using.
        </p>
        <p className="italic text-gray-300">
          Mindset at this point:{" "}
          <q>
            If email records are leaking network ranges, what else are they
            leaking?
          </q>
        </p>
      </section>

      {/* 3. Mail infrastructure */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          📡 3. Investigating Mail Infrastructure
        </h2>
        <p>Mail servers often expose hidden internal DNS records.</p>

        <h3 className="text-xl font-semibold text-neon">Check MX</h3>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer krampus.csd.lol MX`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`mail.krampus.csd.lol`}</code>
        </pre>

        <p>Then I queried the mail subdomain:</p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer mail.krampus.csd.lol A
dig +noall +answer mail.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          All responses were empty, so I pivoted to other email-related DNS
          records.
        </p>
      </section>

      {/* 4. DMARC */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          📬 4. DMARC Records Often Leak Internal Emails
        </h2>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer _dmarc.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"v=DMARC1; p=reject; rua=mailto:dmarc@krampus.csd.lol; ruf=mailto:forensics@ops.krampus.csd.lol; fo=1; adkim=s; aspf=s"`}</code>
        </pre>
        <p>This gives us another interesting subdomain:</p>
        <p>
          ➡️ <code>ops.krampus.csd.lol</code>
        </p>
        <p>Another breadcrumb to follow.</p>
      </section>

      {/* 5. ops domain */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🧵 5. The “ops” Domain — A Goldmine
        </h2>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer ops.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"internal-services: _ldap._tcp.krampus.csd.lol _kerberos._tcp.krampus.csd.lol _metrics._tcp.krampus.csd.lol"`}</code>
        </pre>
        <p>
          This is great: they&apos;re openly listing internal service discovery
          records.
        </p>
        <p>I queried each SRV in turn.</p>

        <h3 className="text-xl font-semibold text-neon">🔧 LDAP</h3>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig _ldap._tcp.krampus.csd.lol SRV +noall +answer`}</code>
        </pre>
        <p>
          <strong>Result:</strong> <code>dc01.krampus.csd.lol</code>
        </p>

        <h3 className="text-xl font-semibold text-neon">🔑 Kerberos</h3>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig _kerberos._tcp.krampus.csd.lol SRV +noall +answer`}</code>
        </pre>
        <p>
          <strong>Result:</strong> <code>dc01.krampus.csd.lol</code>
        </p>
        <p>This confirms <code>dc01</code> is their domain controller.</p>

        <h3 className="text-xl font-semibold text-neon">
          📊 Metrics service
        </h3>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig _metrics._tcp.krampus.csd.lol SRV +noall +answer`}</code>
        </pre>
        <p>
          <strong>Result:</strong> <code>beacon.krampus.csd.lol</code>
        </p>
        <p>
          When you see <strong>beacon</strong> and <strong>Syndicate</strong>,
          you should assume exfiltration or C2 activity.
        </p>
      </section>

      {/* 6. Beacon */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          📦 6. Querying the Beacon
        </h2>
        <p>
          TXT records are where these kinds of challenges usually hide secrets.
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer beacon.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"config=ZXhmaWwua3JhbXB1cy5jc2QubG9s=="`}</code>
        </pre>
        <p>That value is clearly Base64. Decoding it gives:</p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`exfil.krampus.csd.lol`}</code>
        </pre>
        <p>Another subdomain, another breadcrumb.</p>
      </section>

      {/* 7. Exfiltration node & flag */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🚨 7. The Exfiltration Node
        </h2>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer exfil.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"status=active; auth=dkim; selector=syndicate"`}</code>
        </pre>
        <p>This tells us:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>The node is <strong>active</strong></li>
          <li>It uses <strong>DKIM</strong></li>
          <li>The selector is <strong>syndicate</strong></li>
        </ul>

        <p>With DKIM, we can query the public key:</p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`dig +noall +answer syndicate._domainkey.krampus.csd.lol TXT`}</code>
        </pre>
        <p>
          <strong>Result:</strong>
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`"v=DKIM1; k=rsa; p=Y3Nke2RuNV9tMTlIVF9CM19LMU5ENF9XME5LeX0="`}</code>
        </pre>
        <p>
          The <code>p=</code> value is again Base64. Decoding it reveals the
          final flag:
        </p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm text-neon overflow-x-auto">
          <code>{`csd{dn5_m19HT_B3_K1ND4_W0NKy}`}</code>
        </pre>
      </section>

      {/* Final flag */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-neon">
          🏁 Final Flag
        </h2>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm text-neon overflow-x-auto">
          <code>{`csd{dn5_m19HT_B3_K1ND4_W0NKy}`}</code>
        </pre>
      </section>

      {/* Mindset summary */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          🧠 Mindset Summary — Why This Worked
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Follow the DNS breadcrumbs:</strong> every record pointed to
            the next — TXT → SPF → DMARC → OPS → SRV → beacon → exfil → DKIM →
            flag.
          </li>
          <li>
            <strong>Never brute-force:</strong> the challenge explicitly warned
            against it, so I focused on what the domain intentionally exposed.
          </li>
          <li>
            <strong>Treat TXT records as containers for secrets:</strong> in
            CTFs, TXT often holds the good stuff.
          </li>
          <li>
            <strong>Decode everything that looks encoded:</strong> Base64 is
            perfect for DNS TXT fields.
          </li>
          <li>
            <strong>Think like a red teamer:</strong> misconfigured DNS can leak
            internal architecture, service endpoints, and sensitive info in the
            real world.
          </li>
        </ol>
      </section>

        {/* Recon Mindmap */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
            🧠 Recon Mindmap
        </h2>

        <img
            src="/Images/Writeups/krampus-dns-recon.png"
            alt="DNS Recon Mindmap"
            className="rounded-lg border border-neon/20 shadow-lg mx-auto"
        />

        <p className="mt-2 text-xs text-gray-400 text-center">
            Visual mindmap of the DNS reconnaissance flow used in this challenge.
        </p>
      </section>

      {/* Professional conclusion */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-neon">
          ✍️ Professional Conclusion
        </h2>
        <p>
          This challenge demonstrated how misconfigured DNS infrastructure can
          unintentionally reveal internal architecture, service endpoints,
          hostnames, and even sensitive encoded information.
        </p>
        <p>I effectively reconstructed the Syndicate&apos;s infrastructure:</p>
        <pre className="bg-[#05070D] border border-gray-800 rounded-md p-3 text-sm overflow-x-auto">
          <code>{`krampus.csd.lol
 → _spf
 → DMARC
 → ops
 → SRV service discovery
 → beacon
 → exfil
 → DKIM selector
 → flag`}</code>
        </pre>
        <p>
          Each DNS record served as a stepping stone to the next, ultimately
          exposing the Syndicate’s exfiltration node and the secret embedded
          within its DKIM key.
        </p>
      </section>
    </article>
  );
}

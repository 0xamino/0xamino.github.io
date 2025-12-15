---

title: "Syndicate Infrastructure — DNS Reconnaissance"
date: "2025-12-15"
category: "Miscellaneous"
difficulty: "Easy"
points: 121
# author: "qvipin"
tags: ["DNS", "Recon", "CTF", "Advent of CTF 2025", "CyberStudents"]
summary: "DNS reconnaissance challenge focusing on SPF, DMARC, SRV records, and DKIM to uncover hidden infrastructure and the final flag."
cover: "/Images/Writeups/CyberStudents.png"
------------------------------------------------------------------------------------------------------------------------------------------

### Challenge

**Advent of CTF 2025 – CyberStudents**

---

### 🎯 Objective

The North Pole Threat Intelligence Division (NPLD) detected unusual DNS activity tied to:

* `krampus.csd.lol`

The domain is supposedly used by the **Krampus Syndicate** for coordinating operations.

My mission was to:

* Perform a full DNS-based reconnaissance sweep
* Map hidden infrastructure **without brute-forcing subdomains**
* Extract the hidden key buried inside DNS records

> **Rule:** Absolutely no subdomain bruteforce. All clues are already inside DNS.

Mindset: **follow the DNS trail** and treat every record as a breadcrumb.

---

### 🧭 1. Initial Recon — Start With the Obvious

I started with the root domain and pulled common DNS record types. Even if most records are empty, any non-empty result is usually intentional in CTF-style infrastructure.

#### 🔍 Check NS records

```bash
dig +noall +answer krampus.csd.lol NS
```

**Result:**

```txt
(empty)
```

Not unusual — small/private infra often doesn’t define custom NS for subdomains.

#### 🔍 Check TXT records

TXT records are a goldmine in reconnaissance challenges.

```bash
dig +noall +answer krampus.csd.lol TXT
```

**Result:**

```txt
"v=spf1 include:_spf.krampus.csd.lol -all"
```

This is an **SPF (Sender Policy Framework)** record. It points to another hostname:

➡️ `_spf.krampus.csd.lol`

That’s the first breadcrumb.

---

### 🕵️‍♂️ 2. Follow the SPF Trail

When SPF includes another domain, it’s natural to check that domain’s TXT records too.

```bash
dig +noall +answer _spf.krampus.csd.lol TXT
```

**Result:**

```txt
"v=spf1 ip4:203.0.113.0/24 ~all"
```

This reveals a full IPv4 range (RFC 5737 test net, but used intentionally here):

➡️ `203.0.113.0/24`

Mindset at this point: *If email records are leaking network ranges, what else are they leaking?*

---

### 📡 3. Investigating Mail Infrastructure

Mail servers often expose hidden internal DNS records.

#### ✅ Check MX

```bash
dig +noall +answer krampus.csd.lol MX
```

**Result:**

```txt
mail.krampus.csd.lol
```

Then I queried the mail subdomain:

```bash
dig +noall +answer mail.krampus.csd.lol A
dig +noall +answer mail.krampus.csd.lol TXT
```

**Result:**

```txt
(empty)
```

Since responses were empty, I pivoted to other email-related DNS records.

---

### 📬 4. DMARC Records Often Leak Internal Emails

```bash
dig +noall +answer _dmarc.krampus.csd.lol TXT
```

**Result:**

```txt
"v=DMARC1; p=reject; rua=mailto:dmarc@krampus.csd.lol; ruf=mailto:forensics@ops.krampus.csd.lol; fo=1; adkim=s; aspf=s"
```

This gives an interesting subdomain:

➡️ `ops.krampus.csd.lol`

Another breadcrumb.

---

### 🧵 5. The “ops” Domain — A Goldmine

```bash
dig +noall +answer ops.krampus.csd.lol TXT
```

**Result:**

```txt
"internal-services: _ldap._tcp.krampus.csd.lol _kerberos._tcp.krampus.csd.lol _metrics._tcp.krampus.csd.lol"
```

They’re openly listing internal service discovery records. I queried each SRV record.

#### 🔧 LDAP

```bash
dig _ldap._tcp.krampus.csd.lol SRV +noall +answer
```

**Result:**

```txt
dc01.krampus.csd.lol
```

#### 🔑 Kerberos

```bash
dig _kerberos._tcp.krampus.csd.lol SRV +noall +answer
```

**Result:**

```txt
dc01.krampus.csd.lol
```

This confirms `dc01` is their domain controller.

#### 📊 Metrics service

```bash
dig _metrics._tcp.krampus.csd.lol SRV +noall +answer
```

**Result:**

```txt
beacon.krampus.csd.lol
```

When you see *beacon* and *Syndicate*, you should suspect exfiltration or C2 activity.

---

### 📦 6. Querying the Beacon

TXT records are where these challenges usually hide secrets.

```bash
dig +noall +answer beacon.krampus.csd.lol TXT
```

**Result:**

```txt
"config=ZXhmaWwua3JhbXB1cy5jc2QubG9s=="
```

That value is clearly Base64. Decoding it yields:

➡️ `exfil.krampus.csd.lol`

---

### 🚨 7. The Exfiltration Node

```bash
dig +noall +answer exfil.krampus.csd.lol TXT
```

**Result:**

```txt
"status=active; auth=dkim; selector=syndicate"
```

This tells us:

* The node is active
* It uses DKIM
* The selector is `syndicate`

With DKIM, we can query the public key:

```bash
dig +noall +answer syndicate._domainkey.krampus.csd.lol TXT
```

**Result:**

```txt
"v=DKIM1; k=rsa; p=Y3Nke2RuNV9tMTlIVF9CM19LMU5ENF9XME5LeX0="
```

The `p=` value is again Base64. Decoding it reveals the final flag.

---

### 🏁 Final Flag

```txt
csd{dn5_m19HT_B3_K1ND4_W0NKy}
```
---

### 🧠 Recon Mindmap

![DNS Recon Mindmap](/Images/Writeups/krampus-dns-recon.png)

---

### 🧠 Mindset Summary — Why This Worked

1. **Follow the DNS breadcrumbs:** TXT → SPF → DMARC → OPS → SRV → beacon → exfil → DKIM → flag
2. **Never brute-force:** the challenge explicitly warned against it
3. **Treat TXT records as containers for secrets:** in CTFs, TXT often holds the good stuff
4. **Decode everything that looks encoded:** Base64 is perfect for DNS TXT fields
5. **Think like a red teamer:** misconfigured DNS can leak internal architecture and service endpoints

---

### ✍️ Professional Conclusion

This challenge demonstrated how misconfigured DNS infrastructure can unintentionally reveal internal architecture, service endpoints, hostnames, and even sensitive encoded information.

I reconstructed the Syndicate infrastructure chain:

```txt
krampus.csd.lol
 → _spf
 → DMARC
 → ops
 → SRV service discovery
 → beacon
 → exfil
 → DKIM selector
 → flag
```

Each DNS record served as a stepping stone to the next, ultimately exposing the Syndicate’s exfiltration node and the secret embedded within its DKIM key.

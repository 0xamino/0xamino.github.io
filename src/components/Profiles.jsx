const profiles = [
  { name: "Hack The Box", url: "https://app.hackthebox.com/profile/1968865", icon: "Images/icons/htb.svg" },
  { name: "Bugcrowd", url: "https://bugcrowd.com/h/0xamino", icon: "Images/icons/bugcrowd.svg" },
  { name: "HackerOne", url: "https://hackerone.com/0xamino", icon: "Images/icons/h1.svg" },
  { name: "GitHub", url: "https://github.com/0xamino", icon: "Images/icons/github.svg" },
  // {name: "Medium", url: "https://medium.com/@0xamino", icon: "Images/icons/medium.png" },
];

export default function Profiles() {
  return (
    <section id="profiles" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-neon mb-6">Profiles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
          {profiles.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              className="bg-dark-light p-6 rounded-xl hover:scale-105 hover:bg-dark transition-all text-center"
            >
              <img src={p.icon} className="h-10 mx-auto mb-3 opacity-80" />
              <p className="text-neon font-semibold">{p.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

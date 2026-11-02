const stages = [
  { href: "#buyer-request", index: "01", title: "Request" },
  { href: "#supplier-discovery", index: "02", title: "Stock" },
  { href: "#aggregation", index: "03", title: "Cover" },
  { href: "#quality-settlement", index: "04", title: "Total" },
];

export default function StageHeader() {
  return (
    <header className="demo-header">
      <a className="demo-skip" href="#demo-main">
        Skip to demo
      </a>
      <div className="demo-bar">
        <div className="demo-bar-inner">
          <a className="demo-brand" href="#demo-main">
            <span className="demo-mark" aria-hidden="true">
              क
            </span>
            Kanch-Net
          </a>
          <p className="demo-bar-note">Illustrative</p>
        </div>
      </div>
      <div className="demo-sub">
        <div className="demo-sub-inner">
          <p className="demo-disclaimer" role="note">
            <span>
              Independent demo. Names, stock, and rupees are examples. No
              government link. Money is simulated.
            </span>
            <span lang="hi">
              स्वतंत्र डेमो। नाम, स्टॉक और रकम उदाहरण हैं। रकम सिम्युलेटेड है।
            </span>
          </p>
          <nav className="demo-rail" aria-label="Four demo stages">
            {stages.map((stage) => (
              <a key={stage.href} href={stage.href}>
                <span className="demo-rail-index">{stage.index}</span>
                {stage.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

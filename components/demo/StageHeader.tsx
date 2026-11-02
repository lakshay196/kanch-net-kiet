const stages = [
  {
    href: "#buyer-request",
    index: "01",
    title: "Buyer request",
    titleHi: "खरीदार की माँग",
    role: "Buyer",
  },
  {
    href: "#supplier-discovery",
    index: "02",
    title: "Supplier discovery",
    titleHi: "आपूर्तिकर्ता खोजना",
    role: "Coordinator",
  },
  {
    href: "#aggregation",
    index: "03",
    title: "Aggregation",
    titleHi: "मात्रा जोड़ना",
    role: "Coordinator",
  },
  {
    href: "#quality-settlement",
    index: "04",
    title: "Quality and settlement",
    titleHi: "जाँच और हिसाब",
    role: "Collector",
  },
];

export default function StageHeader() {
  return (
    <header className="demo-header">
      <a className="demo-skip" href="#demo-main">
        Skip to demo
      </a>
      <div className="demo-header-inner">
        <div className="demo-bar">
          <a className="demo-brand" href="#demo-main">
            <span className="demo-mark" aria-hidden="true">
              क
            </span>
            Kanch-Net
          </a>
          <p className="demo-bar-note">Independent demo</p>
        </div>
        <p className="demo-disclaimer" role="note">
          <span>
            Independent Kanch-Net demo. Names, stock, and amounts are
            illustrative. There is no government connection. Money is simulated.
          </span>
          <span lang="hi">
            यह स्वतंत्र डेमो है। नाम, स्टॉक और रकम उदाहरण हैं। कोई सरकारी
            कनेक्शन नहीं है। रकम सिम्युलेटेड है।
          </span>
        </p>
        <nav className="demo-rail" aria-label="Four demo stages">
          {stages.map((stage) => (
            <a key={stage.href} href={stage.href}>
              <span className="demo-rail-index">{stage.index}</span>
              <span className="demo-rail-title">{stage.title}</span>
              <span className="demo-rail-hi" lang="hi">
                {stage.titleHi}
              </span>
              <span className="demo-rail-role">{stage.role}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

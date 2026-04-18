import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import växter from "./vaxter.json";

// ============================================================
// SYMBOLER PER TYP
// ============================================================
const typConfig = {
  träd:        { färg: "#3a6e28", symbol: "circle",   etikett: "Träd",         storlek: 1.5 },
  buske:       { färg: "#7a9a4a", symbol: "circle",   etikett: "Buske",        storlek: 1.0 },
  ört:         { färg: "#c8832a", symbol: "diamond",  etikett: "Ört",          storlek: 1.0 },
  marktäckare: { färg: "#a0b060", symbol: "triangle", etikett: "Marktäckare",  storlek: 1.0 },
  klätterväxt: { färg: "#6a5a9a", symbol: "square",   etikett: "Klätterväxt",  storlek: 1.0 },
};

const R = 1.2;

function PlantSymbol({ x, y, typ, aktiv }) {
  const cfg = typConfig[typ] || typConfig.buske;
  const r = R * (cfg.storlek || 1.0);
  const färg = aktiv ? "#2c3a1e" : cfg.färg;
  const stroke = "#f4efe6";
  const sw = 0.6;

  if (cfg.symbol === "circle") {
    return <circle cx={x} cy={y} r={r} fill={färg} stroke={stroke} strokeWidth={sw}/>;
  }
  if (cfg.symbol === "diamond") {
    const d = r * 1.3;
    return <polygon points={`${x},${y-d} ${x+d},${y} ${x},${y+d} ${x-d},${y}`} fill={färg} stroke={stroke} strokeWidth={sw}/>;
  }
  if (cfg.symbol === "triangle") {
    const d = r * 1.3;
    return <polygon points={`${x},${y-d} ${x+d},${y+d} ${x-d},${y+d}`} fill={färg} stroke={stroke} strokeWidth={sw}/>;
  }
  if (cfg.symbol === "square") {
    return <rect x={x-r} y={y-r} width={r*2} height={r*2} fill={färg} stroke={stroke} strokeWidth={sw}/>;
  }
  return null;
}

export default function App() {
  const [searchParams] = useSearchParams();
  const artSlug = searchParams.get("art");
  const markerade = artSlug
    ? växter.filter(v => v.lank === `/arter/${artSlug}`)
    : [];

  const [showLabels, setShowLabels] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [selected, setSelected] = useState(null);
  const [visibleTypes, setVisibleTypes] = useState(
    () => Object.fromEntries(Object.keys(typConfig).map(t => [t, true]))
  );

  function toggleType(typ) {
    setVisibleTypes(prev => ({ ...prev, [typ]: !prev[typ] }));
  }
  const [hovered, setHovered] = useState(null);
  const [clickedPos, setClickedPos] = useState(null);

  function handleSvgClick(e) {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    setClickedPos({ x: Math.round(svgP.x), y: Math.round(svgP.y) });
    setSelected(null);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4efe6",
      fontFamily: "'Crimson Text', Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem 1rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .vaxt-punkt { cursor: pointer; }
        .vaxt-punkt:hover { opacity: 0.75; }
        .info-kort { animation: fadeUp 0.2s ease; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}>
        <Link to="/" style={{ fontSize: "0.85rem", color: "#5a7a3a", textDecoration: "none", letterSpacing: "0.05em" }}>
          ← Startsida
        </Link>
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#2c3a1e", marginBottom: "0.3rem" }}>
        Agunnaryds allmänna skogsträdgård
      </h1>
      <p style={{ color: "#8a7a5a", fontStyle: "italic", marginBottom: "1.2rem", fontSize: "0.95rem" }}>
        Kartprototyp
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem", fontSize: "0.9rem", color: "#5a7a3a" }}>
        <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} />
          Visa namn
        </label>
        <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input type="checkbox" checked={showLegend} onChange={e => setShowLegend(e.target.checked)} />
          Visa legend
        </label>
        <span style={{ color: "#c8be9a" }}>|</span>
        {Object.entries(typConfig).map(([typ, cfg]) => (
          <label key={typ} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <input type="checkbox" checked={visibleTypes[typ]} onChange={() => toggleType(typ)} />
            <span style={{ color: cfg.färg, fontWeight: 600 }}>{cfg.etikett}</span>
          </label>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "4px", boxShadow: "0 2px 24px rgba(44,58,30,0.10)", padding: "1rem", width: "min(96vw, 840px)" }}>
        <TransformWrapper minScale={0.5} maxScale={8} wheel={{ step: 0.1 }} centerOnInit>
          {({ resetTransform }) => (<>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.4rem" }}>
            <button onClick={() => resetTransform()} style={{
              background: "none", border: "1px solid #c8be9a", borderRadius: "2px",
              padding: "0.2rem 0.6rem", fontSize: "0.8rem", color: "#4a5a3a", cursor: "pointer"
            }}>Återställ zoom</button>
          </div>
          <TransformComponent wrapperStyle={{ width: "100%", display: "block" }} contentStyle={{ width: "100%" }}>
        <svg viewBox="40 88 153 133" width="100%" style={{ display: "block" }} onClick={handleSvgClick}>
          <defs>
            <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="#c8be9a" opacity="0.5"/>
            </pattern>
          </defs>

          <rect x="0" y="0" width="210" height="297" fill="#7a9a5a"/>
          <rect x="0" y="0" width="210" height="297" fill="url(#dots)"/>

          <polygon points="48,97 185,97 177,216 112,213" fill="#f5f0b0" stroke="none"/>
          <polygon points="48,97 185,97 177,216 112,213" fill="url(#dots)" opacity="0.4"/>

          <line x1="48"  y1="97"  x2="185" y2="97"  stroke="#4a5a30" strokeWidth="1" strokeLinecap="round"/>
          <line x1="185" y1="97"  x2="177" y2="216" stroke="#4a5a30" strokeWidth="1" strokeLinecap="round"/>
          <line x1="177" y1="216" x2="112" y2="213" stroke="#4a5a30" strokeWidth="1" strokeLinecap="round"/>
          <line x1="48"  y1="97"  x2="73"  y2="143" stroke="#4a5a30" strokeWidth="1" strokeLinecap="round"/>
          <line x1="77"  y1="149" x2="112" y2="213" stroke="#4a5a30" strokeWidth="1" strokeLinecap="round"/>

          <rect x="139"   y="122" width="8.5" height="11" fill="#7ab3d4" stroke="#3a7aa0" strokeWidth="0.5" rx="0.5"/>
          <rect x="147.5" y="122" width="8.5" height="11" fill="#7ab3d4" stroke="#3a7aa0" strokeWidth="0.5" rx="0.5"/>

          <line x1="158" y1="146" x2="167" y2="158" stroke="#2c3a1e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="167" y1="164" x2="167" y2="178" stroke="#2c3a1e" strokeWidth="2" strokeLinecap="round"/>

          {/* Gång runt hybridrönn */}
          <polygon points="93.6,119.8 107.2,134.5 102,138 88.4,123.2"
            fill="#e8dfc8" stroke="none" opacity="0.7"/>
          <path d="M 88.4,123.2 A 6.25,6.25 0 1 1 93.6,119.8"
            fill="none" stroke="#4a5a30" strokeWidth="0.6" strokeDasharray="2 1.5"/>
          <line x1="88.4" y1="123.2" x2="102"   y2="138"   stroke="#4a5a30" strokeWidth="0.6" strokeDasharray="2 1.5"/>
          <line x1="93.6" y1="119.8" x2="107.2" y2="134.5" stroke="#4a5a30" strokeWidth="0.6" strokeDasharray="2 1.5"/>

          {växter.filter(v => visibleTypes[v.typ] && v.krondiameter).map(v => (
            <circle key={`krona-${v.id}`} cx={v.x} cy={v.y} r={v.krondiameter / 2 / 0.12}
              fill="none" stroke="#3a6e28" strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.5"
              style={{ pointerEvents: "none" }}/>
          ))}

          {markerade.map(v => (
            <circle key={`markerad-${v.id}`} cx={v.x} cy={v.y} r={R * 2.2}
              fill="none" stroke="#d03a2a" strokeWidth="0.8"
              style={{ pointerEvents: "none" }}/>
          ))}

          {växter.filter(v => visibleTypes[v.typ]).map(v => (
            <g key={v.id} className="vaxt-punkt"
              onClick={e => { e.stopPropagation(); setSelected(selected?.id === v.id ? null : v); }}
              onMouseEnter={() => setHovered(v)}
              onMouseLeave={() => setHovered(null)}
            >
              <PlantSymbol x={v.x} y={v.y} typ={v.typ} aktiv={selected?.id === v.id}/>
              {showLabels && (
                <text x={v.x + R + 1} y={v.y + 1.5} fontSize="2.5" fill="#2c3a1e">{v.namn}</text>
              )}
            </g>
          ))}

          {selected && (
            <g style={{ pointerEvents: "none" }}>
              <rect x={selected.x + R + 0.5} y={selected.y - 3} width={selected.namn.length * 1.8 + 4} height="6" fill="#2c3a1e" rx="1" opacity="0.9"/>
              <text x={selected.x + R + 2.5} y={selected.y + 1} fontSize="2.5" fill="#f4efe6">{selected.namn}</text>
            </g>
          )}

          {hovered && hovered.id !== selected?.id && (
            <g transform={`translate(${hovered.x + 5}, ${hovered.y - 6})`} style={{ pointerEvents: "none" }}>
              <rect x="-2" y="-4" width={hovered.namn.length * 1.8 + 4} height="6" fill="#2c3a1e" rx="1" opacity="0.85"/>
              <text fontSize="3" fill="#f4efe6" x="0" y="0">{hovered.namn}</text>
            </g>
          )}

          {showLegend && (
            <g transform="translate(46, 167) scale(0.9)">
              <rect x="-2" y="-6" width="38" height={Object.keys(typConfig).length * 8 + 8} fill="#f4efe6" stroke="#c8be9a" strokeWidth="0.4" rx="1"/>
              <text x="0" y="0" fontSize="3.5" fill="#4a5a3a" fontWeight="600">Teckenförklaring</text>
              {Object.entries(typConfig).map(([typ, cfg], i) => (
                <g key={typ} transform={`translate(0, ${i * 8 + 6})`}>
                  <PlantSymbol x={3} y={0} typ={typ} aktiv={false}/>
                  <text x="8" y="1.5" fontSize="3.5" fill="#2c3a1e">{cfg.etikett}</text>
                </g>
              ))}
            </g>
          )}

          <g transform="translate(88, 210)">
            <circle cx="0" cy="0" r="5" fill="#f4efe6" stroke="#c8be9a" strokeWidth="0.4"/>
            <text x="0" y="-1.5" textAnchor="middle" fontSize="3.5" fill="#4a5a3a" fontWeight="600">N</text>
            <line x1="0" y1="-4" x2="0" y2="-2" stroke="#4a5a3a" strokeWidth="0.6" strokeLinecap="round"/>
            <text x="0" y="4"    textAnchor="middle" fontSize="2.8" fill="#8a7a5a">S</text>
            <text x="-4" y="1.2" textAnchor="middle" fontSize="2.8" fill="#8a7a5a">V</text>
            <text x="4"  y="1.2" textAnchor="middle" fontSize="2.8" fill="#8a7a5a">O</text>
          </g>

          <g transform="translate(50, 217)">
            <line x1="0" y1="0" x2="20" y2="0" stroke="#1a1a1a" strokeWidth="0.5"/>
            <line x1="0" y1="-1" x2="0" y2="1" stroke="#1a1a1a" strokeWidth="0.5"/>
            <line x1="20" y1="-1" x2="20" y2="1" stroke="#1a1a1a" strokeWidth="0.5"/>
            <text x="10" y="-2" textAnchor="middle" fontSize="3" fill="#1a1a1a">~2 m</text>
          </g>

          {clickedPos && (
            <g style={{ pointerEvents: "none" }}>
              <line x1={clickedPos.x - 3} y1={clickedPos.y} x2={clickedPos.x + 3} y2={clickedPos.y} stroke="#e03a2a" strokeWidth="0.6"/>
              <line x1={clickedPos.x} y1={clickedPos.y - 3} x2={clickedPos.x} y2={clickedPos.y + 3} stroke="#e03a2a" strokeWidth="0.6"/>
            </g>
          )}

        </svg>
          </TransformComponent>
          </>)}
        </TransformWrapper>
      </div>

      {clickedPos && (
        <div style={{ marginTop: "0.6rem", fontSize: "0.85rem", color: "#4a5a3a", fontFamily: "monospace" }}>
          "x": {clickedPos.x}, "y": {clickedPos.y}
        </div>
      )}

      {selected && (
        <div className="info-kort" style={{
          marginTop: "1rem", maxWidth: 480, width: "100%",
          background: "white", border: "1px solid #c8be9a", borderRadius: "4px",
          padding: "1.2rem 1.5rem", boxShadow: "0 2px 12px rgba(44,58,30,0.08)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a7a5a", marginBottom: "0.2rem" }}>
                {typConfig[selected.typ]?.etikett}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#2c3a1e" }}>
                {selected.namn}
              </h2>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a7a5a", fontSize: "1.2rem" }}>x</button>
          </div>
          <p style={{ marginTop: "0.8rem", fontSize: "0.95rem", color: "#4a5a3a", fontStyle: "italic", lineHeight: 1.6 }}>
            Kort beskrivning kommer här...
          </p>
          <Link to={selected.lank} style={{
            display: "inline-block", marginTop: "1rem",
            padding: "0.45rem 1.1rem", background: "#3a5a20", color: "#f4efe6",
            textDecoration: "none", borderRadius: "2px", fontSize: "0.88rem",
          }}>
            Läs mer om {selected.namn} →
          </Link>
        </div>
      )}
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import växter from "./vaxter.json";

const typFärg = {
  träd:        "#3a6e28",
  buske:       "#7a9a4a",
  ört:         "#c8832a",
  marktäckare: "#a0b060",
  klätterväxt: "#6a5a9a",
};

// Gruppera på artslänk, ta första instansen som representant
function byggArtslista(växter) {
  const seen = new Map();
  for (const v of växter) {
    if (!seen.has(v.lank)) {
      seen.set(v.lank, v);
    }
  }
  return Array.from(seen.values()).sort((a, b) =>
    a.namn.localeCompare(b.namn, "sv")
  );
}

export default function VaxtLista() {
  const navigate = useNavigate();
  const arter = byggArtslista(växter);

  function visaPåKarta(v) {
    const slug = v.lank.split("/").pop();
    navigate(`/karta?art=${slug}`);
  }

  // Gruppera per begynnelsebokstav
  const bokstäver = {};
  for (const v of arter) {
    const b = v.namn[0].toUpperCase();
    if (!bokstäver[b]) bokstäver[b] = [];
    bokstäver[b].push(v);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4efe6",
      fontFamily: "'Crimson Text', Georgia, serif",
      color: "#2c3a1e",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .vaxt-rad {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(200,190,154,0.4);
          gap: 1rem;
        }
        .vaxt-namn {
          font-size: 1.05rem;
          color: #2c3a1e;
          flex: 1;
        }
        .vaxt-actions {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          flex-shrink: 0;
        }
        .lank-knapp {
          font-size: 0.82rem;
          color: #5a7a3a;
          text-decoration: none;
          border: 1px solid #c8be9a;
          padding: 0.15rem 0.55rem;
          border-radius: 2px;
          background: white;
          cursor: pointer;
          font-family: inherit;
        }
        .lank-knapp:hover {
          border-color: #7a9a4a;
          color: #2c3a1e;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #eae4d6 0%, #f4efe6 100%)",
        borderBottom: "1px solid rgba(90,122,58,0.2)",
        padding: "1.5rem 1.5rem 1.2rem",
      }}>
        <Link to="/" style={{ fontSize: "0.85rem", color: "#5a7a3a", textDecoration: "none", letterSpacing: "0.05em" }}>
          ← Tillbaka
        </Link>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
          marginTop: "0.6rem",
          color: "#2c3a1e",
        }}>
          Växtlista
        </h1>
        <p style={{ fontStyle: "italic", color: "#8a7a5a", marginTop: "0.3rem", fontSize: "0.95rem" }}>
          {arter.length} arter i trädgården
        </p>
      </div>

      {/* Lista */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>
        {Object.entries(bokstäver).map(([bokstav, grupp]) => (
          <div key={bokstav} style={{ marginBottom: "1.5rem" }}>
            <div style={{
              fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#8a7a5a", borderBottom: "1px solid #c8be9a",
              paddingBottom: "0.25rem", marginBottom: "0.25rem",
            }}>
              {bokstav}
            </div>
            {grupp.map(v => (
              <div key={v.id} className="vaxt-rad">
                <span className="vaxt-namn">
                  <span style={{
                    display: "inline-block", width: 8, height: 8,
                    borderRadius: v.typ === "träd" || v.typ === "buske" ? "50%" : "0",
                    background: typFärg[v.typ] || "#7a9a4a",
                    marginRight: "0.5rem", verticalAlign: "middle",
                    transform: v.typ === "ört" ? "rotate(45deg)" : "none",
                  }}/>
                  {v.namn}
                </span>
                <div className="vaxt-actions">
                  <button className="lank-knapp" onClick={() => visaPåKarta(v)}>
                    Visa på karta
                  </button>
                  <Link to={v.lank} className="lank-knapp">
                    Om arten →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

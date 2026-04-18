import { Link } from "react-router-dom";

export default function Startsida() {
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
        .nav-kort {
          display: block;
          background: white;
          border: 1px solid #c8be9a;
          border-radius: 3px;
          padding: 1.1rem 1.4rem;
          text-decoration: none;
          color: #2c3a1e;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .nav-kort:hover {
          box-shadow: 0 2px 12px rgba(44,58,30,0.12);
          border-color: #7a9a4a;
        }
        .nav-kort-titel {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #2c3a1e;
          margin-bottom: 0.3rem;
        }
        .nav-kort-text {
          font-size: 0.95rem;
          color: "#6a7a5a";
          font-style: italic;
          line-height: 1.5;
        }
      `}</style>

      {/* Bildsektion */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "260px",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        <img
          src="/skogstradgard/skogst.jpg"
          alt="Trädgården sedd från marken"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <img
          src="/skogstradgard/flygbild.jpeg"
          alt="Flygbild över trädgården"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
        />
      </div>

      {/* Innehåll */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>

        <p style={{
          fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#8a7a5a", marginBottom: "0.6rem",
        }}>
          Agunnaryds allmänning · Småland
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "1rem",
          color: "#2c3a1e",
        }}>
          Agunnaryds allmänna skogsträdgård
        </h1>
        <p style={{
          fontSize: "1.1rem", lineHeight: 1.75, color: "#4a5a3a",
          borderLeft: "3px solid #7a9a4a", paddingLeft: "1rem",
          marginBottom: "2.5rem",
        }}>
          En skogsträdgård på allmänningsmark där ätliga och nyttiga växter odlas
          för alla att njuta av. Utforska växterna via kartan eller listan nedan.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

          <Link to="/karta" className="nav-kort">
            <div className="nav-kort-titel">Karta</div>
            <div className="nav-kort-text">Se alla växter utplacerade på en interaktiv karta över trädgården.</div>
          </Link>

          <Link to="/lista" className="nav-kort">
            <div className="nav-kort-titel">Växtlista</div>
            <div className="nav-kort-text">Bläddra bland alla arter i bokstavsordning och klicka dig vidare till karta och artssida.</div>
          </Link>

          <Link to="/om" className="nav-kort">
            <div className="nav-kort-titel">Om projektet</div>
            <div className="nav-kort-text">Läs om bakgrunden till skogsträdgården och hur du kan bidra.</div>
          </Link>

        </div>
      </div>
    </div>
  );
}

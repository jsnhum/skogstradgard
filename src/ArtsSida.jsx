import { useParams, Link } from "react-router-dom";
import arter from "./arter.json";

const typEtikett = {
  träd: "Träd",
  buske: "Buske",
  ört: "Ört",
  marktäckare: "Marktäckare",
  klätterväxt: "Klätterväxt",
};

const ätligEtikett = {
  ja:     { text: "Ätlig",         färg: "#3a6e28" },
  nej:    { text: "Ej ätlig",      färg: "#8a5a3a" },
  delvis: { text: "Delvis ätlig",  färg: "#a08030" },
};

export default function ArtsSida() {
  const { id } = useParams();
  const art = arter.find((a) => a.id === id);

  if (!art) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontFamily: "Georgia, serif" }}>
        <p>Växten hittades inte.</p>
        <Link to="/" style={{ color: "#3a6e28" }}>← Tillbaka till kartan</Link>
      </div>
    );
  }

  const ätlig = ätligEtikett[art.atlig] || ätligEtikett.nej;

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
        h2 { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2c3a1e; margin-bottom: 0.5rem; }
        p { line-height: 1.75; font-size: 1.05rem; color: #3a4a2a; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #eae4d6 0%, #f4efe6 100%)",
        borderBottom: "1px solid rgba(90,122,58,0.2)",
        padding: "1.5rem 1.5rem 1.2rem",
      }}>
        <Link to="/" style={{
          fontSize: "0.85rem",
          color: "#5a7a3a",
          textDecoration: "none",
          letterSpacing: "0.05em",
        }}>
          ← Tillbaka till kartan
        </Link>

        <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
            background: "#ddd9c4", color: "#6a7a5a", padding: "0.2rem 0.6rem", borderRadius: "2px",
          }}>
            {typEtikett[art.typ] || art.typ}
          </span>
          <span style={{
            fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
            background: ätlig.färg, color: "#f4efe6", padding: "0.2rem 0.6rem", borderRadius: "2px",
          }}>
            {ätlig.text}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
          fontWeight: 700,
          marginTop: "0.5rem",
          lineHeight: 1.1,
        }}>
          {art.namn}
          {art.sort && (
            <span style={{ fontWeight: 400, fontSize: "0.55em", color: "#6a7a5a", marginLeft: "0.5rem" }}>
              '{art.sort}'
            </span>
          )}
        </h1>
        <p style={{ fontStyle: "italic", color: "#8a7a5a", marginTop: "0.3rem", fontSize: "1rem" }}>
          {art.latinskt}
        </p>
      </div>

      {/* Innehåll */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>

        {/* Bild */}
        <div style={{
          width: "100%", aspectRatio: "3/2", marginBottom: "1.5rem",
          background: "#ddd9c4", borderRadius: "3px", overflow: "hidden",
          position: "relative",
        }}>
          {art.bild ? (
            <img
              src={art.bild}
              alt={art.namn}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div style={{
            display: art.bild ? "none" : "flex",
            position: "absolute", inset: 0,
            flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            color: "#8a7a5a", fontStyle: "italic", fontSize: "0.95rem",
            gap: "0.5rem",
          }}>
            <span style={{ fontSize: "2rem" }}>🌿</span>
            Foto kommer
          </div>
        </div>

        {/* Kortbeskrivning */}
        <p style={{
          fontSize: "1.15rem", fontStyle: "italic", color: "#4a5a3a",
          borderLeft: "3px solid #7a9a4a", paddingLeft: "1rem",
          marginBottom: "2rem", lineHeight: 1.65,
        }}>
          {art.kortbeskrivning}
        </p>

        {/* Beskrivning */}
        <section style={{ marginBottom: "1.8rem" }}>
          <h2>Om växten</h2>
          <p>{art.beskrivning}</p>
        </section>

        {/* Användning */}
        <section style={{ marginBottom: "1.8rem" }}>
          <h2>Användning</h2>
          <p>{art.anvandning}</p>
        </section>

        {/* Skötsel */}
        <section style={{ marginBottom: "1.8rem" }}>
          <h2>Skötsel</h2>
          <p>{art.skotsel}</p>
        </section>

        {/* Lokalt */}
        <section style={{
          background: "#eae4d6", borderRadius: "3px",
          padding: "1.2rem 1.5rem", marginBottom: "1.8rem",
        }}>
          <h2>I den här trädgården</h2>
          <p>{art.lokalt}</p>
          <Link
            to={`/karta?art=${art.id}`}
            style={{
              display: "inline-block", marginTop: "1rem",
              padding: "0.45rem 1.1rem", background: "#3a5a20", color: "#f4efe6",
              textDecoration: "none", borderRadius: "2px", fontSize: "0.88rem",
            }}
          >
            Visa på karta →
          </Link>
        </section>

      </div>
    </div>
  );
}

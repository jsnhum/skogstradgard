import { Link } from "react-router-dom";

export default function Om() {
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
          Om projektet
        </h1>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>
        <p style={{
          fontSize: "1.15rem", fontStyle: "italic", color: "#4a5a3a",
          borderLeft: "3px solid #7a9a4a", paddingLeft: "1rem",
          marginBottom: "2rem", lineHeight: 1.65,
        }}>
          Text om projektet kommer här.
        </p>
      </div>
    </div>
  );
}

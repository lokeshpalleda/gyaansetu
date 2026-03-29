import { Link } from "react-router-dom";

export default function Sidebar() {

  const linkStyle = {
    textDecoration: "none",
    color: "#cbd5f5",
    padding: "10px 0",
    display: "block"
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        padding: "25px"
      }}
    >

      <h2 style={{ color: "#3b82f6", marginBottom: "30px" }}>
        GyaanSetu
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/post-doubt" style={linkStyle}>Doubts</Link>
        <Link to="/mentors" style={linkStyle}>Mentors</Link>
        <Link to="/session" style={linkStyle}>Sessions</Link>
      </nav>

    </div>
  );
}
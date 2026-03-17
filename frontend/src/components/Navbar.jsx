import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#222",
        color: "white",
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/post-doubt" style={{ color: "white", textDecoration: "none" }}>
          Post Doubt
        </Link>

        <Link to="/mentors" style={{ color: "white", textDecoration: "none" }}>
          Mentors
        </Link>

        <Link to="/session" style={{ color: "white", textDecoration: "none" }}>
          Sessions
        </Link>
      </div>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}